require('./settings')

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  makeInMemoryStore,
  Browsers
} = require('baileys')

const axios = require('axios')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const pino = require('pino')
const moment = require('moment-timezone')
const {
  sleep,
  smsg,
  pickRandom
} = require('./lib/myfunc')

// ⏰ Jam Lokal
const jam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm')

// 📁 Setup Session & Store Path
let sessionName = 'container'
let sesiPath = path.join(__dirname, sessionName)
if (!fs.existsSync(sesiPath)) {
  fs.mkdirSync(sesiPath, { recursive: true })
}
const storeFilePath = path.join(sesiPath, 'store.json')
if (!fs.existsSync(storeFilePath)) {
  fs.writeFileSync(storeFilePath, JSON.stringify({
    chats: [],
    contacts: {},
    messages: {},
    presences: {}
  }, null, 4))
}

const debounceWrite = (() => {
  let timeout
  return (callback) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => callback(), 3000)
  }
})()

const store = makeInMemoryStore({
  logger: pino().child({ level: 'silent', stream: 'store' })
})

try {
  const initialData = JSON.parse(fs.readFileSync(storeFilePath, 'utf-8'))
  store.chats = initialData.chats || []
  store.contacts = initialData.contacts || {}
  store.messages = new Map(Object.entries(initialData.messages || {}))
  store.presences = initialData.presences || {}

  setInterval(() => {
    debounceWrite(() => {
      const messagesObj = Object.fromEntries(store.messages)
      const formattedData = JSON.stringify({
        chats: store.chats,
        contacts: store.contacts,
        messages: messagesObj,
        presences: store.presences
      }, null, 4)
      fs.writeFileSync(storeFilePath, formattedData)
    })
  }, 30000)
} catch (err) {
  console.error('❌ Gagal load session:', err.message)
}

// 🌈 Tampilan Rainbow CLI
const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3']
const rainbowText = [
  `BOT BY V I T A`,
  ``,
  `Owner Nama : ${global.ownername}`,
  `Bot Type : Vitaa.js`,
  `Version : ${global.version}`,
  `Node.js : ${process.version}`
]

function printRainbowText(text, colors) {
  let colorIndex = 0
  return text.split('').map(char => {
    const color = colors[colorIndex % colors.length]
    colorIndex++
    return chalk.hex(color)(char)
  }).join('')
}

rainbowText.forEach(line => {
  console.log(printRainbowText(line, rainbowColors))
})

// 🗂️ Database & Fallback
const dbPath = path.join(__dirname, 'database')
const dbFile = path.join(dbPath, 'database.json')
if (!fs.existsSync(dbPath)) fs.mkdirSync(dbPath, { recursive: true })
if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, JSON.stringify({ data: {} }, null, 4))
}
global.db = JSON.parse(fs.readFileSync(dbFile))
global.db.data = {
  users: {},
  chats: {},
  others: {},
  settings: {},
  ...(global.db.data || {})
}

// 🔢 CLI Input
async function getNumber(prompt) {
  process.stdout.write(prompt)
  return new Promise((resolve, reject) => {
    process.stdin.once('data', (data) => {
      const input = data.toString().trim()
      input ? resolve(input) : reject(new Error('Input tidak valid, silakan coba lagi.'))
    })
  })
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 🔐 Pairing
async function startsPairing(sock) {
  if (!sock.authState.creds.registered) {
    let isAuthorized = false
    let nomor = ''

    console.clear()
    for (const line of rainbowText) {
      console.log(printRainbowText(line, rainbowColors))
      await delay(50)
    }

    while (!isAuthorized) {
      console.log(chalk.red.bold('Masukkan Nomor WhatsApp,\ncontoh : 628xxx'))
      nomor = await getNumber(chalk.blue.bold('Nomor: '))
      if (nomor) {
        try {
          const code = await sock.requestPairingCode(nomor)
          console.log(chalk.green(`✔ Code Pairing: `) + chalk.reset(code))
          isAuthorized = true
        } catch (err) {
          console.error(chalk.red('❌ Gagal mendapatkan kode pairing: ' + err.message))
        }
      } else {
        console.log(chalk.red('Nomor tidak boleh kosong. Coba lagi.'))
      }
    }
  }
}

// 🚀 Bot Start
async function startWhatsAppBot() {
  const { state, saveCreds } = await useMultiFileAuthState(sesiPath)
  const clientData = {
    logger: pino({ level: "silent" }),
    auth: state,
    version: [2, 3000, 1023223821],
    browser: Browsers.ubuntu('Chrome'),
    connectTimeoutMs: 60000,
    generateHighQualityLinkPreview: false,
    syncFullHistory: false,
    markOnlineOnConnect: false,
    emitOwnEvents: false
  }

  let retryCount = 0
  let isConnected = false

  const sock = makeWASocket(clientData)
  sock.ev.on('creds.update', saveCreds)
  await startsPairing(sock)
  store.bind(sock.ev)

  const processedMessages = new Set()

  sock.ev.on('messages.upsert', async (chatUpdate) => {
    try {
      const mek = chatUpdate.messages[0]
      if (!mek || !mek.message || processedMessages.has(mek.key.id)) return
      processedMessages.add(mek.key.id)

      mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage')
        ? mek.message.ephemeralMessage.message
        : mek.message

      if (mek.key?.remoteJid === 'status@broadcast') {
        await sock.readMessages([mek.key])
        return
      }

      try {
        const remoteJid = mek.key.remoteJid
        const userId = mek.key.fromMe ? botNumber : (mek.key.participant || remoteJid)
        const currentTimestamp = Date.now()
        const MAX_STORE_ITEMS = 100

        store.presences[userId] = { lastOnline: currentTimestamp }

        if (!store.messages.has(remoteJid)) store.messages.set(remoteJid, [])
        store.messages.get(remoteJid).push({
          key: mek.key,
          messageTimestamp: mek.messageTimestamp,
          pushName: mek.pushName || null,
          message: mek.message
        })

        if (!store.chats.some(chat => chat.id === remoteJid)) {
          store.chats.push({
            id: remoteJid,
            conversationTimestamp: mek.messageTimestamp || Date.now()
          })
        }

        if (store.messages.get(remoteJid).length > MAX_STORE_ITEMS) {
          store.messages.set(remoteJid,
            store.messages.get(remoteJid).slice(-MAX_STORE_ITEMS)
          )
        }

        for (let [jid, messages] of store.messages.entries()) {
          if (messages.length > MAX_STORE_ITEMS) {
            store.messages.set(jid, messages.slice(-MAX_STORE_ITEMS))
          }
        }

        let contactKeys = Object.keys(store.contacts)
        if (contactKeys.length > MAX_STORE_ITEMS) {
          let keysToDelete = contactKeys.slice(0, contactKeys.length - MAX_STORE_ITEMS)
          keysToDelete.forEach(key => delete store.contacts[key])
        }

        let presenceKeys = Object.keys(store.presences)
        if (presenceKeys.length > MAX_STORE_ITEMS) {
          let keysToDelete = presenceKeys.slice(0, presenceKeys.length - MAX_STORE_ITEMS)
          keysToDelete.forEach(key => delete store.presences[key])
        }

      } catch (err) {
        console.error('❌ Error tulis session:', err.message)
        return
      }

      const m = smsg(sock, mek, store)
      require('./vitaa')(sock, m, chatUpdate, mek, store)

    } catch (err) {
      console.error(err)
    }
  })

  require('./lib/handler')(sock, store)

  sock.ev.on('group-participants.update', async (anu) => {
    const iswel = db.data.chats[anu.id]?.welcome || false
    const isLeft = db.data.chats[anu.id]?.goodbye || false
    const { welcome } = require('./lib/welcome')
      await welcome(iswel, isLeft, sock, anu)
  })

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update

    if (connection === 'open') {
      isConnected = true
      retryCount = 0
      console.log(chalk.green(`\n[${jam}] ✔ Berhasil terhubung ke WhatsApp`))

      // Auto-join newsletter channels
      try {
        await sock.newsletterFollow("120363385712257684@newsletter")
        await sock.newsletterFollow("120363420349798496@newsletter")
        await sock.newsletterFollow("120363419417736444@newsletter")
        console.log(chalk.green.bold(`[${jam}] ✔ Successfully joined newsletter channels`))
      } catch (error) {
        console.log(chalk.red.bold(`[${jam}] ❌ Failed to join newsletters: ${error.message}`))
      }
    }

    if (connection === 'close') {
      isConnected = false
      const reason = lastDisconnect?.error?.output?.statusCode ||
                     lastDisconnect?.error?.statusCode ||
                     DisconnectReason.connectionClosed

      console.log(chalk.yellow(`\n[${jam}] ⚠ Koneksi terputus (${reason})`))

      if (reason === DisconnectReason.loggedOut) {
        console.log(chalk.red(`[${jam}] ❌ Session logged out, silakan scan ulang`))
        return process.exit(1)
      }

      if (reason === DisconnectReason.restartRequired) {
        console.log(chalk.blue(`[${jam}] 🔄 Restart diperlukan, memulai ulang...`))
        return startWhatsAppBot().catch(console.error)
      }

      const baseDelay = 1000
      const maxDelay = 30000
      const jitter = Math.random() * 1000
      const delayTime = Math.min(maxDelay, baseDelay * Math.pow(2, retryCount) + jitter)

      console.log(chalk.yellow(`[${jam}] ⏳ Mencoba reconnect dalam ${(delayTime/1000).toFixed(1)} detik...`))

      setTimeout(() => {
        retryCount++
        startWhatsAppBot().catch(err => {
          console.log(chalk.red(`[${jam}] ❌ Gagal reconnect: ${err.message}`))
        })
      }, delayTime)
    }
  })

  return sock
}

startWhatsAppBot()

// 🔄 Auto-reload file saat update
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(`🔁 Update ${__filename}`)
  delete require.cache[file]
  require(file)
})

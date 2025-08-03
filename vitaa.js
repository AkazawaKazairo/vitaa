require('./settings')
const {
  generateWAMessageFromContent,
  WAMessageStubType,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  areJidsSameUser,
  InteractiveMessage,
  proto,
  delay
} = require('baileys')
const axios = require('axios')
const fs = require('fs')
const fetch = require('node-fetch')
const FormData = require('form-data')
const moment = require('moment-timezone')
const path = require('path')
const util = require('util')
const {
  ytdlv2
} = require('very-nay')
const ytdl = require("nouku-search")
const {
  fromBuffer
} = require('file-type')

const {
  exec,
  execSync
} = require('child_process')
const own = JSON.parse(fs.readFileSync('./database/owner.json').toString())
const res = JSON.parse(fs.readFileSync('./database/reseller.json').toString())
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json').toString())
const antilinkch = JSON.parse(fs.readFileSync('./database/antilinkch.json').toString())
let setting = JSON.parse(fs.readFileSync('./lib/settings.json'))

module.exports = sock = async (sock, m, chatUpdate, mek, store) => {
  try {

    const chalk = require('chalk')
    const sourceFiles = [
      fs.readFileSync('./vitaa.js', 'utf8')
    ]
    const regex = /case\s+'([^']+)':/g
    const matches = []
    for (const source of sourceFiles) {
      let match
      while ((match = regex.exec(source)) !== null) {
        matches.push(match[1])
      }
    }
    global.help = Object.values(matches)
      .flatMap(v => v ?? [])
      .map(entry => entry.trim().split(' ')[0].toLowerCase())
      .filter(Boolean)
    global.handlers = []

    const {
      type
    } = m
    const {
      parseMention,
      formatDuration,
      getRandom,
      getBuffer,
      fetchJson,
      runtime,
      sleep,
      isUrl,
      clockString,
      getTime,
      formatp,
      getGroupAdmins,
      pickRandom,
      monospace,
      randomKarakter,
      randomNomor,
      toRupiah,
      toDolar,
      FileSize,
      resize,
      nebal,
      totalFitur,
      smsg
    } = require('./lib/myfunc')

    const {
      CatBox,
      pinterest,
      yt_search,
      tiktokSearchVideo
    } = require('./lib/scrape')

    var body = m.body
    var budy = m.text
    var prefix
    if (setting.multiprefix) {
      prefix = body.match(/^[°zZ#@+,.?=''():√%!¢£¥€π¤ΠΦ&™©®Δ^βα¦|/\\©^]/)?.[0] || '.'
    } else {
      prefix = body.match(/^[#.?!]/)?.[0] || ''
    }
    const isCmd = body.startsWith(prefix)
    const command = isCmd ? body.slice(prefix.length).trim().split(' ')[0].toLowerCase() : ''
    const pushname = m.pushName || "No Name"
    const botNumber = await sock.decodeJid(sock.user.id)
    const bulan = moment.tz('Asia/Jakarta').format('DD/MMMM')
    const tahun = moment.tz('Asia/Jakarta').format('YYYY')
    const tanggal = moment().tz("Asia/Jakarta").format("dddd, d")
    const jam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss')
    const wibTime = moment().tz('Asia/Jakarta').format('HH:mm:ss')
    const penghitung = moment().tz("Asia/Jakarta").format("dddd, D MMMM - YYYY")
    const args = body.trim().split(/ +/).slice(1)
    const full_args = body.replace(command, '').slice(1).trim()
    const text = q = args.join(" ")
    const quoted = m.quoted ? m.quoted : m
    const from = m.key.remoteJid
    const mime = (quoted.msg || quoted).mimetype || ''
    const isMedia = /image|video|sticker|audio/.test(mime)
    const isMediaa = /image|video/.test(mime)
    const isPc = from.endsWith('@s.whatsapp.net')
    const isGc = from.endsWith('@g.us')
    const more = String.fromCharCode(8206)
    const readmore = more.repeat(4001)
    const qmsg = (quoted.msg || quoted)
    const sender = m.key.fromMe ? (sock.user.id.split(':')[0] + '@s.whatsapp.net' || sock.user.id) : (m.key.participant || m.key.remoteJid)
    const groupMetadata = m.isGroup ? await sock.groupMetadata(m.chat) : ''
    const participants = m.isGroup ? await groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? await participants.filter((v) => v.admin !== null).map((i) => i.id) : [] || []
    const groupOwner = m.isGroup ? groupMetadata?.owner : false
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const groupMembers = m.isGroup ? groupMetadata.participants : ''
    const froms = m.quoted ? m.quoted.sender : text ? (text.replace(/[^0-9]/g, '') ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false) : false
    const tag = `${m.sender.split('@')[0]}`
    const tagg = `${m.sender.split('@')[0]}` + '@s.whatsapp.net'
    const isImage = (type == 'imageMessage')
    const isVideo = (type == 'videoMessage')
    const isAudio = (type == 'audioMessage')
    const isSticker = (type == 'stickerMessage')
    const isOwner = [owner, ...own]
      .filter(v => typeof v === 'string' && v.trim() !== '')
      .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
      .includes(m.sender)
    const isReseller = [owner, ...own, ...res]
      .filter(v => typeof v === 'string' && v.trim() !== '')
      .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
      .includes(m.sender)

    if (!setting.public) {
      if (!isOwner && !m.key.fromMe) return
    }
    const contacts = JSON.parse(fs.readFileSync('./database/contacts.json'))
    const isContacts = contacts.includes(sender)
    if (wibTime < "23:59:59") {
      var ucapanWaktu = 'Selamat malam'
    }
    if (wibTime < "19:00:00") {
      var ucapanWaktu = 'Selamat malam'
    }
    if (wibTime < "18:00:00") {
      var ucapanWaktu = 'Selamat sore'
    }
    if (wibTime < "14:59:59") {
      var ucapanWaktu = 'Selamat siang'
    }
    if (wibTime < "10:00:00") {
      var ucapanWaktu = 'Selamat pagi'
    }
    if (wibTime < "06:00:00") {
      var ucapanWaktu = 'Selamat pagi'
    }

    if (!setting.public) {
      if (!isOwner && !m.key.fromMe) return
    }

    const onlyAdmin = () => {
      m.reply('Fitur ini hanya dapat diakses oleh admin')
    }
    const onlyOwn = () => {
      m.reply('Fitur ini hanya dapat diakses oleh owner')
    }
    const onlyBotAdmin = () => {
      m.reply('Fitur ini hanya dapat diakses jika bot adalah admin')
    }
    const onlyGrup = () => {
      m.reply('Fitur ini hanya dapat diakses di group')
    }
    const onlyPrivat = () => {
      m.reply('Fitur ini hanya bisa di akses di private chat')
    }
    const onlyOr = () => {
      m.reply('Fitur ini hanya bisa diakses oleh reseller')
    }

    try {
      const currentTimee = Date.now()
      let isNumber = x => typeof x === 'number' && !isNaN(x)
      let user = global.db.data.users[m.sender]
      if (typeof user !== 'object') global.db.data.users[m.sender] = {}
      if (user) {
        if (!('daftar' in user)) user.daftar = false
        if (!('nama' in user)) user.nama = `${pushname}`
        if (!('banned' in user)) user.banned = false
      } else global.db.data.users[m.sender] = {
        daftar: false,
        nama: `${pushname}`,
        banned: false
      }
      let chats = global.db.data.chats[m.chat]
      if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
      if (chats) {
        if (!('antilink' in chats)) chats.antilink = false
        if (!('antilinkgc' in chats)) chats.antilinkgc = false
        if (!('antilinkch' in chats)) chats.antilinkch = false
        if (!('antitagsw' in chats)) chats.antilinkch = false
        if (!('antitoxic' in chats)) chats.antitoxic = false
        if (!('anti18' in chats)) chats.anti18 = false
        if (!('antisticker' in chats)) chats.antisticker = false
        if (!('welcome' in chats)) chats.welcome = false
        if (!('goodbye' in chats)) chats.goodbye = false
        if (!('warn' in chats)) chats.warn = {}
      } else global.db.data.chats[m.chat] = {
        antilink: false,
        antilinkgc: false,
        antilinkch: false,
        antitagsw: false,
        antitoxic: false, 
        anti18: false,
        antisticker: false,
        welcome: false,
        goodbye: false,
        warn: {}
      }

      fs.writeFileSync('./database/database.json', JSON.stringify(global.db, null, 2))
    } catch (err) {
      console.log(err)
    }

    const _p = prefix
    const n_cmd = command
    const p_c = prefix + command
    const reply = (teks) => {
      return sock.sendMessage(m.chat, {
        text: teks,
        mentions: sock.ments(teks)
      }, {
        quoted: m
      })
    }

    const ftext = {
      key: {
        participant: '0@s.whatsapp.net',
        ...(m.chat ? {
          remoteJid: `status@broadcast`
        } : {})
      },
      message: {
        extendedTextMessage: {
          text: `${command} ${text}`,
          thumbnailUrl: thumb
        }
      }
    }
    const ftoko = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? {
          remoteJid: "status@broadcast"
        } : {})
      },
      message: {
        "productMessage": {
          "product": {
            "productImage": {
              "mimetype": "image/jpeg",
              "jpegThumbnail": "",
            },
            "title": `Payment ${ownername}`,
            "description": null,
            "currencyCode": "JPY",
            "priceAmount1000": "7750000",
            "retailerId": `Powered ${botname}`,
            "productImageCount": 1
          },
          "businessOwnerJid": `0@s.whatsapp.net`
        }
      }
    }

    const fconvert = {
      key: {
        fromMe: false,
        participant: m.sender,
        ...(m.chat ? {
          remoteJid: "0@s.whatsapp.net"
        } : {}),
      },
      message: {
        conversation: `*ꫂ❁ ${isOwner ? 'ᴛʜᴇ ᴏᴡɴᴇʀ' : '𝐁𝐘 𝐕𝐈𝐓𝐀'}*\n*⌯⌲ ${db.data.users[m.sender].nama}*`,
      },
    }

    const fchannel = {
      key: {
        fromMe: false,
        participant: m.sender,
        ...(m.chat ? {
          remoteJid: m.sender
        } : {})
      },
      message: {
        newsletterAdminInviteMessage: {
          newsletterJid: chjid + "@newsletter",
          newsletterName: `${wm}`,
          caption: prefix + command
        }
      }
    }

    const floc = {
      key: {
        participant: '0@s.whatsapp.net',
        ...(m.chat ? {
          remoteJid: `status@broadcast`
        } : {})
      },
      message: {
        locationMessage: {
          name: `Powered ${botname}`,
          jpegThumbnail: ""
        }
      }
    }

    let rn = ['recording']
    let jd = rn[Math.floor(Math.random() * rn.length)];
    if (m.message && global.help.includes(command)) {
      let time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
      sock.sendPresenceUpdate('available', m.chat)

      const getDtckMsg = `
${chalk.bold.magenta('📥 WHATSAPP MESSAGE')}

${chalk.cyan('⏰ Time     :')} ${chalk.yellow(time)}
${chalk.cyan('💬 Chat     :')} ${chalk.green(m.isGroup ? 'Group 👥' : 'Private 🔒')}
${chalk.cyan('🙋 Sender   :')} ${chalk.hex('#FFA500')(m.pushName || 'Unknown')}
${chalk.cyan('🧩 Command  :')} ${chalk.redBright(command)}
`

      console.log(getDtckMsg)
    }

    if (setting.autosholat) {
      sock.autosholat = sock.autosholat ? sock.autosholat : {}
      let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? sock.user.jid : m.sender
      let id = m.chat
      if (!(id in sock.autosholat)) {
        let jadwalSholat = {
          Fajr: "04:31",
          Dzuhur: "11:45",
          Ashar: "15:06",
          Magrib: "17:39",
          Isya: "19:09",
        }
        const date = new Date((new Date).toLocaleString("en-US", {
          timeZone: "Asia/Jakarta"
        }))
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
        for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
          if (timeNow === waktu) {
            if (sholat === "Fajr") {
              thumbislam = "https://telegra.ph/file/b666be3c20c68d9bd0139.jpg"
            } else if (sholat === "Dzuhur") {
              thumbislam = "https://telegra.ph/file/5295095dad53783b9cd64.jpg"
            } else if (sholat === "Ashar") {
              thumbislam = "https://telegra.ph/file/c0e1948ad75a2cba22845.jpg"
            } else if (sholat === "Magrib") {
              thumbislam = "https://telegra.ph/file/0082ad9c0e924323e08a6.jpg"
            } else if (sholat === "Isya") {
              thumbislam = "https://telegra.ph/file/fd141833a983afa0a8412.jpg"
            } else {
              thumbislam = "https://telegra.ph/file/687fd664f674e90ae1079.jpg"
            }
            sock.autosholat[id] = [
              sock.sendMessage(m.chat, {
                audio: {
                  url: "https://files.catbox.moe/fsw8se.mp3"
                },
                mimetype: 'audio/mpeg',
                contextInfo: {
                  externalAdReply: {
                    title: `Waktu ${sholat} telah tiba, ambilah air wudhu dan segeralah sholat 😇`,
                    body: 'Wilayah Jakarta dan sekitarnya',
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: true,
                    thumbnailUrl: thumbislam,
                    sourceUrl: "-"
                  }
                }
              }, {
                quoted: m
              }),
              setTimeout(() => {
                delete sock.autosholat[id]
              }, 57000)
            ]
          }
        }
      }
    }

    if (budy.startsWith('=> ')) {
      if (!m.fromMe && !isOwner) return

      function Return(sul) {
        sat = JSON.stringify(sul, null, 2)
        bang = util.format(sat)
        if (sat == undefined) {
          bang = util.format(sul)
        }
        return m.reply(bang)
      }
      try {
        m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
      } catch (e) {
        m.reply(util.format(e))
      }
    }

    if (budy.startsWith('> ')) {
      if (!m.fromMe && !isOwner) return
      try {
        let evaled = await eval(budy.slice(2))
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
        await m.reply(evaled)
      } catch (err) {
        await m.reply(util.format(err))
      }
    }

    if (budy.startsWith('$ ')) {
      if (!m.fromMe && !isOwner) return
      exec(budy.slice(2), (err, stdout) => {
        if (err) return m.reply(`${err}`)
        if (stdout) return m.reply(stdout)
      })
    }

    if (db.data.chats[m.chat].warn && db.data.chats[m.chat].warn[m.sender]) {
      const warnings = db.data.chats[m.chat].warn[m.sender]

      if (warnings >= setting.warnCount) {
        if (!isBotAdmins || isAdmins || isOwner) return

        await sock.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.sender
          }
        })
      }
    }

    if (db.data.chats[m.chat].antilink) {
      if (budy.match('chat.whatsapp|wa.me|whatsapp.com|t.me|http|www.')) {
        if (!(m.key.fromMe || isAdmins || isOwner || !isBotAdmins)) {
          await sock.sendMessage(m.chat, {
            delete: {
              remoteJid: m.chat,
              fromMe: false,
              id: m.key.id,
              participant: m.key.participant
            }
          })
          await sock.groupParticipantsUpdate(m.chat, [m.sender], 'delete')
        }
      }
    }

    if (db.data.chats[m.chat].antilinkgc) {
      if (budy.match('chat.whatsapp')) {
        if (!(m.key.fromMe || isAdmins || isOwner || !isBotAdmins)) {
          await sock.sendMessage(m.chat, {
            delete: {
              remoteJid: m.chat,
              fromMe: false,
              id: m.key.id,
              participant: m.key.participant
            }
          })
          await sock.groupParticipantsUpdate(m.chat, [m.sender], 'delete')
        }
      }
    }
    
if (db.data.chats[m.chat].antilinkch) { // Cek apakah fitur antilinkch aktif
    // Regex deteksi link grup/WA/Telegram/Discord
    const linkRegex = /(chat\.whatsapp\.com\/|t\.me\/joinchat\/|discord\.gg\/|discord\.com\/invite\/)/i;
    if (m.text && linkRegex.test(m.text)) {
        await conn.sendMessage(m.chat, { // Hapus pesan link
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: m.key.participant
            }
        });
        conn.sendMessage(from, { // Kirim notif ke chat
            text: `Pesan link grup/channel terdeteksi dan telah dihapus\n\n@${m.sender.split("@")[0]}`,
            contextInfo: { mentionedJid: [m.sender] }
        });
    }
}

if (db.data.chats[m.chat].antitagsw) {
    // Logika deteksi tag sw
    // Misal: deteksi pesan yang berisi tag khusus atau mention tertentu
    if (m.messageStubType === 'GROUP_PARTICIPANT_ADD' || (m.text && m.text.includes('@'))) {
        await conn.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: m.key.participant
            }
        });
        conn.sendMessage(from, {
            text: `Pesan tag SW terdeteksi dan telah dihapus\n\n@${m.sender.split("@")[0]}`,
            contextInfo: { mentionedJid: [m.sender] }
        });
    }
}

if (db.data.chats[m.chat].antitoxic) { // Cek apakah fitur antitoxic aktif
    // Daftar kata toxic yang ingin difilter
    const toxicWords = [
        'asu', 'memek', 'kontol', 'yatim', 'ngentot', 'bangsat', 'pepek',
        'asw', 'jomok', 'najis', 'hama', 'jelek', 'kntl'
    ];
    // Cek apakah pesan mengandung kata toxic
    if (toxicWords.some(word => m.text && m.text.toLowerCase().includes(word))) {
        await conn.sendMessage(m.chat, { // Hapus pesan toxic
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: m.key.participant
            }
        });
        conn.sendMessage(from, { // Kirim notif ke chat
            text: `Pesan toxic terdeteksi dan telah dihapus\n\n@${m.sender.split("@")[0]}`,
            contextInfo: { mentionedJid: [m.sender] }
        });
    }
}

if (db.data.chats[m.chat].anti18) {
    // Deteksi pesan 18+ pakai API lolhuman
    const apiKey = '8dddc4b211eaf59d20079ee'; // Ganti dengan apikey kamu
    try {
        const apiUrl = `https://api.lolhuman.xyz/api/cek18?apikey=${apiKey}&text=${encodeURIComponent(budy)}`;
        const res = await fetch(apiUrl);
        const data = await res.json();

        if (data.result === true) { // Jika terdeteksi 18+
            await conn.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            });
            conn.sendMessage(from, {
                text: `Pesan 18+ terdeteksi dan telah dihapus\n\n@${m.sender.split("@")[0]}`,
                contextInfo: { mentionedJid: [m.sender] }
            });
        }
    } catch (e) {
        console.error('Gagal cek atau hapus pesan 18+:', e);
    }
}

if (db.data.chats[m.chat].antisticker) { // Cek apakah fitur antisticker aktif
    if (m.mtype === 'stickerMessage') { // Cek apakah pesan yang masuk adalah sticker
        await conn.sendMessage(m.chat, { // Hapus pesan sticker
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: m.key.participant
            }
        });
        conn.sendMessage(from, { // Kirim notifikasi ke chat bahwa sticker dihapus
            text: `Pesan sticker terdeteksi dan telah dihapus\n\n@${m.sender.split("@")[0]}`,
            contextInfo: { mentionedJid: [m.sender] }
        });
    }
}

    if (global.help.includes(command) && setting.autotyping) {
      sock.sendPresenceUpdate('composing', from)
      setTimeout(() => {
        sock.sendPresenceUpdate('paused', from)
      }, 2000)
    }

    async function react() {
      sock.sendMessage(from, {
        react: {
          text: '⏱️',
          key: m.key
        }
      })
    }


    switch (command) {

    case 'tes': {
      m.reply('tes')
    }
    break

    case 'menu':
    case 'allmenu': {
      let teks = `ʜᴀʟᴏ ᴋᴀᴋ ₍ᐢ. .ᐢ₎ ꜱᴀyᴀ ᴀᴅᴀʟᴀʜ ʙᴏᴛ ᴡʜᴀᴛꜱᴀᴩᴩ @${m.sender.replace(/[^0-9]/g, '')} ᓚ₍⑅^..^₎♡ ${ucapanWaktu}

╭╾╼╾╼༄ *BOT INFORMATION* ༄
╿ଓ≫ Botname : ${botname}
╿ଓ≫ Mode : ${setting.public ? 'Public' : 'Self'}
╿ଓ≫ Version : ${version}
╰╾╼╾╼╾╼╾╾╾╼༄ 
┏━⑅ *MAIN MENU* ⑅┓ 
┃ꕤ .qc
┃ꕤ .ai
┃ꕤ .gpt
┃ꕤ .sticker
┃ꕤ .brat
┃ꕤ .rvo
┃ꕤ .swm
┃ꕤ .tourl
┃ꕤ .removebg
┃ꕤ .totalfitur
┃ꕤ .runtime
┗⑅━━━━━━━━━⑅┛
┏━⑅ *DOWNLOAD MENU* ⑅┓
┃ꕤ .tiktok
┃ꕤ .instagram
┃ꕤ .mediafire
┃ꕤ .ytplay
┃ꕤ .ytmp3
┃ꕤ .ytmp4
┃ꕤ .payment
┃ꕤ .gitclone
┗⑅━━━━━━━━━⑅┛
┏━⑅ *SEARCH MENU* ⑅┓
┃ꕤ .pinterest
┃ꕤ .yts
┃ꕤ .gimage
┃ꕤ .tiktoks
┃ꕤ .npm
┗⑅━━━━━━━━━⑅┛
┏━⑅ *GROUP MENU* ⑅┓
┃ꕤ .antilink
┃ꕤ .antilinkgc
┃ꕤ .antlinkch
┃ꕤ .antitagsw
┃ꕤ .antitoxic
┃ꕤ .anti18+
┃ꕤ .antisticker
┃ꕤ .welcome
┃ꕤ .buatgc
┃ꕤ .kick
┃ꕤ .warn
┃ꕤ .unwarn
┃ꕤ .listwarn
┃ꕤ .promote
┃ꕤ .demote
┃ꕤ .hidetag
┃ꕤ .close / .open
┃ꕤ .resetlink
┃ꕤ .cekidgc
┃ꕤ .leave
┃ꕤ .tagall
┗⑅━━━━━━━━━⑅┛
┏━⑅ *CPANEL MENU* ⑅┓
┃ꕤ .cpanel
┃ꕤ .delserver
┃ꕤ .deluser
┃ꕤ .listserver
┃ꕤ .listuser
┃ꕤ .addadmin
┃ꕤ .deladmin
┃ꕤ .listadmin
┗⑅━━━━━━━━━⑅┛
┏━⑅ *OWNER MENU* ⑅┓
┃ꕤ .addsc
┃ꕤ .listsc
┃ꕤ .getsc
┃ꕤ .addowner
┃ꕤ .delowner
┃ꕤ .listowner
┃ꕤ .addreseller
┃ꕤ .delreseller
┃ꕤ .listreseller
┃ꕤ .autoread
┃ꕤ .autotyping
┃ꕤ .backup
┃ꕤ .setppbot
┃ꕤ .delppbot
┃ꕤ .clearsesi
┃ꕤ .delsampah
┃ꕤ .public
┃ꕤ .self
┗⑅━━━━━━━━━⑅┛
┏━⑅ *PUSH MENU* ⑅┓
┃ꕤ .jpm
┃ꕤ .jpmhidetag
┃ꕤ .jpmfoto
┗⑅━━━━━━━━━⑅┛
┏━⑅ *CHANNEL MENU* ⑅┓
┃ꕤ .cekidch
┃ꕤ .addch
┃ꕤ .delch
┃ꕤ .listch
┃ꕤ .jpmch
┗⑅━━━━━━━━━⑅┛
`
      sock.sendMessage(m.chat, {
        document: {
          url: thumb
        },
        mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        fileName: `${botname}`,
        fileLength: 100000000000,
        caption: teks,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            containsAutoReply: true,
            mediaType: 1,
            mediaUrl: ``,
            renderLargerThumbnail: true,
            showAdAttribution: false,
            sourceUrl: ``,
            thumbnailUrl: `${global.thumb}`,
            title: `${botname.toUpperCase()}`,
            body: ``,
            mentionedJid: [m.sender],
            isForwarded: true,
          },
          forwardedNewsletterMessageInfo: {
            newsletterJid: chjid + "@newsletter",
            newsletterName: `${wm}`,
            serverMessageId: 143
          },
          businessMessageForwardInfo: {
            businessOwnerJid: sock.decodeJid(sock.user.id)
          }
        },
        footer: `${wm}`,
        viewOnce: true
      }, {
        quoted: fconvert
      })
    }
    break

    //Mainmenu

    case 'qc':
    case 'qcstic': {
      if (!args[0]) return m.reply(`Contoh: ${p_c} white halo`)
      if (text.length > 80) return m.reply(`Maximal 80 karakter!`)
      react()
      let message = text
      let backgroundColor = '#ffffff'
      const username = db.data.users[m.sender].nama
      const avatar = await sock.profilePictureUrl(m.sender, "image").catch(() => 'https://files.catbox.moe/nwvkbt.png')
      const json = {
        type: 'quote',
        format: 'png',
        backgroundColor,
        width: 512,
        height: 768,
        scale: 2,
        messages: [{
          entities: [],
          avatar: true,
          from: {
            id: 1,
            name: username,
            photo: {
              url: avatar
            }
          },
          text: message,
          replyMessage: {}
        }]
      }
      const response = await axios.post('https://bot.lyo.su/quote/generate', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const buffer = Buffer.from(response.data.result.image, 'base64')
      sock.sendImageAsSticker(m.chat, buffer, m, {
        packname: packname,
        author: author
      })
    }
    break

    case 'runtime': {
      m.reply(`Bot runtime: ${runtime(process.uptime())}`)
    }
    break

    case 'ttf':
    case 'totalfitur': {
      m.reply(`Total fitur case: *${totalFitur()}*`)
    }
    break

    case 'rvo':
    case 'readvo':
    case 'readviewonce': {
      if (!m.quoted) return m.reply('Kutip pesan view-once!')
      let msg = m.quoted
      let type = msg.mtype
      if (!msg.viewOnce) return m.reply('Itu bukan pesan view-once!')

      let media = await downloadContentFromMessage(
        msg,
        type === 'imageMessage' ? 'image' :
        type === 'videoMessage' ? 'video' : 'audio'
      )

      let buffer = Buffer.from([])
      for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk])
      }

      let sendOptions = {
        quoted: m
      }
      if (/video/.test(type)) {
        return sock.sendMessage(m.chat, {
          video: buffer,
          caption: msg.caption || ''
        }, sendOptions)
      } else if (/image/.test(type)) {
        return sock.sendMessage(m.chat, {
          image: buffer,
          caption: msg.caption || ''
        }, sendOptions)
      } else if (/audio/.test(type)) {
        return sock.sendMessage(m.chat, {
          audio: buffer,
          mimetype: 'audio/mpeg',
          ptt: true
        }, sendOptions)
      }
    }
    break

    case 'ai':
    case 'gpt': {
      try {
        if (!text) return m.reply(`Contoh: ${p_c} hai`)
        let pesan = text.toLowerCase().trim()
        react()

        async function AI(content) {
          try {
            const response = await axios.post('https://luminai.my.id/', {
              content,
              cName: "S-AI",
              cID: "S-AIbAQ0HcC"
            })

            return response.data
          } catch (error) {
            console.error(error)
            throw error
          }
        }

        let sai = await AI(pesan)
        m.reply(sai.result)

      } catch (err) {
        console.error(err)
        m.reply('Terjadi kesalahan')
      }
    }
    break

    case 's':
    case 'stiker':
    case 'setiker':
    case 'sticker': {
      if (!quoted) return m.reply(`Kirim/kutip gambar dengan caption ${p_c}`)
      react()

      if (quoted) {
        let msg = quoted
        let type = Object.keys(msg)[0]
        if (msg[type].viewOnce) {
          let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
          let buffer = Buffer.from([])
          for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk])
          }
          if (/video/.test(type)) {
            if ((quoted.msg || quoted).seconds > 25) return m.reply('Maksimal 25 detik!')
            await sock.vidToSticker(m.chat, buffer, m, {
              packname: packname,
              author: author
            })
            return
          } else if (/image/.test(type)) {
            await sock.imgToSticker(m.chat, buffer, m, {
              packname: packname,
              author: author
            })
            return
          }
        }
      }

      if (/image/.test(mime)) {
        let media = await sock.downloadAndSaveMediaMessage(quoted, +new Date * 1)
        await sock.imgToSticker(m.chat, media, m, {
          packname: packname,
          author: author
        })
        await fs.unlinkSync(media)
      } else if (/video/.test(mime)) {
        if ((quoted.msg || quoted).seconds > 25) return m.reply('Maksimal 25 detik!')
        let media = await sock.downloadAndSaveMediaMessage(quoted, +new Date * 1)
        await sock.vidToSticker(m.chat, media, m, {
          packname: packname,
          author: author
        })
        await fs.unlinkSync(media)
      } else if (/sticker/.test(mime)) {
        let media = await sock.downloadAndSaveMediaMessage(quoted, +new Date * 1)
        await sock.sendStickerFromUrl(m.chat, media, m, {
          packname: packname,
          author: author
        })
        await fs.unlinkSync(media)
      } else m.reply(`Kirim/kutip gambar dengan caption ${p_c}`)
    }
    break

    case 'brat': {
      if (!text) return m.reply(`Contoh: ${p_c} hai`)
      if (text.length > 250) return m.reply(`Karakter terbatas, max 250!`)
      react()
      let res = await fetch(`https://aqul-brat.hf.space/?text=${encodeURIComponent(text)}`)
      let buffer = await res.buffer()
      await sock.sendImageAsSticker(m.chat, buffer, m, {
        packname: packname,
        author: author
      })
    }
    break

    case 'wm':
    case 'swm': {
      if (!quoted) return m.reply(`Kirim/kutip stiker lalu ketik ${p_c} teks1|teks2`)

      let [teks1, teks2] = text.split('|').map(v => v || '')
      react()

      let processSticker = async (media, type) => {
        await sock[`${type}ToSticker`](m.chat, media, m, {
          packname: teks1,
          author: teks2
        })
      }

      if (m.quoted.isAnimated) {
        let media = await sock.downloadAndSaveMediaMessage(quoted, new Date * 1)
        const {
          webp2mp4File
        } = require('./lib/scrape')
        let buffer = await getBuffer(await webp2mp4File(await CatBox(media)))
        await processSticker(buffer, 'vid')
        fs.unlinkSync(media)
      } else if (/image/.test(mime)) {
        let media = await quoted.download()
        await processSticker(media, 'img')
        fs.unlinkSync(media)
      } else if (/video/.test(mime)) {
        if ((quoted.msg || quoted).seconds > 18) return m.reply('Maksimal 18 detik!')
        let media = await quoted.download()
        await processSticker(media, 'vid')
        fs.unlinkSync(media)
      } else {
        m.reply(`Kirim/kutip stiker lalu ketik ${p_c} teks1|teks2`)
      }
    }
    break

    case 'tourl':
    case 'tolink': {
      if (!/image/.test(mime) && !/video/.test(mime) && !/audio/.test(mime) && !/webp/.test(mime)) return m.reply('Harus berupa video, gambar, audio, atau stiker')
      react()
      let media = await sock.downloadAndSaveMediaMessage(quoted)
      try {
        const catBoxUrl = await CatBox(media)
        const result = `📦 *CatBox*: ${catBoxUrl || '-'}`
        await m.reply(result)
      } catch (err) {
        console.error(err)
      } finally {
        await fs.unlinkSync(media)
      }
    }
    break

    case 'removebg':
    case 'nobg': {
      if (!/image/.test(mime)) return m.reply(`Kirim/kutip gambar/stiker dengan caption ${p_c}`)
      react()
      let {
        removeBg
      } = require('./lib/scrape')
      let img = await quoted.download()
      let image = await removeBg(img)
      let result = await Buffer.from(image, "base64")
      sock.sendImage(m.chat, result, `© ${wm}`, m)
    }
    break

    case 'hd':
    case 'hdr':
    case 'remini': {
      if (!/image/.test(mime)) return m.reply(`Kirim/kutip gambar dengan caption ${p_c}`)
      react()

      const {
        upScale,
        remini,
        Pxpic
      } = require('./lib/scrape')
      const media = await sock.downloadAndSaveMediaMessage(quoted)

      const hasilnya = await Pxpic(media, 'enhance')
      if (hasilnya?.resultImageUrl) {
        await sock.sendMessage(m.chat, {
          image: {
            url: hasilnya.resultImageUrl
          },
          caption: 'Sukses'
        }, {
          quoted: m
        })
        fs.unlinkSync(media)
        return
      }

      if (await upScale(media, sock, m, m.chat)) {
        fs.unlinkSync(media)
        return
      }

      const proses = await remini(media, 'enhance')
      if (proses) {
        await sock.sendMessage(m.chat, {
          image: proses,
          caption: 'Sukses'
        }, {
          quoted: m
        })
      } else {
        m.reply('Terjadi kesalahan')
      }

      fs.unlinkSync(media)
    }
    break

    // Download

    case 'tt':
    case 'ttdl':
    case 'tiktok': {
      try {
        if (!text) return m.reply(`Contoh: ${p_c} linknya`)
        if (!text.includes('tiktok.com')) return m.reply('Harus berupa link tiktok!')
        react()

        const {
          tiktokDl
        } = require('./lib/scrape')
        let jir = await tiktokDl(text)
        if (jir.status && jir.data.length > 0) {
          const nowmVideo = jir.data.find(item => item.type === 'nowatermark')
          if (nowmVideo) {
            let caption = `🎬 *Video TikTok* \n\n`
            caption += `*Title:* ${jir.title}\n`
            caption += `*Author:* ${jir.author.fullname} (@${jir.author.nickname})\n`
            caption += `*Views:* ${jir.stats.views}\n`
            caption += `*Likes:* ${jir.stats.likes}\n`
            caption += `*Comments:* ${jir.stats.comment}\n`
            caption += `*Shares:* ${jir.stats.share}\n`
            caption += `*Music:* ${jir.music_info.title} - ${jir.music_info.author}\n`
            caption += `*Music URL:* ${jir.music_info.url}\n`

            return await sock.sendMessage(
              m.chat, {
                video: {
                  url: nowmVideo.url
                },
                caption: caption,
              }, {
                quoted: m
              }
            )
          }
        }

        throw new Error('Terjadi kesalahan')
      } catch (err) {
        console.error('Terjadi kesalahan: ', err)
        m.reply('Terjadi kesalahan')
      }
    }
    break

    case 'ig':
    case 'igdl':
    case 'instagram': {
      try {
        if (!text) return m.reply(`Contoh penggunaan:\n${p_c}ig https://www.instagram.com/reel/xxxxx/`)
        if (!/^https?:\/\/(www\.)?instagram\.com/.test(text)) return m.reply('Link tidak valid! Harus dari Instagram.')

        react()

        let res = await fetchJson(`https://api.vreden.my.id/api/igdownload?url=${encodeURIComponent(text)}`)
        let media = res?.result?.response?.data?.[0]

        if (!media || !media.url) return m.reply('Media tidak ditemukan atau link rusak.')

        let isVideo = media.type === 'video'

        await sock.sendMessage(m.chat, {
          [isVideo ? 'video' : 'image']: {
            url: media.url,
            ...(isVideo && media.thumb ? {
              thumbnail: await (await fetch(media.thumb)).buffer()
            } : {})
          },
          caption: `📥 Instagram Download\n\nType: ${media.type}\n© ${wm}`
        }, {
          quoted: m
        })

      } catch (err) {
        console.error('Instagram Error:', err)
        m.reply('⚠️ Terjadi kesalahan saat mengambil media dari Instagram.')
      }
    }
    break

    case 'mediafire':
    case 'mfdl': {
      try {
        if (!text) return m.reply(`Contoh: ${p_c} linknya`)
        if (!text.includes('mediafire.com')) return m.reply('Harus berupa link mediafire!')
        react()

        let api = await fetchJson(`https://api.vreden.web.id/api/mediafiredl?url=${text}`)
        let data = api.result?.[0]

        let fileNama = decodeURIComponent(data.nama || 'file.zip')
        let extension = fileNama.split('.').pop().toLowerCase()

        let res = await axios.get(data.link, {
          responseType: 'arraybuffer'
        })
        let media = Buffer.from(res.data)

        let mimetype = ''
        if (extension === 'mp4') mimetype = 'video/mp4'
        else if (extension === 'mp3') mimetype = 'audio/mp3'
        else mimetype = `application/${extension}`

        sock.sendMessage(m.chat, {
          document: media,
          fileName: fileNama,
          mimetype: mimetype
        }, {
          quoted: m
        })

      } catch (err) {
        m.reply('Terjadi kesalahan: ' + err)
      }
    }
    break

    case 'play':
    case 'ytplay': {
      try {
        if (!text) return m.reply(`*Masukkan Judul Lagu!*\n\nContoh:\n${prefix + command} My Little Dark Age`)
        react()

        const search = await ytdl.search(text)
        const data = search.results.filter(objek => objek.type === "video")
        const convert = data[0]
        if (!convert) return m.reply('Audio tidak ditemukan!')

        const response = await ytdlv2(convert.url, 'mp3', 128)
        if (!fs.existsSync(response.download)) return m.reply('Gagal mengunduh audio!')

        const resThumb = await axios.get(convert.thumbnail, {
          responseType: 'arraybuffer'
        })
        const thumbs = Buffer.from(resThumb.data)

        await sock.sendMessage(m.chat, {
          audio: fs.readFileSync(response.download),
          mimetype: 'audio/mpeg',
          ptt: false,
          contextInfo: {
            externalAdReply: {
              title: convert.title,
              body: `${global.botname || ''} Music Play`,
              thumbnail: thumbs,
              mediaType: 1,
              mediaUrl: convert.url,
              sourceUrl: convert.url,
              renderLargerThumbnail: true,
              showAdAttribution: false
            }
          }
        }, {
          quoted: m
        })

        fs.unlinkSync(response.download)
        sock.sendMessage(m.chat, {
          react: {
            text: '✅',
            key: m.key
          }
        })

      } catch (err) {
        console.error(err)
        m.reply('Terjadi kesalahan: ' + err.message)
      }
    }
    break

    case 'ytmp3':
    case 'ytaudio': {
      try {
        if (!text) return m.reply(`Contoh: ${p_c} linknya`)
        const response = await ytdlv2(args[0], 'mp3', args[1] ? args[1] : 128)
        react()
        await sock.sendMessage(m.chat, {
          audio: fs.readFileSync(response.download),
          mimetype: 'audio/mpeg'
        }, {
          quoted: m
        })
        fs.unlinkSync(response.download)
      } catch (err) {
        m.reply('Terjadi kesalahan ' + err)
      }
    }
    break

    case 'ytmp4':
    case 'ytvideo': {
      try {
        if (!text) return m.reply(`Contoh: ${p_c} linknya`)
        const response = await ytdlv2(args[0], 'mp4', args[1] ? args[1] : 480)
        react()
        await sock.sendMessage(m.chat, {
          video: fs.readFileSync(response.download),
          caption: `Title: ${response.file_name}\nSize: ${response.file_size}`,
          quoted: m
        })
        fs.unlinkSync(response.download)
      } catch (err) {
        m.reply('Terjadi kesalahan ;' + err)
      }
    }
    break

    case 'git':
    case 'gitclone': {
      try {
        if (!args[0]) return m.reply(`Contoh: ${p_c} linknya`)
        if (!isUrl(args[0]) && !args[0].includes('github.com')) return m.reply(`Harus berupa link github!`)
        react()
        let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
        var [, user, repo] = args[0].match(regex1) || []
        repo = repo.replace(/.git$/, '')
        var url = `https://api.github.com/repos/${user}/${repo}/zipball`
        let filename = (await fetch(url, {
          method: 'HEAD'
        })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
        sock.sendMessage(m.chat, {
          document: {
            url: url
          },
          fileName: filename + '.zip',
          mimetype: 'application/zip'
        }, {
          quoted: m
        })
      } catch (err) {
        m.reply('Terjadi kesalahan')
      }
    }
    break

    // Search

    case 'pin':
    case 'pinsearch':
    case 'pinterest': {
      if (!text) return m.reply(`Contoh: ${p_c} animek`)
      react()
      try {
        let hasil = await pinterest(text)
        if (!hasil) return m.reply('Gambar tidak ditemukan.')

        await sock.sendMessage(
          m.chat, {
            image: {
              url: hasil
            },
            caption: `© ${wm}`,
          }, {
            quoted: m
          }
        )
      } catch (err) {
        console.error(err.message)
        m.reply('Terjadi kesalahan')
      }
    }
    break

    case 'yts':
    case 'ytsearch': {
      if (!text) return m.reply(`Contoh: ${p_c} lugowo dangdut`)
      try {
        react()
        let results = await yt_search(text)
        if (!results.length) return m.reply('Tidak ditemukan hasil untuk pencarianmu.')

        let teks = `*YOUTUBE - SEARCH*\n\nHasil pencarian untuk: *${text}*\n\n`
        for (let i = 0; i < results.length && i < 10; i++) {
          let vid = results[i]
          teks += `🎬 *${vid.title}*\n`
          teks += `👤 Channel: ${vid.author}\n`
          teks += `⏱️ Durasi: ${vid.duration}\n`
          teks += `📅 Upload: ${vid.ago}\n`
          teks += `👁️ Views: ${toRupiah(vid.views)}\n`
          teks += `🔗 Link: ${vid.url}\n\n`
        }

        sock.sendMessage(m.chat, {
          image: {
            url: results[0].thumbnail
          },
          caption: teks
        }, {
          quoted: m
        })
      } catch (err) {
        console.error(err)
        m.reply(`Terjadi kesalahan saat mencari video.\n\n${err.message}`)
      }
    }
    break

    case 'gimage': {
      if (!text) return m.reply(`Contoh: ${p_c} gojo satoru`)
      react()

      try {
        const {
          gimage
        } = require('./lib/scrape')
        const images = await gimage(text)
        if (!images.length) return m.reply('Gambar tidak ditemukan')

        const randomImage = images[Math.floor(Math.random() * images.length)].link

        const buttons = [{
          buttonId: `${_p}gimage ${text}`,
          buttonText: {
            displayText: 'Next'
          },
          type: 1
        }]

        await sock.sendMessage(
          m.chat, {
            image: {
              url: randomImage
            },
            caption: `© ${wm}`,
          }, {
            quoted: m
          }
        )

      } catch (err) {
        m.reply(`Terjadi kesalahan: ${err}`)
      }
    }
    break

    case 'tiktoks':
    case 'ttsearch':
    case 'tiktoksearch': {
      try {
        if (!text) return m.reply(`Contoh: ${p_c} anime edits`)
        react()
        let serach = await tiktokSearchVideo(text)
        let teks = '*TIKTOK - SEARCH*\n\n'
        let no = 1
        for (let i of serach.videos) {
          let sut = await JSON.stringify(i.author)
          teks += `• No Urutan: ${no++}\n• Capt: ${i.title}\n• Username: ${i.author.unique_id}\n• Nickname: ${i.author.nickname}\n• Durasi: ${toRupiah(i.duration)} detik\n• Like: ${toRupiah(i.digg_count)}\n• Komentar: ${toRupiah(i.comment_count)}\n• Share: ${toRupiah(i.share_count)}\n• Url: https://www.tiktok.com/@${i.author.unique_id}/video/${i.video_id}\n\n\n`
        }
        sock.sendMessage(m.chat, {
          video: {
            url: `https://tikwm.com${serach.videos[0].play}`
          },
          caption: teks
        }, {
          quoted: m
        })
      } catch (err) {
        m.reply(`Terjadi kesalahan`);
      }
    }
    break

    case 'npm':
    case 'npms':
    case 'npmsearch': {
      if (!text) return m.reply(`Contoh ${p_c} nama package`)
      let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
      let {
        objects
      } = await res.json()
      if (!objects.length) return m.reply('Tidak ditemukan')
      let txt = objects.map(({
        package: pkg
      }) => {
        return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`
      }).join`\n\n`
      m.reply(txt)
    }
    break

    // Group

    case 'antilink': {
      if (!m.isGroup) return onlyGrup()
      if (!isAdmins) return onlyAdmin()
      if (args[0] === "on") {
        if (db.data.chats[m.chat].antilink) return m.reply('Sudah aktif sebelumnya')
        db.data.chats[m.chat].antilink = true
        m.reply('Sukses mengaktifkan antilink!')
      } else if (args[0] === "off") {
        if (!db.data.chats[m.chat].antilink) return m.reply('Sudah nonaktifkan sebelumnya')
        db.data.chats[m.chat].antilink = false
        m.reply('Sukses menonaktifkan antilink!')
      } else {
        m.reply('Perintah tidak dikenali. Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan.')
      }
    }
    break

    case 'antilinkgc': {
      if (!m.isGroup) return onlyGrup()
      if (!isAdmins) return onlyAdmin()
      if (args[0] === "on") {
        if (db.data.chats[m.chat].antilinkgc) return m.reply('Sudah aktif sebelumnya')
        db.data.chats[m.chat].antilinkgc = true
        m.reply('Sukses mengaktifkan antilinkgc!')
      } else if (args[0] === "off") {
        if (!db.data.chats[m.chat].antilinkgc) return m.reply('Sudah nonaktifkan sebelumnya')
        db.data.chats[m.chat].antilinkgc = false
        m.reply('Sukses menonaktifkan antilinkgc!')
      } else {
        m.reply('Perintah tidak dikenali. Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan.')
      }
    }
    break

    case 'antilinkch': {
      if (!m.isGroup) return onlyGrup()
      if (!isAdmins) return onlyAdmin()
      if (args[0] === "on") {
        if (db.data.chats[m.chat].antilinkch) return m.reply('Sudah aktif sebelumnya')
        db.data.chats[m.chat].antilinkch = true
        m.reply('Sukses mengaktifkan antilinkch!')
      } else if (args[0] === "off") {
        if (!db.data.chats[m.chat].antilinkch) return m.reply('Sudah nonaktifkan sebelumnya')
        db.data.chats[m.chat].antilinkch = false
        m.reply('Sukses menonaktifkan antilinkch!')
      } else {
        m.reply('Perintah tidak dikenali. Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan.')
      }
    }
    break

case 'antitagsw': {
      if (!m.isGroup) return onlyGrup()
      if (!isAdmins) return onlyAdmin()
      if (args[0] === "on") {
        if (db.data.chats[m.chat].antitagsw) return m.reply('Sudah aktif sebelumnya')
        db.data.chats[m.chat].antitagsw = true
        m.reply('Sukses mengaktifkan antitagsw!')
      } else if (args[0] === "off") {
        if (!db.data.chats[m.chat].antitagsw) return m.reply('Sudah nonaktifkan sebelumnya')
        db.data.chats[m.chat].antitagsw = false
        m.reply('Sukses menonaktifkan antitagsw!')
      } else {
        m.reply('Perintah tidak dikenali. Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan.')
      }
    }
    break

case 'antitoxic': {
      if (!m.isGroup) return onlyGrup()
      if (!isAdmins) return onlyAdmin()
      if (args[0] === "on") {
        if (db.data.chats[m.chat].antitoxic) return m.reply('Sudah aktif sebelumnya')
        db.data.chats[m.chat].antitoxic = true
        m.reply('Sukses mengaktifkan antitoxic!')
      } else if (args[0] === "off") {
        if (!db.data.chats[m.chat].antitoxic) return m.reply('Sudah nonaktifkan sebelumnya')
        db.data.chats[m.chat].antitoxic = false
        m.reply('Sukses menonaktifkan antitoxic!')
      } else {
        m.reply('Perintah tidak dikenali. Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan.')
      }
    }
    break
    
    case 'anti18+': {
      if (!m.isGroup) return onlyGrup()
      if (!isAdmins) return onlyAdmin()
      if (args[0] === "on") {
        if (db.data.chats[m.chat].anti18) return m.reply('Sudah aktif sebelumnya')
        db.data.chats[m.chat].anti18 = true
        m.reply('Sukses mengaktifkan anti18!')
      } else if (args[0] === "off") {
        if (!db.data.chats[m.chat].anti18) return m.reply('Sudah nonaktifkan sebelumnya')
        db.data.chats[m.chat].anti18 = false
        m.reply('Sukses menonaktifkan anti18!')
      } else {
        m.reply('Perintah tidak dikenali. Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan.')
      }
    }
    break
    
    case 'antisticker': {
      if (!m.isGroup) return onlyGrup()
      if (!isAdmins) return onlyAdmin()
      if (args[0] === "on") {
        if (db.data.chats[m.chat].antisticker) return m.reply('Sudah aktif sebelumnya')
        db.data.chats[m.chat].antisticker = true
        m.reply('Sukses mengaktifkan antisticker!')
      } else if (args[0] === "off") {
        if (!db.data.chats[m.chat].antisticker) return m.reply('Sudah nonaktifkan sebelumnya')
        db.data.chats[m.chat].antisticker = false
        m.reply('Sukses menonaktifkan antisticker!')
      } else {
        m.reply('Perintah tidak dikenali. Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan.')
      }
    }
    break
    
    case 'welcome': {
      if (!m.isGroup) return onlyGrup()
      if (!isAdmins) return onlyAdmin()
      if (args[0] === "on") {
        if (db.data.chats[m.chat].welcome) return m.reply('Sudah aktif sebelumnya')
        db.data.chats[m.chat].welcome = true
        m.reply('Sukses mengaktifkan welcome!')
      } else if (args[0] === "off") {
        if (!db.data.chats[m.chat].welcome) return m.reply('Sudah nonaktifkan sebelumnya')
        db.data.chats[m.chat].welcome = false
        m.reply('Sukses menonaktifkan welcome!')
      } else {
        m.reply('Perintah tidak dikenali. Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan.')
      }
    }
    break

    case 'goodbye': {
      if (!m.isGroup) return onlyGrup()
      if (!isAdmins) return onlyAdmin()
      if (args[0] === "on") {
        if (db.data.chats[m.chat].goodbye) return m.reply('Sudah aktif sebelumnya')
        db.data.chats[m.chat].goodbye = true
        m.reply('Sukses mengaktifkan goodbye!')
      } else if (args[0] === "off") {
        if (!db.data.chats[m.chat].goodbye) return m.reply('Sudah nonaktifkan sebelumnya')
        db.data.chats[m.chat].goodbye = false
        m.reply('Sukses menonaktifkan goodbye!')
      } else {
        m.reply('Perintah tidak dikenali. Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan.')
      }
    }
    break

    case 'buatgc':
    case 'creategc': {
      if (!isOwner) return onlyOwn()
      if (!args.join(" ")) return m.reply(`Contoh: ${p_c} namagrup`)
      try {
        let cret = await sock.groupCreate(args.join(" "), [])
        let response = await sock.groupInviteCode(cret.id)
        let teks2 = `*BERHASIL MEMBUAT GRUP*

• Nama: ${cret.subject}
• Owner: @${cret.owner.split("@")[0]}
• Dibuat: ${moment(cret.creation * 1000).tz("Asia/Kolkata").format("DD/MM/YYYY HH:mm:ss")}
• ID: ${cret.id}
• Link: chat.whatsapp.com/${response}`
        m.reply(teks2)
      } catch {
        m.reply('Terjadi kesalahan')
      }
    }
    break

    case 'kick': {
      if (!m.isGroup) return onlyGrup()
      if (!isOwner && !isAdmins) return onlyAdmin()
      if (!isBotAdmins) return onlyBotAdmin()

      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

      try {
        const participants = await sock.groupMetadata(m.chat)
        const ownerNumber = global.owner + '@s.whatsapp.net'

        if (users === ownerNumber || users === botNumber) {
          return m.reply('Ga bisa ngeluarin admin utama atau bot.')
        }

        if (!participants.participants.some(p => p.id === users)) {
          return m.reply('Target nggak ada di grup.')
        }

        await sock.groupParticipantsUpdate(m.chat, [users], 'remove')
        m.reply('Sukses kick target.')
      } catch (err) {
        m.reply('Terjadi kesalahan.')
      }
    }
    break

    case 'warning':
    case 'warn': {
      if (!m.isGroup) return onlyGrup()
      if (!isAdmins) return onlyAdmin()
      if (!isBotAdmins) return onlyBotAdmin()

      let users = m.mentionedJid[0] ?
        m.mentionedJid[0] :
        m.quoted ?
        m.quoted.sender :
        text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

      if (!users) return m.reply(`Tag/Reply target yang mau di-${command}`)
      if (owner.includes(users)) return m.reply('Tidak dapat melakukannya kepada Owner')

      if (!db.data.chats[m.chat].warn) db.data.chats[m.chat].warn = {}
      db.data.chats[m.chat].warn[users] = (db.data.chats[m.chat].warn[users] || 0) + 1

      const total = db.data.chats[m.chat].warn[users]

      sock.sendTextWithMentions(m.chat, `⚠️ Sukses *${command}* @${users.split('@')[0]}\nTotal Warning: ${total}/${setting.warnCount}`, m)

      if (total >= setting.warnCount) {
        if (!isAdmins || !isBotAdmins) return

        await sock.sendMessage(m.chat, {
          text: `🚫 @${users.split('@')[0]} telah mencapai ${total}/${setting.warnCount} warning dan akan dikeluarkan.`,
          mentions: [users]
        })

        await sock.groupParticipantsUpdate(m.chat, [users], 'remove')
        delete db.data.chats[m.chat].warn[users]
      }
    }
    break

    case 'unwarning':
    case 'unwarn': {
      if (!m.isGroup) return onlyGrup()
      if (!isAdmins) return onlyAdmin()
      if (!isBotAdmins) return onlyBotAdmin()

      let users = m.mentionedJid[0] ?
        m.mentionedJid[0] :
        m.quoted ?
        m.quoted.sender :
        text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

      if (!users) return m.reply(`Tag/Reply target yang mau di-${command}`)
      if (owner.includes(users)) return m.reply('Tidak dapat melakukan unwarn kepada Owner')

      if (!db.data.chats[m.chat].warn) db.data.chats[m.chat].warn = {}

      if (!db.data.chats[m.chat].warn[users] || db.data.chats[m.chat].warn[users] === 0) {
        return m.reply(`User tersebut belum memiliki warning.`)
      }

      db.data.chats[m.chat].warn[users] -= 1

      const sisa = db.data.chats[m.chat].warn[users]

      sock.sendTextWithMentions(m.chat, `✅ Sukses *${command}* @${users.split('@')[0]}\nSisa Warning: ${sisa}/${setting.warnCount}`, m)
      if (db.data.chats[m.chat].warn[users] === 0) {
        delete db.data.chats[m.chat].warn[m.sender];
      }
    }
    break

    case 'listwarn':
    case 'cekwarn': {
      if (!m.isGroup) return onlyGrup()
      if (!isAdmins) return onlyAdmin()

      let warnData = db.data.chats[m.chat].warn
      if (!warnData || Object.keys(warnData).length === 0) {
        return m.reply('Tidak ada member yang memiliki warning di grup ini.')
      }

      let teks = `⚠️ *Daftar Warning Member Grup:*\n\n`
      let no = 1

      for (let jid in warnData) {
        teks += `${no++}. @${jid.split('@')[0]} - ${warnData[jid]}/${setting.warnCount} warning\n`
      }

      await sock.sendTextWithMentions(m.chat, teks, m)
    }
    break

    case 'pm':
    case 'promote': {
      if (!m.isGroup) return onlyGrup()
      if (!isOwner && !isAdmins) return onlyAdmin()
      if (!isBotAdmins) return onlyBotAdmin()
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
      await sock.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply('Sukses promote target')).catch((err) => m.reply('Terjadi kesalahan'))
    }
    break

    case 'dm':
    case 'demote': {
      if (!m.isGroup) return onlyGrup()
      if (!isOwner && !isAdmins) return onlyAdmin()
      if (!isBotAdmins) return onlyBotAdmin()
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
      await sock.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply('Sukses demote target')).catch((err) => m.reply('Terjadi kesalahan'))
    }
    break

    case 'h':
    case 'ht':
    case 'hidetag': {
      if (!m.isGroup) return onlyGrup()
      if (!isOwner && !isAdmins) return onlyOa()
      if (m.quoted) {
        await sock.sendMessage(m.chat, {
          forward: m.quoted.fakeObj,
          mentions: participants.map(a => a.id)
        })
      }
      if (!m.quoted) {
        await sock.sendMessage(m.chat, {
          text: q ? q : '',
          mentions: participants.map(a => a.id)
        }, {
          quoted: ftext
        })
      }
    }
    break

    case 'open':
    case 'bukagc':
    case 'buka': {
      if (!m.isGroup) return onlyGrup()
      if (!isOwner && !isAdmins) return onlyAdmin()
      if (!isBotAdmins) return onlyBotAdmin()
      sock.groupSettingUpdate(m.chat, 'not_announcement')
      m.reply(`Sukses membuka grup`)
    }
    break

    case 'close':
    case 'tutupgc':
    case 'tutup': {
      if (!m.isGroup) return onlyGrup()
      if (!isOwner && !isAdmins) return onlyAdmin()
      if (!isBotAdmins) return onlyBotAdmin()
      sock.groupSettingUpdate(m.chat, 'announcement')
      m.reply(`Sukses menutup grup`)
    }
    break

    case 'resetlink':
    case 'revoke': {
      if (!m.isGroup) return onlyGrup()
      if (!isOwner && !isAdmins) return onlyAdmin()
      if (!isBotAdmins) return onlyBotAdmin()
      await sock.groupRevokeInvite(m.chat)
        .then(res => {
          m.reply(`Sukses menyetel ulang link grup`)
        }).catch(() => m.reply('Terjadi kesalahan'))
    }
    break

    case 'leave': {
      try {
        if (!isOwner) return onlyOwn()
        await sock.groupLeave(m.chat)
      } catch (err) {
        console.error(err)
        m.reply('Terjadi kesalahan')
      }
    }
    break

    case 'tagall': {
      if (!m.isGroup) return onlyGrup()
      if (!isOwner && !isAdmins) return onlyOa()
      if (!isBotAdmins) return onlyBotAdmin()
      let teks = `*👥 Tag All By Admin*

@${m.chat}
 
Pesan: ${q ? q : 'Tidak ada'}`
      sock.sendMessage(m.chat, {
        text: teks,
        contextInfo: {
          mentionedJid: participants.map(a => a.id),
          groupMentions: [{
            groupJid: m.chat,
            groupSubject: "everyone"
          }]
        }
      }, {
        quoted: m
      })
    }
    break

    case 'cekidgc':
    case 'cekgcid':
    case 'groupid': {
      if (!m.isGroup) return onlyGrup();
      let admin = groupMetadata.participants.filter(p => p.admin);
      let creationDate = moment(groupMetadata.creation * 1000).format('DD/MM/YY HH:mm');
      let subject = groupMetadata.subject;
      let restrict = groupMetadata.restrict ? 'Hanya admin' : 'Semua peserta';
      let announce = groupMetadata.announce ? 'Hanya admin' : 'Semua peserta';
      let antiLink = db.data.chats[m.chat].antilink ? 'Aktif' : 'Nonaktif';
      let antiLinkgc = db.data.chats[m.chat].antilinkgc ? 'Aktif' : 'Nonaktif';
      let antilinkch = db.data.chats[m.chat].antilinkch ? 'Aktif' : 'Nonaktif';
      let antitagsw = db.data.chats[m.chat].antitagsw ? 'Aktif' : 'Nonaktif';
      let antitoxic = db.data.chats[m.chat].antitoxic ? 'Aktif' : 'Nonaktif';
      let anti18 = db.data.chats[m.chat].anti18 ? 'Aktif' : 'Nonaktif';
      let antisticker = db.data.chats[m.chat].antisticker ? 'Aktif' : 'Nonaktif';
      let teks = `${monospace("CEK GROUP ID")}

Nama grup: ${subject}
Total member: ${groupMetadata.participants.length}
Tgl dibuat: ${creationDate}

ID: ${groupMetadata.id}`;
      m.reply(teks)
    }
    break

    // Cpanel

    case 'cpanel': {
      if (!isOwner && !isReseller) return onlyOr()
      const t = text.split('-');
      if (t.length < 2) return m.reply(`Format: ${_p}cpanel username-nomor\nContoh: ${_p}cpanel johndoe-628123456789`);

      const [username, nomor] = t;
      if (!username || !nomor) return m.reply(`Format salah! Contoh: ${_p}cpanel username-nomor`);
      sock.sendMessage(
        m.chat, {
          document: {
            url: thumb
          },
          mimetype: "image/png",
          pageCount: 2025,
          fileName: `${botname}`,
          fileLength: 100000000000000,
          jpegThumbnail: fs.readFileSync('./lib/thumbnail.jpg'),
          caption: `📌 *Pembuatan CPanel* 📌\n\nUntuk: ${username}\nNomor: ${nomor}\n\nSilakan pilih paket:`,
          contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: chjid + "@newsletter",
              newsletterName: `${wm}`,
              serverMessageId: 143
            },
            businessMessageForwardInfo: {
              businessOwnerJid: sock.decodeJid(sock.user.id)
            }
          },
          footer: `${wm}`,
          buttons: [{
            buttonId: 'action',
            buttonText: {
              displayText: 'Pilih Paket CPanel'
            },
            type: 4,
            nativeFlowInfo: {
              name: 'single_select',
              paramsJson: JSON.stringify({
                title: 'PILIH CPANEL',
                sections: [{
                  title: "Server Panel",
                  highlight_label: "SERVER 1 RESOURCES",
                  rows: [{
                      title: 'V1-1GB',
                      description: "RAM 1GB | Disk 1GB",
                      id: `${_p}createcpanels 1gb-${username}-${nomor}`
                    },
                    {
                      title: 'V1-2GB',
                      description: "RAM 2GB | Disk 2GB",
                      id: `${_p}createcpanels 2gb-${username}-${nomor}`
                    },
                    {
                      title: 'V1-3GB',
                      description: "RAM 3GB | Disk 3GB",
                      id: `${_p}createcpanels 3gb-${username}-${nomor}`
                    },
                    {
                      title: 'V1-4GB',
                      description: "RAM 4GB | Disk 4GB",
                      id: `${_p}createcpanels 4gb-${username}-${nomor}`
                    },
                    {
                      title: 'V1-5GB',
                      description: "RAM 5GB | Disk 5GB",
                      id: `${_p}createcpanels 5gb-${username}-${nomor}`
                    },
                    {
                      title: 'V1-6GB',
                      description: "RAM 6GB | Disk 6GB",
                      id: `${_p}createcpanels 6gb-${username}-${nomor}`
                    },
                    {
                      title: 'V1-7GB',
                      description: "RAM 7GB | Disk 7GB",
                      id: `${_p}createcpanels 7gb-${username}-${nomor}`
                    },
                    {
                      title: 'V1-8GB',
                      description: "RAM 8GB | Disk 8GB",
                      id: `${_p}createcpanels 8gb-${username}-${nomor}`
                    },
                    {
                      title: 'V1-9GB',
                      description: "RAM 9GB | Disk 9GB",
                      id: `${_p}createcpanels 9gb-${username}-${nomor}`
                    },
                    {
                      title: 'V1-10GB',
                      description: "RAM 10GB | Disk 10GB",
                      id: `${_p}createcpanels 10gb-${username}-${nomor}`
                    },
                    {
                      title: 'V1-UNLIMITED',
                      description: "Unlimited Resources",
                      id: `${_p}createcpanels unli-${username}-${nomor}`
                    }
                  ]
                }]
              })
            }
          }],
          headerType: 1,
          viewOnce: true
        }, {
          quoted: m
        })
    }
    break

    case 'createcpanels': {
  if (!isOwner && !isReseller) return onlyOr()
  const pilihanUkuran = {
    '1gb': {
      memo: 1024,
      disk: 1024,
      cpu: 30
    },
    '2gb': {
      memo: 2048,
      disk: 2048,
      cpu: 50
    },
    '3gb': {
      memo: 3072,
      disk: 3072,
      cpu: 60
    },
    '4gb': {
      memo: 4096,
      disk: 4096,
      cpu: 80
    },
    '5gb': {
      memo: 5120,
      disk: 5120,
      cpu: 90
    },
    '6gb': {
      memo: 6144,
      disk: 6144,
      cpu: 100
    },
    '7gb': {
      memo: 7168,
      disk: 7168,
      cpu: 120
    },
    '8gb': {
      memo: 8192,
      disk: 8192,
      cpu: 140
    },
    '9gb': {
      memo: 9216,
      disk: 9216,
      cpu: 150
    },
    '10gb': {
      memo: 10240,
      disk: 10240,
      cpu: 190
    },
    'unli': {
      memo: 0,
      disk: 0,
      cpu: 0
    }
  };
  const t = text.split('-');
  if (t.length < 3) {
    const pilihan = Object.keys(pilihanUkuran)
      .map((ukuran, i) => `• ${i + 1}. ${ukuran}`)
      .join('\n');
    return m.reply(`Silakan pilih ukuran disk:\n\n${pilihan}\n\nContoh: ${p_c} 1gb-username-nomer`);
  }
  const ukuran = t[0];
  if (!pilihanUkuran[ukuran]) {
    return m.reply(`Ukuran tidak valid! Pilih salah satu dari: ${Object.keys(pilihanUkuran).join(', ')}`);
  }
  const username = t[1];
  let u = t[2] ? t[2].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
  if (!u) return m.reply("Nomor tidak valid! Contoh: 1gb-username-nomer");
  const {
    memo,
    disk,
    cpu
  } = pilihanUkuran[ukuran];
  const email = `${username}@gmail.com`;
  const password = randomKarakter(5);
  const userResponse = await fetch(`${domain}api/application/users`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apikey}`
    },
    body: JSON.stringify({
      email,
      username,
      first_name: username,
      last_name: username,
      language: "en",
      password
    })
  });
  const userData = await userResponse.json();
  if (userData.errors) return m.reply(JSON.stringify(userData.errors[0], null, 2));

  const user = userData.attributes;
  const eggResponse = await fetch(`${domain}api/application/nests/5/eggs/${global.eggs}`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apikey}`
    }
  });
  const eggData = await eggResponse.json();
  const startupCmd = eggData.attributes.startup;
  const serverResponse = await fetch(`${domain}api/application/servers`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apikey}`
    },
    body: JSON.stringify({
      name: username,
      description: "Cpanel",
      user: user.id,
      egg: parseInt(global.eggs),
      docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
      startup: startupCmd,
      environment: {
        INST: "npm",
        USER_UPLOAD: "0",
        AUTO_UPDATE: "0",
        CMD_RUN: "npm start",
        JS_FILE: "./index.js"
      },
      limits: {
        memory: memo,
        swap: 0,
        disk: disk,
        io: 500,
        cpu: cpu
      },
      feature_limits: {
        databases: 0,
        backups: 0,
        allocations: 0
      },
      deploy: {
        locations: [parseInt(global.locc)],
        dedicated_ip: false,
        port_range: []
      }
    })
  });

  const serverData = await serverResponse.json();
  if (serverData.errors) return m.reply(JSON.stringify(serverData.errors[0], null, 2));

  const server = serverData.attributes;
  
  // Create interactive message with buttons
  const msg = generateWAMessageFromContent(u, {
    viewOnceMessage: {
      message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          contextInfo: {
            mentionedJid: [u],
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
              containsAutoReply: true,
              mediaType: 1,
              mediaUrl: ``,
              renderLargerThumbnail: true,
              showAdAttribution: false,
              sourceUrl: ``,
              thumbnailUrl: `${global.thumb}`,
              title: `${botname.toUpperCase()}`,
              body: ``,
              mentionedJid: [u],
              isForwarded: true,
            },
            forwardedNewsletterMessageInfo: {
              newsletterJid: chjid + "@newsletter",
              newsletterName: `${wm}`,
              serverMessageId: 143
            },
            businessMessageForwardInfo: {
              businessOwnerJid: sock.decodeJid(sock.user.id)
            }
          },
          body: proto.Message.InteractiveMessage.Body.create({
            text: `*📦 Pesanan Datang 📦* 

*Berikut Data Akun Panel Anda 🌐*
➥ *Username:* ${user.username}
➥ *Link Login:* ${domain}

*Info & Spesifikasi Server📂*
* *ID Server :* ${server.id}
* *Ram :*  ${memo} MB
* *Cpu :* ${cpu}%
* *Disk :* ${disk} MB
* *Created :* ${bulan}/${tahun}

*Rules Pembelian Panel ⚠️*
* _Simpan Data Ini Sebaik Mungkin, Seller Hanya Mengirim 1 Kali!_
* _Data Hilang/Lupa Akun, Seller Tidak Akan Bertanggung Jawab!_
* _Garansi Aktif 30 Hari Ribuan Replcae_
* _Claim Garansi Wajib Membawa Bukti Pembelian_
* _Claim Garansi Wajib Follow_ : 
${global.sch}`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: wm
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "cta_copy",
                "buttonParamsJson": JSON.stringify({
                  "display_text": "📋 Copy Password",
                  "copy_text": password,
                  "success_text": "Password copied to clipboard!"
                })
              },
              {
                "name": "cta_url",
                "buttonParamsJson": JSON.stringify({
                  "display_text": "🌐 Login Panel",
                  "url": domain,
                  "merchant_url": domain
                })
              }
            ]
          })
        })
      }
    }
  }, {
    quoted: fconvert
  });
  
  await sock.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id
  });
  
  m.reply(`SUKSES CPANEL\n\nID User: ${user.id}\nID Server: ${server.id}\nRAM: ${memo} MB\nDisk: ${disk} MB\nCPU: ${cpu}%\n\nUsername dan password telah dikirim ke nomor target.`);
}
break

    case 'delserver': {
      if (!isOwner && !isReseller) return onlyOr()
      let srv = args[0]
      if (!srv) return m.reply('Format: .delserver [server-id]\nContoh: .delserver 15 (untuk menghapus server ID 15)')

      let f = await fetch(domain + "api/application/servers/" + srv, {
        "method": "DELETE",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apikey,
        }
      })
      let res = f.ok ? {
        errors: null
      } : await f.json()
      if (res.errors) return m.reply(`Server tidak ditemukan!`)
      m.reply(`Sukses menghapus ID ${srv} dari server!`)
    }
    break

    case 'deluser': {
      if (!isOwner) return onlyOwn()
      let usr = args[0];

      if (!usr) return m.reply(`Format: ${p_c}deluser [user-id]\nContoh: ${p_c}deluser 15 (untuk menghapus user ID 15)`);

      let f = await fetch(domain + "api/application/users/" + usr, {
        "method": "DELETE",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apikey
        }
      });

      let res = f.ok ? {
        errors: null
      } : await f.json();

      if (res.errors) return m.reply(`User tidak ditemukan di server`);
      m.reply(`Sukses menghapus user ID ${usr}!`);
    }
    break

    case 'listserver': {
      if (!isOwner) return onlyOwn()
      let page = args[0] ? args[0] : '1';

      let f = await fetch(domain + "api/application/servers?page=" + page, {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apikey
        }
      });
      let res = await f.json();
      let servers = res.data;
      let sections = [];
      let messageText = `List server :\n\n`;
      for (let server of servers) {
        let s = server.attributes;
        let f3 = await fetch(domain + "api/client/servers/" + s.uuid.split`-` [0] + "/resources", {
          "method": "GET",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + capikey
          }
        });
        let data = await f3.json();
        let status = data.attributes ? data.attributes.current_state : s.status;
        messageText += `ID server: ${s.id}\n`;
        messageText += `Nama server: ${s.name}\n`;
        messageText += `Status: ${status}\n\n`;
      }
      messageText += `Halaman: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
      messageText += `Total server: ${res.meta.pagination.count}`;
      await sock.sendMessage(m.chat, {
        text: messageText
      }, {
        quoted: m
      });
      if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
        m.reply(`Contoh: ${p_c} ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya`);
      }
    }
    break

    case 'listuser': {
      if (!isOwner && !isReseller) return onlyOr()
      let page = args[0] ? args[0] : '1';

      let f = await fetch(domain + "api/application/users?page=" + page, {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apikey
        }
      });
      let res = await f.json();
      let users = res.data;
      let messageText = `List user\n\n`;
      for (let user of users) {
        let u = user.attributes;
        messageText += `ID: ${u.id} - Status: ${u.attributes?.user?.server_limit === null ? 'Tidak aktif' : 'Aktif'}\n`;
        messageText += `${u.username}\n`;
        messageText += `${u.first_name} ${u.last_name}\n\n`;
      }
      messageText += `Halaman: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
      messageText += `Total user: ${res.meta.pagination.count}`;
      await sock.sendMessage(m.chat, {
        text: messageText
      }, {
        quoted: m
      });
      if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
        m.reply(`Contoh: ${p_c} ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya`);
      }
    }
    break

    case 'addadmin': {
      if (!isOwner) return onlyOwn()

      let t = text.replace(/^\S+\s+/, '').split(',');
      if (t.length < 3) return m.reply(`Contoh: ${p_c} email,username,name,nomor`);

      let email = t[0];
      let username = t[1];
      let name = t[2];
      let u = m.quoted ? m.quoted.sender : t[3] ? t[3].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
      if (!u) return m.reply(`Contoh: ${p_c} email,username,name,nomor`);

      let d = (await sock.onWhatsApp(u.split`@` [0]))[0] || {};
      let password = username + "admin";

      let f = await fetch(domain + "api/application/users", {
        "method": "POST",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apikey
        },
        "body": JSON.stringify({
          "email": email,
          "username": username,
          "first_name": name,
          "last_name": "Admin",
          "root_admin": true,
          "language": "en",
          "password": password.toString()
        })
      });

      let data = await f.json();
      if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));

      let user = data.attributes;
      m.reply(`${monospace("BERHASIL CADMIN!")}
• ID: ${user.id}
• UUID: ${user.uuid}
• Email: ${user.email}

Data lainnya sudah terkirim ke
privat chat...`);

      let teksnyo = `*BERIKUT DATA ADMIN PANEL ANDA* 

• ID: ${user.id}
• UUID: ${user.uuid}
• Email: ${user.email}
• Username: ${user.username}
• Password: ${password.toString()}
• Domain: ${domain}

Simpan data admin panel baik-baik`;

      sock.sendMessage(u, {
        text: teksnyo
      }, {
        quoted: ftext
      })
    }
    break

    case 'deladmin': {
      if (!isOwner) return onlyOwn()
      let adminId = args[0];

      if (!adminId) return m.reply(`Format: ${p_c} [admin-id]\nUntuk melihat ID admin ketik ${_p}listadmin`);

      let cek = await fetch(domain + "api/application/users?page=1", {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apikey
        }
      })

      let res2 = await cek.json();
      let users = res2.data;
      let getid = null
      let idadmin = null

      for (let e of users) {
        if (e.attributes.id == adminId && e.attributes.root_admin == true) {
          getid = e.attributes.username
          idadmin = e.attributes.id
          let delusr = await fetch(domain + `api/application/users/${idadmin}`, {
            "method": "DELETE",
            "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + apikey
            }
          })
          let res = delusr.ok ? {
            errors: null
          } : await delusr.json()
        }
      }

      if (idadmin == null) return m.reply(`ID admin tidak ditemukan!`)
      m.reply(`Berhasil hapus admin panel *${getid}*`)
    }
    break

    case 'listadmin': {
      if (!isOwner) return onlyOwn()
      let page = args[0] ? args[0] : '1';

      let f = await fetch(domain + "api/application/users?page=" + page, {
        "method": "GET",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apikey
        }
      });

      let res = await f.json();
      let users = res.data;
      let messageText = `Berikut List Admin:\n\n`;

      for (let user of users) {
        let u = user.attributes;
        if (u.root_admin) {
          messageText += `ID: ${u.id} - Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
          messageText += `${u.username}\n`;
          messageText += `${u.first_name} ${u.last_name}\n\n`;
        }
      }

      messageText += `Halaman: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
      messageText += `Total: ${res.meta.pagination.count}`;

      await sock.sendMessage(m.chat, {
        text: messageText
      }, {
        quoted: m
      });

      if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
        m.reply(`Contoh: ${p_c} ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya`);
      }
    }
    break

    // Owner

    case 'addsc':
    case 'addscript': {
      if (!isOwner) return onlyOwn()

      const quoted = m.quoted
      if (!quoted || quoted.mtype !== 'documentMessage') {
        return m.reply('❗Reply dokumen script yang ingin ditambahkan!\n\nContoh: *.addsc namascript.zip*')
      }

      const filename = text?.trim() || quoted.fileName || `script-${Date.now()}.zip`

      const folder = './database/script'
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, {
        recursive: true
      })

      const media = await downloadContentFromMessage(quoted, 'document')
      let buffer = Buffer.from([])
      for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk])
      }

      const filePath = require('path').join(folder, filename)
      require('fs').writeFileSync(filePath, buffer)

      m.reply(`✅ Script berhasil ditambahkan sebagai:\n📁 ${filePath}`)
    }
    break

    case 'listsc':
    case 'listscript': {
      if (!isOwner) return onlyOwn()
      const folder = './database/script'
      if (!fs.existsSync(folder)) return m.reply('❌ Folder script belum ada.')

      const files = fs.readdirSync(folder)
      if (files.length === 0) return m.reply('📁 Folder script kosong.')

      let teks = `📜 *DAFTAR SCRIPT (${files.length})*\n\n`
      files.forEach((file, i) => {
        teks += `${i + 1}. ${file}\n`
      })
      m.reply(teks)
    }
    break

    case 'getsc':
    case 'getscript': {
      if (!isOwner) return onlyOwn()

      const folder = './database/script'
      if (!fs.existsSync(folder)) return m.reply('❌ Folder script belum ada.')

      const files = fs.readdirSync(folder)
      if (files.length === 0) return m.reply('📁 Tidak ada script.')

      const no = parseInt(text.trim())
      if (isNaN(no) || no < 1 || no > files.length) return m.reply(`Masukkan nomor script yang valid!\n\nContoh: *.getsc 1*\nGunakan *.listsc* untuk melihat nomor script.`)

      const filepath = path.join(folder, files[no - 1])
      let buff = fs.readFileSync(filepath)

      await sock.sendMessage(m.chat, {
        document: buff,
        fileName: files[no - 1],
        mimetype: 'application/octet-stream',
      }, {
        quoted: m
      })
    }
    break

    case 'payment': {
      m.reply(`Melakukan Transaksi?
Payment Yang Tersedia 

 *E-Wallet  :*
    • Gopay
    • OVO
    • Dana
    • Qris

Gunakan dengan cara ${_p}dana`)
    }
    break

    case 'qris': {
      try {
        await sock.sendMessage(m.chat, {
          image: {
            url: `${payment.qris}`
          },
          caption: `*Qris all payment*\nSetelah Transfer Silahkan Kirim Bukti Pembayaran.`
        }, {
          quoted: m
        });
      } catch (error) {
        return m.reply('*Gagal Mengambil Qris*\nQris Tidak Tersedia/Tidak Valid..')
      }
    }
    break

    case 'dana': {
      let yow = `${monospace("PAYMENT")}

 DANA
- ${payment.dana}

© ${storename}`
      sock.sendMessage(m.chat, {
        text: yow
      }, {
        quoted: ftext
      })
    }
    break
    case 'gopay': {
      let yow = `${monospace("PAYMENT")}

 GOPAY
- ${payment.gopay}

© ${storename}`
      sock.sendMessage(m.chat, {
        text: yow
      }, {
        quoted: ftext
      })
    }
    break
    case 'ovo': {
      let yow = `${monospace("PAYMENT")}

 OVO
- ${payment.ovo}

© ${storename}`
      sock.sendMessage(m.chat, {
        text: yow
      }, {
        quoted: ftext
      })
    }
    break

    case 'done': {
      if (!isOwner) return onlyOwn();
      if (!m.quoted) return m.reply('Reply pesanan yang telah di proses')
      let tek = m.quoted ? quoted.text : quoted.text.split(args[0])[1]
      let sukses = `「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : @tanggal\n⌚ JAM : @jam\n✨ STATUS : Berhasil\`\`\`\n\nTerimakasih @user Next Order ya🙏`
      sock.sendTextWithMentions(m.chat, (sukses.replace('@pesanan', tek ? tek : '-').replace('@user', '@' + m.quoted.sender.split("@")[0]).replace('@jam', wibTime).replace('@tanggal', tanggal).replace('@user', '@' + m.quoted.sender.split("@")[0])), m)
    }
    break

    case 'addown':
    case 'addowner': {
      if (!isOwner) return onlyOwn();
      if (!args[0]) return m.reply(`Contoh: ${p_c} tag/kutip`);
      let users = m.mentionedJid[0] ?
        m.mentionedJid[0] :
        m.quoted ?
        m.quoted.sender :
        text.replace(/[^0-9]/g, '');
      let getusers = users.replace(/[^0-9]/g, '');
      if (own.includes(getusers)) return m.reply('User sudah ada di daftar owner!');
      own.push(getusers);
      fs.writeFileSync('./database/owner.json', JSON.stringify(own, null, 2));
      m.reply('Berhasil addowner');
    }
    break

    case 'delown':
    case 'delowner': {
      if (!isOwner) return onlyOwn();
      if (!args[0]) return m.reply(`Contoh: ${p_c} tag/kutip`);
      let users = m.mentionedJid[0] ?
        m.mentionedJid[0] :
        m.quoted ?
        m.quoted.sender :
        q.split('|')[0].replace(/[^0-9]/g, '');
      const index = own.indexOf(users);
      if (index === -1) return m.reply('User tidak ditemukan di daftar owner!');
      own.splice(index, 1);
      fs.writeFileSync('./database/owner.json', JSON.stringify(own, null, 2));
      m.reply('Berhasil delowner');
    }
    break

    case 'listown':
    case 'listowner': {
      if (!isOwner) return onlyOwn();
      let teks = `List owner\nTotal: ${own.length}\n\n`;
      for (let kon of own) {
        teks += `• ${kon}\n`;
      }
      m.reply(teks);
    }
    break

    case 'addreseller':
    case 'addres': {
      if (!isOwner) return onlyOwn()
      if (!args[0]) return m.reply(`Contoh: ${p_c} nomor`)
      bnnd = text.split("|")[0].replace(/[^0-9]/g, '')
      let cekseler = await sock.onWhatsApp(bnnd + `@s.whatsapp.net`)
      if (cekseler.length == 0) return m.reply(`Masukkan nomor yang aktif!`)
      res.push(bnnd)
      fs.writeFileSync('./data/default-db/reseller.json', JSON.stringify(res))
      m.reply(`Berhasil addreseller`)
    }
    break

    case 'delreseller':
    case 'delres': {
      if (!!isOwner) return onlyOwn()
      if (!args[0]) return m.reply(`Contoh: ${p_c} nomor`)
      yaki = text.split("|")[0].replace(/[^0-9]/g, '')
      unp = res.indexOf(yaki)
      res.splice(unp, 1)
      fs.writeFileSync('./data/default-db/reseller.json', JSON.stringify(res))
      m.reply(`Berhasil delreseller`)
    }
    break

    case 'listreseller':
    case 'listres': {
      if (!isOwner) return onlyOwn()
      tekso = `List reseller\nTotal: ${res.length}\n\n`
      for (let i of res) {
        tekso += `• ${i}\n`
      }
      m.reply(tekso.trim())
    }
    break

    case 'autoread': {
      if (!isOwner) return onlyOwn()
      if (args[0] === 'on') {
        if (setting.autoread) return m.reply('Sudah diaktifkan sebelumnya')
        setting.autoread = true
        fs.writeFileSync('./lib/settings.json', JSON.stringify(setting, null, 2))
        await m.reply('Sukses mengaktifkan autoread.')
      } else if (args[0] === 'off') {
        if (!setting.autoread) return m.reply('Sudah dinonaktifkan sebelumnya')
        setting.autoread = false
        fs.writeFileSync('./lib/settings.json', JSON.stringify(setting, null, 2))
        await m.reply('Sukses menonaktifkan autoread.')
      } else {
        m.reply('Perintah tidak dikenali. Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan.')
      }
    }
    break

    case 'autotyping': {
      if (!isOwner) return onlyOwn()
      if (args[0] === 'on') {
        if (setting.autotyping) return m.reply('Sudah diaktifkan sebelumnya')
        setting.autotyping = true
        fs.writeFileSync('./lib/settings.json', JSON.stringify(setting, null, 2))
        await m.reply('Sukses mengaktifkan autotyping.')
      } else if (args[0] === 'off') {
        if (!setting.autotyping) return m.reply('Sudah dinonaktifkan sebelumnya')
        setting.autotyping = false
        fs.writeFileSync('./lib/settings.json', JSON.stringify(setting, null, 2))
        await m.reply('Sukses menonaktifkan autotyping.')
      } else {
        m.reply('Perintah tidak dikenali. Gunakan "on" untuk mengaktifkan atau "off" untuk menonaktifkan.')
      }
    }
    break

    case 'backup': {
      if (!isOwner) return onlyOwn()
      try {
        const {
          execSync
        } = require("child_process");
        const ls = (await execSync("ls")).toString().split("\n").filter((pe) =>
          pe != "node_modules" &&
          pe != "session" &&
          pe != "package-lock.json" &&
          pe != "yarn.lock" &&
          pe != "");
        const exec = await execSync(`zip -r Backup.zip ${ls.join(" ")}`);
        await sock.sendMessage(m.isGroup ? owner + '@s.whatsapp.net' : from, {
          document: await fs.readFileSync('./Backup.zip'),
          mimetype: "application/zip",
          fileName: "Backup.zip",
        }, {
          quoted: m
        });
        await execSync("rm -rf Backup.zip");
      } catch (err) {
        m.reply('Terjadi kesalahan')
      }
    }
    break

    case 'setppbot': {
      if (!isOwner) return onlyOwn()
      if (!quoted) return m.reply(`Kirim/kutip gambar dengan caption ${p_c}`)
      if (!/image/.test(mime)) return m.reply(`Kirim/kutip gambar dengan caption ${p_c}`)
      if (/webp/.test(mime)) return m.reply(`Kirim/kutip gambar dengan caption ${p_c}`)
      let media = await sock.downloadAndSaveMediaMessage(quoted)
      await sock.updateProfilePicture(botNumber, {
        url: media
      }).then(() => fs.unlinkSync(media)).catch((err) => fs.unlinkSync(media))
      m.reply('Sukses mengganti pp bot!')
    }
    break

    case 'delppbot': {
      if (!isOwner) return onlyOwn()
      await sock.removeProfilePicture(botNumber)
      await m.reply(`Sukses menghapus pp bot!`)
    }
    break

    case 'sampah':
    case 'delsampah': {
      if (!isOwner) return onlyOwn()

      const getFiles = (dir) => {
        return fs.readdirSync(dir).filter(v =>
          v.endsWith("gif") || v.endsWith("png") || v.endsWith("mp3") ||
          v.endsWith("mp4") || v.endsWith("jpg") || v.endsWith("jpeg") ||
          v.endsWith("webp") || v.endsWith("webm") ||
          v.endsWith("wav") || v.endsWith("aac") || v.endsWith("flac") ||
          v.endsWith("ogg") || v.endsWith("opus") || v.endsWith("m4a") ||
          v.endsWith("amr") || v.endsWith("3gp")
        ).map(v => `${dir}/${v}`)
      }

      let libFiles = getFiles('./x-system')
      let cacheFiles = fs.existsSync('./.cache') ? getFiles('./.cache') : []
      let rootFiles = getFiles('.').filter(v => !v.startsWith('./x-system') && !v.startsWith('./.cache'))
      let all = [...libFiles, ...cacheFiles, ...rootFiles]

      let jumlahSampah = all.length
      var teks = `${monospace("Jumlah Sampah")}\n\n`
      teks += `Total: ${jumlahSampah} sampah\n\n`
      teks += all.map(o => `${o}\n`).join("")

      if (jumlahSampah > 0) {
        edit3(teks, `Menghapus ${jumlahSampah} file sampah.`, `Sukses menghapus semua sampah.`)
        all.forEach(file => {
          fs.unlinkSync(file)
        })
      } else {
        edit2(teks, `Tidak ada file sampah untuk dihapus.`)
      }
    }
    break

    case 'clearsesi':
    case 'clearallsesi': {
      if (!isOwner) return onlyOwn()
      let directoryPath = path.join(`./${sessionName}`) //&& './x-system') //path.join();
      fs.readdir(directoryPath, async function (err, files) {
        if (err) {
          return m.reply('Tidak dapat memindai direktori: ' + err);
        }
        let filteredArray = await files.filter(item => item.startsWith("session") || item.startsWith("pre-key") || item.startsWith("sender-key"))
        var teks = `Menghapus ${filteredArray.length} file sampah...`
        if (filteredArray.length == 0) return m.reply(teks)
        /*filteredArray.map(function(e, i){
        teks += (i+1)+`. ${e}\n`
        })*/
        edit2(teks, 'Berhasil menghapus semua sampah')
        await filteredArray.forEach(function (file) {
          fs.unlinkSync(`./${sessionName}/${file}`)
        });
      });
    }
    break

    case 'public': {
      if (!isOwner) return onlyOwn()
      setting.public = true
      fs.writeFileSync('./settingsjson', JSON.stringify(setting, null, 2))
      m.reply('Sukses mengubah ke mode public')
    }
    break

    case 'self': {
      if (!isOwner) return onlyOwn()
      setting.public = false
      fs.writeFileSync('./settingsjson', JSON.stringify(setting, null, 2))
      m.reply('Sukses mengubah ke mode self')
    }
    break

    // Channels

    case 'cekidch':
    case 'getidch': {
      if (!text) return m.reply(`Kirim perintah ${prefix + command} _linkchannel_`)
      if (!isUrl(args[0]) && !args[0].includes('whatsapp.com/channel')) return m.reply(`Harus Berupa Link Channel`)
      let result = args[0].split('https://whatsapp.com/channel/')[1]
      let data = await sock.newsletterMetadata("invite", result)
      let teks = `*乂 NEWSLETTER INFO*

*Name:* ${data.name}
*Status*: ${data.state}
*Subscribers*: ${data.subscribers}
*Meta Verify*: ${data.verification}
*React Emoji:* ${data.reaction_codes}
*Id Channel:* ${data.id}
*Description*:
${data.description}

`
      m.reply(teks)
    }
    break

    // Push

    case 'jpm': {
      if (!isOwner) return onlyOwn()
      if (!isPc) return onlyPrivat()
      react()
      if (!text) m.reply(`Contoh: ${p_c} teks`)
      let getGroups = await sock.groupFetchAllParticipating()
      let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
      let anu = groups.map(v => v.id)
      for (let i of anu) {
        await sleep(1500)
        let metadat72 = await sock.groupMetadata(i)
        let participanh = await metadat72.participants
        let msg = generateWAMessageFromContent(i, {
          viewOnceMessage: {
            message: {
              "messageContextInfo": {
                "deviceListMetadata": {},
                "deviceListMetadataVersion": 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                contextInfo: {
                  mentionedJid: null,
                  forwardingScore: 99999999999,
                  isForwarded: false,
                  forwardedNewsletterMessageInfo: {
                    newsletterJid: chjid + '@newsletter',
                    newsletterName: `${wm}`,
                    serverMessageId: 145
                  },
                  businessMessageForwardInfo: {
                    businessOwnerJid: sock.decodeJid(sock.user.id)
                  },
                },
                body: proto.Message.InteractiveMessage.Body.create({
                  text: text
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: ``
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  title: "",
                  subtitle: "",
                  hasMediaAttachment: false
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                  buttons: [{
                    text: '-'
                  }],
                })
              })
            }
          }
        }, {})
        await sock.relayMessage(i, msg.message, {
          messageId: msg.key.id
        })
      }
      m.reply(`Berhasil mengirim jpm hidetag ke ${anu.length} grup!`)
    }
    break

    case 'jpmhidetag': {
      if (!isOwner) return onlyOwn()
      if (!isPc) return onlyPrivat()
      react()
      if (!text) m.reply(`Contoh: ${p_c} teks`)
      let getGroups = await sock.groupFetchAllParticipating()
      let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
      let anu = groups.map(v => v.id)
      for (let i of anu) {
        await sleep(1500)
        let metadat72 = await sock.groupMetadata(i)
        let participanh = await metadat72.participants
        let msg = generateWAMessageFromContent(i, {
          viewOnceMessage: {
            message: {
              "messageContextInfo": {
                "deviceListMetadata": {},
                "deviceListMetadataVersion": 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                contextInfo: {
                  mentionedJid: participanh.map(a => a.id),
                  forwardingScore: 99999999999,
                  isForwarded: false,
                  forwardedNewsletterMessageInfo: {
                    newsletterJid: chjid + '@newsletter',
                    newsletterName: `${wm}`,
                    serverMessageId: 145
                  },
                  businessMessageForwardInfo: {
                    businessOwnerJid: sock.decodeJid(sock.user.id)
                  },
                },
                body: proto.Message.InteractiveMessage.Body.create({
                  text: text
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                  text: ``
                }),
                header: proto.Message.InteractiveMessage.Header.create({
                  title: "",
                  subtitle: "",
                  hasMediaAttachment: false
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                  buttons: [{
                    text: '-'
                  }],
                })
              })
            }
          }
        }, {})
        await sock.relayMessage(i, msg.message, {
          messageId: msg.key.id
        })
      }
      m.reply(`Berhasil mengirim jpm hidetag ke ${anu.length} grup!`)
    }
    break

    case 'jpmfoto': {
      if (!isOwner) return onlyOwn()
      if (!isPc) return onlyPrivat()
      if (!isMediaa) return m.reply('Harus berupa gambar/video!')
      if (!text) return m.reply(`Contoh: ${p_c} teks`)
      react()
      let getGroups = await sock.groupFetchAllParticipating()
      let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
      let anu = groups.map((v) => v.id)

      for (let xnxx of anu) {
        let metadat72 = await sock.groupMetadata(xnxx)
        let participanh = await metadat72.participants

        if (/image/.test(mime)) {
          let media = await sock.downloadAndSaveMediaMessage(quoted)
          let mem = await CatBox(media)
          await sock.sendMessage(xnxx, {
            image: {
              url: mem
            },
            caption: `${kapital(text)}`,
            contextInfo: {
              mentionedJid: participanh.map(a => a.id)
            }
          }, {
            quoted: m
          })
          await sleep(2000)
        } else if (/video/.test(mime)) {
          let media1 = await sock.downloadAndSaveMediaMessage(quoted)
          let mem1 = await CatBox(media1)
          await sock.sendMessage(xnxx, {
            video: {
              url: mem1
            },
            caption: `${kapital(text)}`,
            contextInfo: {
              mentionedJid: participanh.map(a => a.id)
            }
          }, {
            quoted: m
          })
          await sleep(2000)
        } else {
          await sock.sendMessage(xnxx, {
            text: `${kapital(text)}`,
            contextInfo: {
              mentionedJid: participanh.map(a => a.id)
            }
          }, {
            quoted: m
          })
          await sleep(2000)
        }
      }
      m.reply(`Berhasil mengirim broadcast ke ${anu.length} grup!`)
    }
    break

    case 'addch':
    case 'addchannel': {
      if (!isOwner) return onlyOwn();
      if (!args[0]) return m.reply(`Contoh: ${p_c} https://whatsapp.com/channel/123abc`);

      const filePath = './database/channelid.json';
      const ch = JSON.parse(fs.readFileSync(filePath).toString());

      if (!isUrl(args[0]) || !args[0].includes('whatsapp.com/channel/'))
        return m.reply(`Link tidak valid, harus berupa link channel WhatsApp`);

      let result = args[0].split('https://whatsapp.com/channel/')[1].replace('/', '').trim();
      let data = await sock.newsletterMetadata("invite", result);

      if (!data || !data.id) return m.reply('Gagal mengambil metadata channel.');
      if (ch.includes(data.id)) return m.reply('Channel sudah ada di daftar jpmch!');

      ch.push(data.id);
      fs.writeFileSync(filePath, JSON.stringify(ch, null, 2));
      m.reply(`Berhasil menambahkan channel:\n• ID: ${data.id}\n• Nama: ${data.name || 'Tanpa Nama'}`);
    }
    break

    case 'delch':
    case 'delchannel': {
      if (!isOwner) return onlyOwn();
      if (!args[0]) return m.reply(`Contoh: ${p_c} 1\nGunakan .listch untuk melihat nomor channel.`);

      const filePath = './database/channelid.json';
      let ch = JSON.parse(fs.readFileSync(filePath).toString());

      if (ch.length === 0) return m.reply('📂 Belum ada channel yang tersimpan.');

      let index = parseInt(args[0]) - 1;
      if (isNaN(index) || index < 0 || index >= ch.length)
        return m.reply(`❌ Nomor tidak valid. Gunakan antara 1 sampai ${ch.length}`);

      let removed = ch.splice(index, 1)[0];
      fs.writeFileSync(filePath, JSON.stringify(ch, null, 2));

      m.reply(`✅ Berhasil menghapus channel nomor ${args[0]}:\nID: ${removed}`);
    }
    break

    case 'listch':
    case 'listchannel': {
      if (!isOwner) return onlyOwn()

      const filePath = './database/channelid.json'
      const ch = JSON.parse(fs.readFileSync(filePath).toString())

      if (ch.length === 0) return m.reply('📂 Belum ada channel yang tersimpan.')

      let teks = `📋 *Daftar Channel yang Tersimpan:*\n\n`

      for (let i = 0; i < ch.length; i++) {
        try {
          let data = await sock.newsletterMetadata("jid", ch[i])
          teks += `${i + 1}. ${data.name || 'Tanpa Nama'}\n   ID: ${ch[i]}\n\n`
        } catch (err) {
          teks += `${i + 1}. [GAGAL AMBIL DATA]\n   ID: ${ch[i]}\n\n`
        }
      }

      teks += `Gunakan perintah *${p_c} [1]* untuk menghapus channel id 1.`

      m.reply(teks.trim())
    }
    break

    case 'jpmch':
    case 'jpmchannel': {
      if (!isOwner) return onlyOwn()
      if (!text) return m.reply(`Contoh: ${p_c} Halo ini pesan broadcast ke semua channel`)

      const filePath = './database/channelid.json'
      const ch = JSON.parse(fs.readFileSync(filePath).toString())

      if (ch.length == 0) return m.reply('Belum ada channel yang ditambahkan.')

      let sukses = 0,
        gagal = 0

      for (let id of ch) {
        try {
          await sock.sendTextWithMentions(id, text, null)
          sukses++
          await delay(2000)
        } catch (e) {
          gagal++
          console.log(`Gagal kirim ke ${id}: ${e.message}`)
        }
      }

      m.reply(`✅ Broadcast selesai.\n🟢 Berhasil: ${sukses}\n🔴 Gagal: ${gagal}`)
    }
    break

    default:


    }

  } catch (err) {
    console.log(err)
  }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(`Update ${__filename}`)
  delete require.cache[file]
  require(file)
})
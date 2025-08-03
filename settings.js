const fs = require('fs')
const pack = require('./package.json')
global.pairing = false // GA USAH HPS
global.PaiCode = "NOVIVITA" // GA USAH DI HPS NTAR ERROR LAGI
global.broswer = "Firefox" // G USH HPS 
global.sessionName = "session" // GA USAH DI HPS

global.botname = "ARCEL" //BOT NM LU
global.ownername = "Ardi irreng","celin imup" // OWNER NM LO
global.owner = "6285762427949","6283142478779" // OWNER NOMOR LU
global.botNumber = "62882007363554" //  BOT NOMOR LU
global.version = pack.version 

global.packname = "𝐕𝐈𝐓𝐀-𝐈𝐌𝐔𝐓" // GAUSAH DI HPS
global.author = "𝐕𝐈𝐓𝐀" // GA USAH DI HPS

global.wm = "𝐁𝐘 𝐕𝐈𝐓𝐀-𝐁𝐎𝐓" // GA USAH DI HAPUS!! 
global.chjid = "120363331185134483" // GA USAH HAPUS
global.gcjid = "120363331185134483" // GA USAH HPS
global.sch = "https://whatsapp.com/channel/0029VanHONk5q08mGke04j3q"
global.sgc = "https://whatsapp.com/channel/0029VanHONk5q08mGke04j3q"
global.thumb = "https://files.catbox.moe/1rpnf4.jpg" 
global.payment = {
  dana: "-", // Dana
  gopay: "-", // Gopay
  ovo: "-", // Ovo
  qris: "https://files.catbox.moe/t3ig7y.png"
}

global.domain = "" // Domain harus diakhiri tanda [ / ]
global.apikey = "" // Plta
global.capikey = "" // Pltc
global.eggs = "15"
global.locc = "1"

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(`Update ${__filename}`)
  delete require.cache[file]
  require(file)
})
let handler = async (m, { setReply, conn,command }) => {
 
  let data1 = global.db.data.others['runtime'];
  let time1 = (new Date - data1.runtime) || 'lamanya'; 
  let qrnya = ' _Nih kakak Tinggal Scan Aja QR ini Dan Masukan Nominal Nya_';
  
  
  let qrImageUrl = 'https://raw.githubusercontent.com/Renzofficial/Uploade/main/uploader/1737691195015.jpg';
  
  await conn.sendMessage(m.chat, {
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        title: `${global.botName}`,
        body: `Aktif selama ${clockString(time1)}`,
        previewType: "PHOTO",
        thumbnailUrl: `${getRandom(fotoRandom)}`, 
        sourceUrl: web 
      }
    },
    image: { url: qrImageUrl }, 
    caption: qrnya
  }, { quoted: m });

};


function clockString(ms) {
  let hours = Math.floor(ms / 3600000);
  let minutes = Math.floor((ms % 3600000) / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  return `${hours} jam, ${minutes} menit, ${seconds} detik`;
}

handler.help = ['qris', 'bayar', 'donasi']; 
handler.tags = ['info'];
handler.command = /^(qris|bayar|donasi)$/i; 

module.exports = handler;

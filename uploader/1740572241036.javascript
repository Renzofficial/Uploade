const fetch = require("node-fetch");
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`Gunakan format:\n${usedPrefix + command} <judul/lagu>`);
  }

  const query = args.join(' ');
  mess.wait()
  const apiUrl = `https://api.alvianuxio.my.id/api/play?query=${encodeURIComponent(query)}&format=mp3&apikey=aluxi`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();

    if (!result.data || !result.data.response) {
      return m.reply('Lagu tidak ditemukan. Coba cari dengan judul yang lebih spesifik.');
    }

    const song = result.data.response;
  let resultsnya = `${gris1}
*Judul:* ${song.title}
*Durasi:* ${song.duration}
*Upload:* ${song.uploadDate}
*Channel:* ${song.channel.name}
*Views:* ${song.views.toLocaleString()}
*Url:* ${song.videoUrl}
*Thumbnail:* ${song.image}
${gris1}`;

let contextInfo = {
  forwardingScore: 50,
  isForwarded: false,
  externalAdReply: {
    showAdAttribution: false,
    title: song.title,
    body: song.uploadDate,
    mediaType: 1,
    renderLargerThumbnail: true,
    sourceUrl: song.videoUrl,
    thumbnailUrl: song.image,
  },
};

conn.sendMessage(
  m.chat,
  { text: resultsnya, contextInfo },
  { quoted: m }
);
    await conn.sendMessage(
      m.chat,
      {
        audio: { url: song.downloadUrl },
        mimetype: 'audio/mpeg',
        fileName: `${song.title}.mp3`,
      },
      { quoted: m }
    );
  } catch (error) {
    console.error('Error:', error.message);
    m.reply('Terjadi kesalahan saat mengambil data lagu. Coba lagi nanti.');
  }
};

handler.help = ["play2"].map((v) => v + " <judul lagu>");
handler.tags = ["music"];
handler.noCmdPrivate = true
handler.command = ["play2"];
module.exports = handler;
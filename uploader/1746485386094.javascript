const fetch = require('node-fetch');
const uploadImage = require('../../lib/uploadImage');

let handler = m => m;

handler.before = async function(m, { conn }) {
    const isAntiPorn = m.isGroup ? db.data.chats[m.chat]?.antiPorn : false;
    const isSticker = m.type === "stickerMessage";
    const isImage = m.type === "imageMessage";

    if (!isAntiPorn || (!isImage && !isSticker)) return; 

    try {
        let media = await m.download();
        if (!media) throw new Error('Gagal mengunduh media.');

        let url = await uploadImage(media);
        console.log("URL Gambar:", url);
        if (!url) throw new Error('Gagal mengunggah gambar.');

        let response = await fetch(`https://api.neoxr.eu/api/nsfw-detector?image=${encodeURIComponent(url)}&apikey=${Neoxr}`);
        let text = await response.text();
        console.log("Respon API:", text);

        let json = JSON.parse(text);
        if (!json.status || !json.data) throw new Error('API tidak merespons dengan benar.');

        let labelName = json.data.labelName?.toLowerCase() || '';
        let confidence = json.data.confidence || 0;

        if (labelName === 'porn') {
            await conn.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            });
            conn.sendMessage(m.chat,{text:`⚠️ *Deteksi Konten NSFW*\n\nGambar yang dikirim terdeteksi sebagai *PORN*.\n🛑 Confidence Score: *${(confidence * 100).toFixed(2)}%*`},{quoted:m});
        }

    } catch (e) {
        console.error('Terjadi kesalahan:', e.message || e);
        // m.reply('⚠️ Terjadi kesalahan saat mendeteksi gambar.');
    }
};

module.exports = handler;
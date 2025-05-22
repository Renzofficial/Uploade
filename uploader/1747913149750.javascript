const fs = require('fs');
const axios = require('axios');
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

const handler = async (m, { conn, args, text, usedPrefix, command, prefix }) => {
    text = text || (m.quoted && (m.quoted.text || m.quoted.caption || m.quoted.description));
    if (!text) throw `*• Example:* ${usedPrefix + command} *[text]*`;    
    const rulz = `https://aqul-brat.hf.space/?text=${encodeURIComponent(text)}`

    try {
        const res = await axios.get(rulz, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(res.data, 'binary');
      conn.sendReact(m.chat,'⏳',m);  
        await conn.sendImageAsSticker(m.chat, buffer, m, { 
            packname: packName, 
            author: m.pushname 
        });
    } catch (e) {
        console.error('Error:', e.message);
        throw '*• unexpected to caracter *';
    }
};

handler.command = handler.help = ['brat'];
handler.tags = ['sticker'];
handler.noCmdStore = true;
handler.noCmdPrivate = true;
module.exports = handler;
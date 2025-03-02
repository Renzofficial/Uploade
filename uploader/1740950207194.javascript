const fetch = require('node-fetch');

let handler = async (m, { conn, command }) => {
    const groupLinkMessage = `Grub Elaina - Multidevice\n\n${global.sgc}`;
    const privateNotificationMessage = `Untuk Menghindari Admin Group Marah :'v\nSilahkan Cek Chat Private Bot Untuk Link Group Nya`;
    
    if (m.isGroup) {
        await conn.sendMessage(m.chat, {
            text: privateNotificationMessage,
            contextInfo: {
                externalAdReply: {
                    title: global.botName,
                    body: global.wm,
                    thumbnailUrl: 'https://raw.githubusercontent.com/Renzofficial/Uploade/main/uploader/1736593778057.jpg',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

        await conn.reply(m.sender, groupLinkMessage, m);
    } else {
        await conn.reply(m.chat, groupLinkMessage, m);
    }
};

handler.command = /^(gcbot|gcelaina)$/i;
handler.tags = ['main'];
handler.help = ['gcbot'];
handler.limit = false;

module.exports = handler;
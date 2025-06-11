let handler = async (m, { conn, q, setReply }) => {
    const quoted = m.quoted ? m.quoted : m.msg === undefined? m: m.msg
    const mime = (quoted.msg || quoted).mimetype || ''
    if (!quoted.msg.mimetype) throw ' [ ! ] Maaf Anda Perlu Kirim Media/Reply';
    try {
        if (quoted.msg.mimetype) {
            const {
                result: tourl
            } = await cloudku(await quoted.download())
            const result = `🔥 \`[ Uploader Cloudkuimage ]\` 💙
📙Filename: ${tourl.filename || ''}
🧩Type: ${tourl.type || ''}
🗃️Size: ${tourl.size || ''}
🔗Url: ${tourl.url || ''}`
            await setReply(m.chat, result, m)
        } else {
            await setReply(m.chat, ' [ ! ] Maaf Anda Perlu Kirim Media/Reply', m)
        }
    } catch (e) {
        await setReply(m.chat, ' [ ! ] Maaf Error Mungkin Kebanyakan Request', m)
        console.log('Error:', e)
    }
}

handler.command = /^cloudku$/i;
handler.help = ['cloudku *< reply/kirim media >*'];
handler.tags = ['Uploader'];

module.exports = handler;
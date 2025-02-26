let handler = async (m, {  conn, args }) => {
    let user = global.db.data.users[m.sender];
    let guildIndex = parseInt(args[0]) - 1; // Ambil nomor guild dari argumen

    if (!args[0] || isNaN(guildIndex)) return  conn.reply(m.chat, 'Masukkan nomor team yang valid.', m);
    if (user.guildevent) return  conn.reply(m.chat, 'Anda sudah bergabung dalam team.', m);

    let guildKeys = Object.keys(global.db.guildeventdt);
    if (guildIndex < 0 || guildIndex >= guildKeys.length) return  conn.reply(m.chat, 'team tidak ditemukan.', m);

    let guildName = guildKeys[guildIndex];
    let guild = global.db.data.guildeventdt[guildName];

    guild.members.push(m.sender);
    user.guildevent = guildName;

     conn.reply(m.chat, `Anda berhasil bergabung dengan team ${guild.name}.`, m);
};

handler.help = ['jointeam <nomor_team>'];
handler.tags = ['event'];
handler.command = /^(jointeam)$/i;
module.exports = handler;
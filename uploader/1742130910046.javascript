let handler = async (m, { q, isOwner, setReply, command,prefix }) => {
  if (!m.isOwner) return mess.only.owner()
  if (!q) return setReply(`Example:\n${prefix + command} Downloader/ehanz.js`);
  let path = q.endsWith(".js") ? q : q + ".js";
  await require("fs").unlinkSync("plugins/" + path);
  setReply(`Plugin ${path} telah di hapus!`);
};
handler.command = ["delplugin", "delplpugions", "dp"];
handler.owner = true;
module.exports = handler;
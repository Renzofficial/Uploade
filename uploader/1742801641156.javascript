const fs = require("fs");

const deleteCase = (caseName) => {
  try {
    const filePath = "./plugins/Case/case.js";
    let fileContent = fs.readFileSync(filePath, "utf8");

    const regex = new RegExp(`case\\s+['"]${caseName}['"]:\\s*{[^]*?break;\\s*}`, "g");
    if (!regex.test(fileContent)) {
      return `❌ Command "${caseName}" tidak ditemukan di file case.js.`;
    }

    fileContent = fileContent.replace(regex, "");

    fs.writeFileSync(filePath, fileContent, "utf8");
    return `✅ Command "${caseName}" berhasil dihapus.`;
  } catch (err) {
    console.error("Error:", err);
    return "❌ Terjadi kesalahan saat menghapus command.";
  }
};

let handler = async (m, { text, setReply }) => {
  if (!text) {
    return setReply(
      "❌ Harap masukkan nama command yang ingin dihapus.\n\nContoh:\n`.delcase tes`"
    );
  }

  const result = deleteCase(text.trim());
  setReply(result);
};

handler.help = ['delcase'];
handler.tags = ['owner'];
handler.command = /^(delcase)$/i;
handler.owner = true; 
module.exports = handler;
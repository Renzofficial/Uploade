const os = require('os');
const { performance } = require('perf_hooks');
const speed = require('performance-now');

let handler = async (m, {  conn, setReply }) => {
  try {
    const used = process.memoryUsage();
    let timestamp = speed();
    let latensi = speed() - timestamp;

    const cpus = os.cpus();
    let cpuUsage = cpus
      .map((cpu, i) => {
        let total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
        let percentage = Math.round((cpu.times.user / total) * 100);
        return `CPU ${i + 1}: ${percentage}% digunakan\n- Model: ${cpu.model}\n- Kecepatan: ${cpu.speed / 1000} GHz`;
      })
      .join('\n\n');

    let serverUptime = os.uptime();
    let formatUptime = (seconds) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      return `${h} Jam, ${m} Menit, ${s} Detik`;
    };

    let nodeVersion = process.version;
    let formatBytes = (bytes) => {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 Byte';
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
    };

    let totalNetworkInterfaces = os.networkInterfaces();
    let networkInfo = Object.keys(totalNetworkInterfaces)
      .map((interfaceName) => {
        let addresses = totalNetworkInterfaces[interfaceName]
          .map(
            (address) =>
              `  - IP: ${address.address}\n  - MAC: ${address.mac}\n  - Family: ${address.family}\n  - Internal: ${address.internal}`
          )
          .join('\n');
        return `Interface ${interfaceName}:\n${addresses}`;
      })
      .join('\n\n');

    let respon = `
*⚡ Kecepatan Respon*: ${latensi.toFixed(4)} Detik

*📡 Info Server*:
- 🛡️ RAM: ${formatBytes(os.totalmem() - os.freemem())} / ${formatBytes(os.totalmem())}
- 🖥️ Platform: ${os.platform()}
- 📐 Arsitektur: ${os.arch()}
- ⏳ Uptime Server: ${formatUptime(serverUptime)}
- 🧪 Node.js Version: ${nodeVersion}
- 🔢 Total CPU: ${cpus.length}
- 🔎 Informasi CPU:
${cpuUsage}

*📊 NodeJS Memory Usage*:
${Object.keys(used)
  .map((key) => `${key.toUpperCase()}: ${formatBytes(used[key])}`)
  .join('\n')}

*🌐 Informasi Jaringan*:
${networkInfo}
`.trim();

    setReply(respon);
  } catch (err) {
    console.error(err);
     conn.reply(m.chat, '❌ Terjadi kesalahan saat memproses informasi server.', m);
  }
};

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = /^(ping|info)$/i;

module.exports = handler;
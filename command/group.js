import config from "../config.js";

export async function run(sock, jid, msg, cmd, text, ctx) {
  // Simple check
  if (!ctx.isGroup) {
    await sock.sendMessage(jid, { text: "Fitur ini hanya untuk grup ya 🌷" });
    return;
  }

  switch (cmd) {
    case `${config.prefix}announce`:
      {
        const announcement = text.replace(`${config.prefix}announce`, "").trim() || "Halo semua 💗";
        await sock.sendMessage(jid, { text: `Pengumuman: ${announcement}` });
      }
      break;
    case `${config.prefix}mute`:
      await sock.sendMessage(jid, { text: "Mode sunyi (demo) diaktifkan 👀" });
      break;
    case `${config.prefix}welcome`:
      await sock.sendMessage(jid, { text: "Welcome message (demo) dinyalakan ✨" });
      break;
  }
}

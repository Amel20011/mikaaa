import config from "../config.js";
import * as owner from "../command/owner.js";
import * as user from "../command/user.js";
import * as group from "../command/group.js";
import * as download from "../command/download.js";

// Central command router (rowId or typed text)
export async function handleCommand(sock, jid, msg, text, ctx) {
  const prefix = config.prefix;
  const cmd = text.toLowerCase().split(" ")[0]; // command token

  // Examples of simple built-in commands
  if (cmd === `${prefix}ping`) {
    await sock.sendMessage(jid, { text: `Pong! ${config.emoji.sparkles}` });
    return true;
  }

  // Owner commands
  if (
    [`${prefix}setname`, `${prefix}setbio`, `${prefix}restart`].includes(cmd)
  ) {
    await owner.run(sock, jid, msg, cmd, text);
    return true;
  }

  // User commands
  if ([`${prefix}profile`, `${prefix}balance`, `${prefix}daily`].includes(cmd)) {
    await user.run(sock, jid, msg, cmd, text);
    return true;
  }

  // Group commands
  if ([`${prefix}announce`, `${prefix}mute`, `${prefix}welcome`].includes(cmd)) {
    await group.run(sock, jid, msg, cmd, text, ctx);
    return true;
  }

  // Download commands
  if ([`${prefix}ytmp4`, `${prefix}ytmp3`, `${prefix}imgdl`].includes(cmd)) {
    await download.run(sock, jid, msg, cmd, text);
    return true;
  }

  // Misc from menus
  if (
    [
      `${prefix}premium`,
      `${prefix}upgrade`,
      `${prefix}donasi_bank`,
      `${prefix}donasi_ewallet`,
      `${prefix}script_info`,
      `${prefix}script_structure`,
      `${prefix}dice`,
      `${prefix}reverse`,
      `${prefix}shortlink`,
      `${prefix}sticker`
    ].includes(cmd)
  ) {
    // Provide simple demo responses
    switch (cmd) {
      case `${prefix}premium`:
        await sock.sendMessage(jid, { text: "Status: Non-premium 💗" });
        break;
      case `${prefix}upgrade`:
        await sock.sendMessage(jid, { text: "Hubungi Owner untuk upgrade 💎" });
        break;
      case `${prefix}donasi_bank`:
        await sock.sendMessage(jid, { text: "Donasi via Bank BCA: 1234567890 a.n Owner" });
        break;
      case `${prefix}donasi_ewallet`:
        await sock.sendMessage(jid, { text: "Dana/OVO/Gopay: 081234567890" });
        break;
      case `${prefix}script_info`:
        await sock.sendMessage(jid, {
          text:
            "Script menggunakan baileys-pro, ESM, List Message kompatibel, login via QR, dan struktur modular 🌷"
        });
        break;
      case `${prefix}script_structure`:
        await sock.sendMessage(jid, {
          text:
            "Struktur: index.js, config.js, handler/menu.js, handler/command.js, command/*, session/ ✨"
        });
        break;
      case `${prefix}dice`:
        await sock.sendMessage(jid, {
          text: `🎲 Kamu dapat angka: ${Math.floor(Math.random() * 6) + 1}`
        });
        break;
      case `${prefix}reverse`:
        {
          const q = text.slice(cmd.length).trim() || "contoh";
          const rev = q.split("").reverse().join("");
          await sock.sendMessage(jid, { text: `🔤 ${rev}` });
        }
        break;
      case `${prefix}shortlink`:
        await sock.sendMessage(jid, { text: "Masukkan URL: .shortlink https://contoh.com" });
        break;
      case `${prefix}sticker`:
        await sock.sendMessage(jid, { text: "Kirim gambar dengan caption .sticker ya 🌷" });
        break;
    }
    return true;
  }

  return false;
}

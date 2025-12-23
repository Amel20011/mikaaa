import config from "../config.js";

export async function run(sock, jid, msg, cmd, text) {
  switch (cmd) {
    case `${config.prefix}profile`:
      await sock.sendMessage(jid, {
        text: `Profil kamu cantik banget ${config.emoji.hands} (demo) 💗`
      });
      break;
    case `${config.prefix}balance`:
      await sock.sendMessage(jid, { text: "Saldo kamu: 0 🪙 (demo)" });
      break;
    case `${config.prefix}daily`:
      await sock.sendMessage(jid, { text: "Klaim harian berhasil ✨ Kamu dapat 10 🪙 (demo)" });
      break;
  }
}

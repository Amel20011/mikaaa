import config from "../config.js";

// Demo owner commands — for real setname/setbio you'd need to update profile via WA APIs if available
export async function run(sock, jid, msg, cmd, text) {
  switch (cmd) {
    case `${config.prefix}setname`:
      {
        const name = text.replace(`${config.prefix}setname`, "").trim() || "Aesthetic Bot";
        await sock.sendMessage(jid, { text: `Nama bot di-set ke: ${name} ${config.emoji.sparkles}` });
      }
      break;
    case `${config.prefix}setbio`:
      {
        const bio = text.replace(`${config.prefix}setbio`, "").trim() || "Made with 💗";
        await sock.sendMessage(jid, { text: `Bio di-set ke: ${bio} ${config.emoji.flower}` });
      }
      break;
    case `${config.prefix}restart`:
      await sock.sendMessage(jid, { text: "Bot akan restart... 💗" });
      process.exit(0);
  }
}

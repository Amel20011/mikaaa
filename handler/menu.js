import config from "../config.js";

// Create the main List Message object in the format compatible with baileys-pro
export function createMainListMessage(title = "💗 WHATSAPP BOT 💗", footer = "made with 💗 by Owner") {
  return {
    text: `Haii Kak ${config.emoji.heart} Aku siap bantu kamu ${config.emoji.flower}`,
    footer,
    title,
    buttonText: "🌸 Open Menu 🌸",
    sections: [
      {
        title: "💐 MAIN MENU",
        rows: [
          { title: "👑 Owner Menu", rowId: `${config.prefix}ownermenu` },
          { title: "📥 Download Menu", rowId: `${config.prefix}downloadmenu` },
          { title: "👥 Group Menu", rowId: `${config.prefix}groupmenu` },
          { title: "🌸 User Menu", rowId: `${config.prefix}usermenu` },
          { title: "💎 Premium Menu", rowId: `${config.prefix}premiummenu` },
          { title: "🤝 Donasi Menu", rowId: `${config.prefix}donasimenu` },
          { title: "📜 Script Menu", rowId: `${config.prefix}scriptmenu` },
          { title: "🎲 Fun Menu", rowId: `${config.prefix}funmenu` },
          { title: "🛠️ Tools Menu", rowId: `${config.prefix}toolsmenu` }
        ]
      }
    ]
  };
}

// Send list message for a specific category
async function sendCategory(sock, jid, title, rows) {
  const listMessage = {
    text: `Pilih fitur di bawah ini ya ${config.emoji.sparkles}`,
    footer: config.footer,
    title,
    buttonText: "✨ Buka ✨",
    sections: [{ title: "🌷 Pilihan Fitur", rows }]
  };
  // IMPORTANT: send exactly the listMessage object
  await sock.sendMessage(jid, listMessage);
}

// Handle menu selection from list rows (by rowId)
export async function handleMenu(sock, jid, text) {
  switch (text) {
    case `${config.prefix}ownermenu`:
      await sendCategory(sock, jid, "👑 Owner Menu", [
        { title: "📛 Set Name", rowId: `${config.prefix}setname` },
        { title: "📸 Set Bio", rowId: `${config.prefix}setbio` },
        { title: "🗑️ Restart Bot", rowId: `${config.prefix}restart` }
      ]);
      return true;

    case `${config.prefix}downloadmenu`:
      await sendCategory(sock, jid, "📥 Download Menu", [
        { title: "🔗 Download Video (YT)", rowId: `${config.prefix}ytmp4` },
        { title: "🔗 Download Audio (YT)", rowId: `${config.prefix}ytmp3` },
        { title: "🖼️ Download Image", rowId: `${config.prefix}imgdl` }
      ]);
      return true;

    case `${config.prefix}groupmenu`:
      await sendCategory(sock, jid, "👥 Group Menu", [
        { title: "📣 Announce", rowId: `${config.prefix}announce` },
        { title: "🔇 Mute Group", rowId: `${config.prefix}mute` },
        { title: "👋 Welcome Toggle", rowId: `${config.prefix}welcome` }
      ]);
      return true;

    case `${config.prefix}usermenu`:
      await sendCategory(sock, jid, "🌸 User Menu", [
        { title: "📄 Profile", rowId: `${config.prefix}profile` },
        { title: "🪙 Check Balance", rowId: `${config.prefix}balance` },
        { title: "🎁 Daily", rowId: `${config.prefix}daily` }
      ]);
      return true;

    case `${config.prefix}premiummenu`:
      await sendCategory(sock, jid, "💎 Premium Menu", [
        { title: "💎 Status Premium", rowId: `${config.prefix}premium` },
        { title: "💳 Upgrade Premium", rowId: `${config.prefix}upgrade` }
      ]);
      return true;

    case `${config.prefix}donasimenu`:
      await sendCategory(sock, jid, "🤝 Donasi Menu", [
        { title: "🏧 Bank Transfer", rowId: `${config.prefix}donasi_bank` },
        { title: "📱 E-Wallet", rowId: `${config.prefix}donasi_ewallet` }
      ]);
      return true;

    case `${config.prefix}scriptmenu`:
      await sendCategory(sock, jid, "📜 Script Menu", [
        { title: "📂 Info Script", rowId: `${config.prefix}script_info` },
        { title: "🧩 Struktur File", rowId: `${config.prefix}script_structure` }
      ]);
      return true;

    case `${config.prefix}funmenu`:
      await sendCategory(sock, jid, "🎲 Fun Menu", [
        { title: "🎲 Dice", rowId: `${config.prefix}dice` },
        { title: "🔤 Reverse Text", rowId: `${config.prefix}reverse` }
      ]);
      return true;

    case `${config.prefix}toolsmenu`:
      await sendCategory(sock, jid, "🛠️ Tools Menu", [
        { title: "📦 Shortlink", rowId: `${config.prefix}shortlink` },
        { title: "🖼️ Sticker", rowId: `${config.prefix}sticker` }
      ]);
      return true;

    default:
      return false;
  }
}

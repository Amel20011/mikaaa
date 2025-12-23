import { config } from '../config.js';

// Fungsi untuk mengirim List Message
export async function sendListMessage(sock, jid, title, text, buttonText, sections) {
  try {
    const listMessage = {
      text: text,
      footer: config.footer,
      title: title,
      buttonText: buttonText,
      sections: sections
    };
    
    await sock.sendMessage(jid, listMessage);
  } catch (error) {
    console.error('Error sending list message:', error);
    // Fallback ke text biasa jika list message gagal
    await sock.sendMessage(jid, { 
      text: `${text}\n\n${config.footer}` 
    });
  }
}

// Menu utama
export async function mainMenu(sock, jid) {
  const listMessage = {
    text: "Haii Kak 💗 Aku siap bantu kamu 🌷",
    footer: config.footer,
    title: "💗 WHATSAPP BOT 💗",
    buttonText: "🌸 Open Menu 🌸",
    sections: [
      {
        title: "💐 MAIN MENU",
        rows: [
          { title: "👑 Owner Menu", rowId: `${config.prefix}ownermenu` },
          { title: "📥 Download Menu", rowId: `${config.prefix}downloadmenu` },
          { title: "👥 Group Menu", rowId: `${config.prefix}groupmenu` },
          { title: "👤 User Menu", rowId: `${config.prefix}usermenu` },
          { title: "⭐ Premium Menu", rowId: `${config.prefix}premiummenu` },
          { title: "💝 Donasi Menu", rowId: `${config.prefix}donasemenu` },
          { title: "📜 Script Menu", rowId: `${config.prefix}scriptmenu` },
          { title: "🎮 Fun Menu", rowId: `${config.prefix}funmenu` },
          { title: "🛠️ Tools Menu", rowId: `${config.prefix}toolsmenu` }
        ]
      }
    ]
  };
  
  await sock.sendMessage(jid, listMessage);
}

// Owner Menu
export async function ownerMenu(sock, jid) {
  await sendListMessage(
    sock,
    jid,
    "👑 OWNER MENU",
    "Menu khusus untuk owner bot ✨",
    "📋 Pilih Menu",
    [
      {
        title: "🔐 OWNER COMMANDS",
        rows: [
          { title: "📊 Bot Status", rowId: `${config.prefix}stats` },
          { title: "🚀 Broadcast", rowId: `${config.prefix}bc` },
          { title: "🔁 Restart Bot", rowId: `${config.prefix}restart` },
          { title: "📤 Backup Session", rowId: `${config.prefix}backup` },
          { title: "👥 Add Premium", rowId: `${config.prefix}addprem` },
          { title: "❌ Remove Premium", rowId: `${config.prefix}removeprem` },
          { title: "📝 Set Response", rowId: `${config.prefix}setresponse` }
        ]
      },
      {
        title: "⚙️ SETTINGS",
        rows: [
          { title: "🔄 Kembali ke Main Menu", rowId: `${config.prefix}menu` },
          { title: "🏠 Home", rowId: `${config.prefix}home` }
        ]
      }
    ]
  );
}

// Download Menu
export async function downloadMenu(sock, jid) {
  await sendListMessage(
    sock,
    jid,
    "📥 DOWNLOAD MENU",
    "Download konten dari berbagai platform 🌸",
    "📥 Pilih Download",
    [
      {
        title: "🎵 MUSIC DOWNLOAD",
        rows: [
          { title: "🎵 YouTube Music", rowId: `${config.prefix}ytmp3` },
          { title: "📹 YouTube Video", rowId: `${config.prefix}ytmp4` },
          { title: "🎶 Spotify Download", rowId: `${config.prefix}spotify` }
        ]
      },
      {
        title: "📱 SOCIAL MEDIA",
        rows: [
          { title: "📸 Instagram Download", rowId: `${config.prefix}ig` },
          { title: "🎵 TikTok Download", rowId: `${config.prefix}tiktok` },
          { title: "🐦 Twitter Download", rowId: `${config.prefix}twitter` }
        ]
      },
      {
        title: "🔙 NAVIGATION",
        rows: [
          { title: "🔄 Kembali ke Main Menu", rowId: `${config.prefix}menu` },
          { title: "🏠 Home", rowId: `${config.prefix}home` }
        ]
      }
    ]
  );
}

// Group Menu
export async function groupMenu(sock, jid) {
  await sendListMessage(
    sock,
    jid,
    "👥 GROUP MENU",
    "Fitur untuk mengelola grup ✨",
    "👥 Pilih Fitur Grup",
    [
      {
        title: "🛠️ GROUP TOOLS",
        rows: [
          { title: "🏷️ Tag All Members", rowId: `${config.prefix}tagall` },
          { title: "🔒 Group Settings", rowId: `${config.prefix}groupset` },
          { title: "👑 Promote Member", rowId: `${config.prefix}promote` },
          { title: "👤 Demote Member", rowId: `${config.prefix}demote` },
          { title: "➕ Add Member", rowId: `${config.prefix}add` },
          { title: "➖ Kick Member", rowId: `${config.prefix}kick` }
        ]
      },
      {
        title: "🎭 GROUP FUN",
        rows: [
          { title: "🎲 Random Pick", rowId: `${config.prefix}random` },
          { title: "📊 Group Info", rowId: `${config.prefix}groupinfo` },
          { title: "👤 My Info", rowId: `${config.prefix}myinfo` }
        ]
      }
    ]
  );
}

// User Menu
export async function userMenu(sock, jid) {
  await sendListMessage(
    sock,
    jid,
    "👤 USER MENU",
    "Fitur untuk pengguna bot 💗",
    "👤 Pilih Fitur",
    [
      {
        title: "📱 USER TOOLS",
        rows: [
          { title: "🆔 Get ID", rowId: `${config.prefix}id` },
          { title: "📞 Get Number", rowId: `${config.prefix}number` },
          { title: "👤 Profile Info", rowId: `${config.prefix}profile` },
          { title: "⏰ Server Time", rowId: `${config.prefix}time` },
          { title: "📅 Date Info", rowId: `${config.prefix}date` },
          { title: "🌐 Ping Bot", rowId: `${config.prefix}ping` }
        ]
      },
      {
        title: "🔧 UTILITIES",
        rows: [
          { title: "🔍 Sticker Search", rowId: `${config.prefix}sticker` },
          { title: "📝 Text to Image", rowId: `${config.prefix}text2img` },
          { title: "🔤 Font Styles", rowId: `${config.prefix}font` }
        ]
      }
    ]
  );
}

// Handler untuk semua menu
export const menuHandler = {
  mainMenu,
  ownerMenu,
  downloadMenu,
  groupMenu,
  userMenu
};

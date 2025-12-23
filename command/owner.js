import { config } from '../config.js';

// Command khusus owner
export async function handleOwnerCommand(sock, msg, command, args) {
  const from = msg.key.remoteJid;
  const sender = msg.key.participant || from;
  
  // Cek apakah pengirim adalah owner
  const isOwner = sender.includes(config.owner.replace('+', ''));
  
  if (!isOwner) {
    await sock.sendMessage(from, { 
      text: '⛔ Maaf, command ini hanya untuk owner bot!' 
    });
    return;
  }
  
  switch (command) {
    case 'stats':
      const chats = sock.chats.all();
      const contacts = sock.contacts.all();
      
      await sock.sendMessage(from, {
        text: `📊 *BOT STATISTICS*\n\n` +
              `💬 Total Chats: ${chats.length}\n` +
              `👥 Total Contacts: ${contacts.length}\n` +
              `🕒 Uptime: ${process.uptime().toFixed(2)} detik\n` +
              `📈 Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
      });
      break;
      
    case 'bc':
      if (args.length < 1) {
        await sock.sendMessage(from, { 
          text: `❌ Penggunaan: ${config.prefix}bc <pesan>` 
        });
        return;
      }
      
      await sock.sendMessage(from, { 
        text: '🚀 Memulai broadcast...' 
      });
      
      // Broadcast ke semua chat
      const chats = sock.chats.all();
      let success = 0;
      let failed = 0;
      
      for (const chat of chats) {
        try {
          await sock.sendMessage(chat.id, { 
            text: `📢 *BROADCAST*\n\n${args.join(' ')}\n\n${config.footer}` 
          });
          success++;
        } catch (error) {
          failed++;
        }
      }
      
      await sock.sendMessage(from, {
        text: `✅ Broadcast selesai!\n\n` +
              `✅ Berhasil: ${success}\n` +
              `❌ Gagal: ${failed}`
      });
      break;
      
    case 'restart':
      await sock.sendMessage(from, { 
        text: '🔄 Restarting bot...' 
      });
      process.exit(0);
      break;
      
    default:
      await sock.sendMessage(from, { 
        text: `❌ Command owner "${command}" tidak dikenali.` 
      });
  }
}

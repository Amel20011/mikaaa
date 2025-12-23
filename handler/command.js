import { config } from '../config.js';
import { menuHandler } from './menu.js';

// Fungsi utama untuk handle command
export async function commandHandler(sock, msg) {
  try {
    const from = msg.key.remoteJid;
    const message = msg.message;
    const msgType = Object.keys(message)[0];
    let body = '';
    
    // Extract text dari pesan
    if (msgType === 'conversation') {
      body = message.conversation;
    } else if (msgType === 'extendedTextMessage') {
      body = message.extendedTextMessage.text;
    } else if (msgType === 'imageMessage') {
      body = message.imageMessage.caption || '';
    }
    
    // Cek apakah pesan mengandung command
    if (!body.startsWith(config.prefix)) return;
    
    // Parse command
    const args = body.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const text = args.join(' ');
    
    // Log command
    const sender = msg.key.participant || from;
    console.log(`📩 Command dari ${sender}: ${command}`);
    
    // Handle command berdasarkan kategori
    switch (command) {
      // Menu commands
      case 'menu':
      case 'help':
        await menuHandler.mainMenu(sock, from);
        break;
        
      case 'ownermenu':
        await menuHandler.ownerMenu(sock, from);
        break;
        
      case 'downloadmenu':
        await menuHandler.downloadMenu(sock, from);
        break;
        
      case 'groupmenu':
        await menuHandler.groupMenu(sock, from);
        break;
        
      case 'usermenu':
        await menuHandler.userMenu(sock, from);
        break;
        
      // Simple response commands
      case 'ping':
        const start = Date.now();
        await sock.sendMessage(from, { text: '🏓 Pong!' });
        const latency = Date.now() - start;
        await sock.sendMessage(from, { 
          text: `⚡ Latency: ${latency}ms\n📡 Response Time: ${latency}ms` 
        });
        break;
        
      case 'id':
        await sock.sendMessage(from, { 
          text: `📱 Your ID: ${from}\n👤 Sender: ${sender}` 
        });
        break;
        
      case 'owner':
        await sock.sendMessage(from, { 
          text: `👑 Owner: ${config.owner}\n💬 Contact owner untuk bantuan lebih lanjut!` 
        });
        break;
        
      case 'info':
        await sock.sendMessage(from, { 
          text: `🤖 *${config.botName}*\n\n` +
                `📅 Dibuat dengan baileys-pro\n` +
                `⚙️ Prefix: ${config.prefix}\n` +
                `👑 Owner: ${config.owner}\n` +
                `💕 ${config.footer}` 
        });
        break;
        
      // Group commands
      case 'tagall':
        if (!msg.key.remoteJid.endsWith('@g.us')) {
          await sock.sendMessage(from, { 
            text: '❌ Command ini hanya bisa digunakan di grup!' 
          });
          return;
        }
        
        const groupMetadata = await sock.groupMetadata(from);
        const participants = groupMetadata.participants;
        let tagText = '🏷️ *Tag All Members* 🏷️\n\n';
        
        participants.forEach((participant, i) => {
          tagText += `@${participant.id.split('@')[0]}\n`;
        });
        
        await sock.sendMessage(from, { 
          text: tagText,
          mentions: participants.map(p => p.id)
        });
        break;
        
      // Download commands (placeholder)
      case 'ytmp3':
        await sock.sendMessage(from, { 
          text: '🎵 *YouTube MP3 Download*\n\nSilahkan kirim link YouTube yang ingin didownload!' 
        });
        break;
        
      case 'ytmp4':
        await sock.sendMessage(from, { 
          text: '🎬 *YouTube MP4 Download*\n\nSilahkan kirim link YouTube yang ingin didownload!' 
        });
        break;
        
      // Sticker command
      case 'sticker':
      case 's':
        if (msg.message.imageMessage) {
          await sock.sendMessage(from, { 
            text: '🔄 Mengconvert gambar ke sticker...' 
          });
          
          // Download gambar
          const buffer = await sock.downloadMediaMessage(msg);
          
          // Kirim sebagai sticker
          await sock.sendMessage(from, {
            sticker: buffer,
            mimetype: 'image/webp'
          });
        } else {
          await sock.sendMessage(from, { 
            text: '❌ Silahkan kirim gambar dengan caption .sticker' 
          });
        }
        break;
        
      // Default response
      default:
        await sock.sendMessage(from, { 
          text: `❓ Command "${command}" tidak dikenali.\n\nKetik ${config.prefix}menu untuk melihat daftar command.` 
        });
    }
    
  } catch (error) {
    console.error('Error handling command:', error);
    
    // Kirim error message ke pengguna
    const from = msg.key.remoteJid;
    await sock.sendMessage(from, { 
      text: '❌ Terjadi error saat memproses command.\n\nSilahkan coba lagi nanti.' 
    });
  }
}

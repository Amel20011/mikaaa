// Command untuk download
export async function handleDownloadCommand(sock, msg, command, args) {
  const from = msg.key.remoteJid;
  
  switch (command) {
    case 'ig':
      await sock.sendMessage(from, { 
        text: '📸 *Instagram Download*\n\nSilahkan kirim link Instagram:\n• Post\n• Reels\n• Story\n• IGTV' 
      });
      break;
      
    case 'tiktok':
      await sock.sendMessage(from, { 
        text: '🎵 *TikTok Download*\n\nSilahkan kirim link TikTok:\n• Video\n• Musik\n• Tanpa watermark' 
      });
      break;
      
    case 'twitter':
      await sock.sendMessage(from, { 
        text: '🐦 *Twitter Download*\n\nSilahkan kirim link Twitter:\n• Tweet dengan video\n• Tweet dengan gambar' 
      });
      break;
      
    case 'spotify':
      await sock.sendMessage(from, { 
        text: '🎶 *Spotify Download*\n\nSilahkan kirim link Spotify:\n• Track\n• Playlist\n• Album' 
      });
      break;
  }
}

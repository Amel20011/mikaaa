// Command untuk user umum
export async function handleUserCommand(sock, msg, command, args) {
  const from = msg.key.remoteJid;
  
  switch (command) {
    case 'time':
      const now = new Date();
      const timeString = now.toLocaleTimeString('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour12: false
      });
      
      await sock.sendMessage(from, {
        text: `🕒 Waktu Server: ${timeString}\n📅 Tanggal: ${now.toLocaleDateString('id-ID')}`
      });
      break;
      
    case 'date':
      const date = new Date();
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      
      await sock.sendMessage(from, {
        text: `📅 *Date Information*\n\n` +
              `Hari: ${date.toLocaleDateString('id-ID', { weekday: 'long' })}\n` +
              `Tanggal: ${date.toLocaleDateString('id-ID')}\n` +
              `Bulan: ${date.toLocaleDateString('id-ID', { month: 'long' })}\n` +
              `Tahun: ${date.getFullYear()}`
      });
      break;
      
    case 'profile':
      try {
        const profile = await sock.profilePictureUrl(from, 'image');
        await sock.sendMessage(from, {
          image: { url: profile },
          caption: '👤 Profile Picture'
        });
      } catch (error) {
        await sock.sendMessage(from, {
          text: '📷 Tidak bisa mendapatkan profile picture\nMungkin profil tidak memiliki foto.'
        });
      }
      break;
  }
}

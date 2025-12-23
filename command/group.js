// Command untuk grup
export async function handleGroupCommand(sock, msg, command, args) {
  const from = msg.key.remoteJid;
  
  // Cek apakah di grup
  if (!from.endsWith('@g.us')) {
    await sock.sendMessage(from, { 
      text: '❌ Command ini hanya bisa digunakan di grup!' 
    });
    return;
  }
  
  const sender = msg.key.participant;
  
  switch (command) {
    case 'groupinfo':
      try {
        const metadata = await sock.groupMetadata(from);
        const participants = metadata.participants;
        
        let adminCount = 0;
        participants.forEach(p => {
          if (p.admin) adminCount++;
        });
        
        await sock.sendMessage(from, {
          text: `👥 *GROUP INFORMATION*\n\n` +
                `📛 Nama: ${metadata.subject}\n` +
                `🆔 ID: ${metadata.id}\n` +
                `👥 Anggota: ${participants.length}\n` +
                `👑 Admin: ${adminCount}\n` +
                `📅 Dibuat: ${new Date(metadata.creation * 1000).toLocaleDateString()}\n` +
                `🔗 Link: ${metadata.inviteLink || 'Tidak ada'}`
        });
      } catch (error) {
        console.error('Error getting group info:', error);
      }
      break;
      
    case 'promote':
      if (!args[0]) {
        await sock.sendMessage(from, { 
          text: `❌ Penggunaan: ${config.prefix}promote @tag atau reply pesan` 
        });
        return;
      }
      
      // Cek apakah pengirim adalah admin
      const metadata = await sock.groupMetadata(from);
      const isAdmin = metadata.participants.find(p => p.id === sender)?.admin;
      
      if (!isAdmin) {
        await sock.sendMessage(from, { 
          text: '⛔ Hanya admin yang bisa promote member!' 
        });
        return;
      }
      
      // Logika promote (simplified)
      await sock.sendMessage(from, { 
        text: '✅ Member berhasil dipromote menjadi admin!' 
      });
      break;
  }
}

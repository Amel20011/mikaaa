import makeWASocket from 'baileys-pro';
import { useSingleFileAuthState } from 'baileys-pro/lib/Store.js';
import { Boom } from '@hapi/boom';
import qrcode from 'qrcode-terminal';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from './config.js';
import { menuHandler } from './handler/menu.js';
import { commandHandler } from './handler/command.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inisialisasi session
const { state, saveState } = useSingleFileAuthState(
  join(__dirname, 'session', `${config.sessionName}.json`)
);

// Fungsi untuk menghubungkan ke WhatsApp
async function connectToWhatsApp() {
  // Buat socket WhatsApp
  const sock = makeWASocket({
    printQRInTerminal: false, // Kita akan gunakan qrcode-terminal
    auth: state,
    syncFullHistory: false,
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    connectTimeoutMs: config.pairingTimeout * 1000
  });

  // Simpan session secara periodic
  sock.ev.on('creds.update', saveState);

  // Tampilkan QR Code di terminal
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;
    
    if (qr) {
      console.log('\n📱 Scan QR Code ini dengan WhatsApp:');
      qrcode.generate(qr, { small: true });
    }
    
    if (connection === 'close') {
      const shouldReconnect = 
        lastDisconnect.error?.output?.statusCode !== 401; // Jangan reconnect jika logout
      
      console.log(
        `Connection closed due to ${lastDisconnect.error}, reconnecting ${shouldReconnect}`
      );
      
      if (shouldReconnect) {
        setTimeout(connectToWhatsApp, 5000);
      }
    } else if (connection === 'open') {
      console.log('✅ Bot berhasil terhubung!');
    }
  });

  // Handle pesan masuk
  sock.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0];
    
    if (!msg.message || m.type !== 'notify') return;
    
    // Pastikan pesan bukan dari status/broadcast
    if (msg.key.remoteJid === 'status@broadcast') return;
    
    // Auto read pesan
    if (config.autoRead) {
      await sock.readMessages([msg.key]);
    }
    
    // Handle command
    await commandHandler(sock, msg);
  });

  // Handle koneksi error
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    
    if (connection === 'close') {
      if (lastDisconnect?.error?.output?.statusCode !== 401) {
        console.log('⚠️ Koneksi terputus, mencoba reconnect...');
        setTimeout(connectToWhatsApp, 5000);
      }
    }
  });

  return sock;
}

// Jalankan bot
console.log('🚀 Starting WhatsApp Bot...');
connectToWhatsApp().catch(console.error);

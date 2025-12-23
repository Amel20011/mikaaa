import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from "baileys-pro";
import pino from "pino";
import qrcode from "qrcode-terminal";
import config from "./config.js";
import { handleMenu, createMainListMessage } from "./handler/menu.js";
import { handleCommand } from "./handler/command.js";

// Create and manage the socket connection
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true, // Will emit 'connection.update' with QR content
    logger: pino({ level: "fatal" }), // Quiet logs for production
    browser: ["AestheticBot", "Chrome", "1.0"], // Works for WhatsApp & Business
    markOnlineOnConnect: true,
    syncFullHistory: false // faster startup
  });

  // Show QR in terminal
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) {
      console.clear();
      console.log("Scan QR to login:");
      qrcode.generate(qr, { small: true });
    }
    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log("Connection closed. Reconnecting:", shouldReconnect);
      if (shouldReconnect) startBot();
    }
    if (connection === "open") {
      console.log("Connected ✅");
    }
  });

  // Persist credentials
  sock.ev.on("creds.update", saveCreds);

  // Message handler (upsert)
  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;
    for (const msg of messages) {
      try {
        const jid = msg.key.remoteJid;
        const isGroup = jid.endsWith("@g.us");
        const messageContent =
          msg.message?.conversation ||
          msg.message?.extendedTextMessage?.text ||
          msg.message?.buttonsResponseMessage?.selectedButtonId ||
          msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId ||
          "";

        // Ignore status updates & self
        if (!jid || jid.includes("status@broadcast")) continue;

        // Normalize text
        const text = messageContent.trim();

        // If message is greetings or prefixless, show main list menu
        const needMenu =
          text === "" ||
          /^h(ai|alo|ello|ey|ola)|menu|help|start$/i.test(text);

        if (needMenu) {
          const listMessage = createMainListMessage(config.botName, config.footer);
          await sock.sendMessage(jid, listMessage);
          continue;
        }

        // Route to menu handler when list rows are tapped (e.g., .ownermenu)
        const handledMenu = await handleMenu(sock, jid, text);
        if (handledMenu) continue;

        // Route to command handler for actual features (e.g., .ping)
        const handledCmd = await handleCommand(sock, jid, msg, text, { isGroup });
        if (handledCmd) continue;

        // Fallback: gentle hint
        await sock.sendMessage(jid, {
          text:
            `Haii Kak ${config.emoji.heart} Aku siap bantu kamu ${config.emoji.flower}\n` +
            `Ketik "menu" atau pilih tombol untuk membuka menu ${config.emoji.sparkles}`
        });
      } catch (err) {
        console.error("Handler error:", err);
      }
    }
  });
}

startBot();

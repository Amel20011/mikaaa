import config from "../config.js";

export async function run(sock, jid, msg, cmd, text) {
  switch (cmd) {
    case `${config.prefix}ytmp4`:
      await sock.sendMessage(jid, {
        text:
          "Masukkan link YouTube: .ytmp4 https://youtu.be/xxxxx\n(Ini demo tanpa downloader agar simpel)"
      });
      break;
    case `${config.prefix}ytmp3`:
      await sock.sendMessage(jid, {
        text:
          "Masukkan link YouTube: .ytmp3 https://youtu.be/xxxxx\n(Ini demo tanpa downloader agar simpel)"
      });
      break;
    case `${config.prefix}imgdl`:
      await sock.sendMessage(jid, {
        text: "Masukkan URL gambar: .imgdl https://example.com/image.jpg (demo)"
      });
      break;
  }
}

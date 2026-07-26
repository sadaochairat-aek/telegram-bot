const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// 1. ดึง Token จาก Environment Variable ของ Render
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// 2. โค้ดสร้าง HTTP Server เล็กๆ ป้องกัน Render สลีป
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Telegram Bot is online and running!');
});

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

// 3. โค้ดการทำงานของ Telegram Bot
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'สวัสดีครับ! บอททำงานบน Render เรียบร้อยแล้ว 🚀');
});

bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    bot.sendMessage(msg.chat.id, `คุณพิมพ์ว่า: ${msg.text}`);
  }
});
      

const TelegramBot = require("node-telegram-bot-api");

require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('new_chat_members', (msg) => {
   bot.sendMessage(msg.chat.id, `Olá ${msg.from.first_name}, bem vindo ao Mastes of Node.js!`)
})

bot.on("message", msg => {
  const chatId = msg.chat.id;

  console.group("EVENT: MESSAGE");
  console.log(msg);
  console.groupEnd();
});

const TelegramBot = require("node-telegram-bot-api");

const token = "";

const bot = new TelegramBot(token, { polling: true });

bot.on("new_chat_members", msg => {
  bot.sendMessage(
    msg.chat.id,
    `Olá ${msg.from.first_name}, bem vindo ao Mastes of Node.js!`
  );
});

bot.on("message", msg => {
  const chatId = msg.chat.id;

  console.log("EVENT: MESSAGE");
  console.log(msg);
  console.log();
});

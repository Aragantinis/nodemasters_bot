const TelegramBot = require("node-telegram-bot-api");
const puppeteer = require("puppeteer");
const url = require("url");

require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.onText(/\/sc (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  var myUrl = url.parse(match[1]);

  if (!myUrl.hostname) {
    bot.sendMessage(chatId, "sua URL não é válida.");
    return;
  }

  let screenShotFileName = `images/${new Date().getTime()}.png`;


  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(match[1], { waitUntil: "networkidle2" });
  await page.setViewport({
    width: 1920,
    height: 1080
  });
  await page.screenshot({ path: screenShotFileName, fullPage: true });

  await browser.close();
  bot.sendPhoto(chatId, screenShotFileName);
});

bot.on('new_chat_members', (msg) => {
   bot.sendMessage(msg.chat.id, `Olá ${msg.from.first_name}, bem vindo ao Mastes of Node.js!`)
})

bot.on("message", msg => {
  const chatId = msg.chat.id;

  console.group("EVENT: MESSAGE");
  console.log(msg);
  console.groupEnd();
});

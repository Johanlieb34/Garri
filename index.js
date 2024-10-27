const TelegramBot = require('node-telegram-bot-api');

// Replace with your own token obtained from BotFather
const token = '7847521628:AAHn0CiVxcWZF2mG0leMLzRTsCS134xz0PE';

const bot = new TelegramBot(token, { polling: true });

// Import the group chat bot functionality
require('./groupChatBot')(bot);
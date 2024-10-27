const TelegramBot = require('node-telegram-bot-api');

class GroupChatBot {
    constructor(token) {
        this.bot = new TelegramBot(token, { polling: true });
        this.setupListeners();
    }

    setupListeners() {
        this.bot.on('message', (msg) => {
            const chatId = msg.chat.id;

            if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
                this.handleMessage(msg, chatId);
            }
        });
    }

    handleMessage(msg, chatId) {
        // Respond to the command '/start'
        if (msg.text.toString().toLowerCase() === '/start') {
            this.bot.sendMessage(chatId, 'Welcome to the group management bot! Use /help to see available commands.');
        }

        // Respond to the command '/help'
        else if (msg.text.toString().toLowerCase() === '/help') {
            this.bot.sendMessage(chatId, 'Available commands:\n- /mute @username: Mute a user.\n- /unmute @username: Unmute a user.');
        }

        // Mute a user
        else if (msg.text.toString().toLowerCase().startsWith('/mute')) {
            const username = msg.text.split(' ')[1];
            if (username) {
                this.muteUser(chatId, username);
            } else {
                this.bot.sendMessage(chatId, 'Please specify a user to mute.');
            }
        }

        // Unmute a user
        else if (msg.text.toString().toLowerCase().startsWith('/unmute')) {
            const username = msg.text.split(' ')[1];
            if (username) {
                this.unmuteUser(chatId, username);
            } else {
                this.bot.sendMessage(chatId, 'Please specify a user to unmute.');
            }
        }
    }

    muteUser(chatId, username) {
        this.bot.restrictChatMember(chatId, username, {
            can_send_messages: false
        }).then(() => {
            this.bot.sendMessage(chatId, ${username} has been muted.);
        }).catch((error) => {
            this.bot.sendMessage(chatId, 'Error muting user: ' + error.message);
        });
    }

    unmuteUser(chatId, username) {
        this.bot.restrictChatMember(chatId, username, {
            can_send_messages: true
        }).then(() => {
            this.bot.sendMessage(chatId, ${username} has been unmuted.);
        }).catch((error) => {
            this.bot.sendMessage(chatId, 'Error unmuting user: ' + error.message);
        });
    }
}

module.exports = GroupChatBot;
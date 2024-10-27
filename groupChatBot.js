const GroupChatBot = require('./botModule');

// Replace with your own token obtained from BotFather
const token = '7847521628:AAHn0CiVxcWZF2mG0leMLzRTsCS134xz0PE';

const bot = new GroupChatBot(token);

// Listen for any kind of message in a group chat
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // Check if the message is from a group chat
    if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
        // Respond to the command '/start'
        if (msg.text.toString().toLowerCase() === '/start') {
            bot.sendMessage(chatId, 'Welcome to the group management bot! Use /help to see available commands.');
        }

        // Respond to the command '/help'
        else if (msg.text.toString().toLowerCase() === '/help') {
            bot.sendMessage(chatId, 'Available commands:\n- /mute @username: Mute a user.\n- /unmute @username: Unmute a user.');
        }

        // Mute a user
        else if (msg.text.toString().toLowerCase().startsWith('/mute')) {
            const username = msg.text.split(' ')[1];
            if (username) {
                bot.restrictChatMember(chatId, username, {
                    can_send_messages: false
                }).then(() => {
                    bot.sendMessage(chatId, `${username} has been muted.`);
                }).catch((error) => {
                    bot.sendMessage(chatId, 'Error muting user: ' + error.message);
                });
            } else {
                bot.sendMessage(chatId, 'Please specify a user to mute.');
            }
        }

        // Unmute a user
        else if (msg.text.toString().toLowerCase().startsWith('/unmute')) {
            const username = msg.text.split(' ')[1];
            if (username) {
                bot.restrictChatMember(chatId, username, {
                    can_send_messages: true
                }).then(() => {
                    bot.sendMessage(chatId, `{username} has been unmuted.`);
                }).catch((error) => {
                    bot.sendMessage(chatId, 'Error unmuting user: ' + error.message);
                });
            } else {
                bot.sendMessage(chatId, 'Please specify a user to unmute.');
            }
        }
    }
});

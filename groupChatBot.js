module.exports = (bot) => {
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;

        if (msg.chat.type === 'group' || msg.chat.type === 'supergroup') {
            if (msg.text.toString().toLowerCase() === '/start') {
                bot.sendMessage(chatId, 'Welcome to the group management bot! Use /help to see available commands.');
            } else if (msg.text.toString().toLowerCase() === '/help') {
                bot.sendMessage(chatId, 'Available commands:\n- /mute @username: Mute a user.\n- /unmute @username: Unmute a user.');
            } else if (msg.text.toString().toLowerCase().startsWith('/mute')) {
                const username = msg.text.split(' ')[1];
                if (username) {
                    bot.restrictChatMember(chatId, username, {
                        can_send_messages: false,
                    })
                    .then(() => {
                        bot.sendMessage(chatId, ${username} has been muted.);
                    })
                    .catch((error) => {
                        bot.sendMessage(chatId, 'Error muting user: ' + error.message);
                    });
                } else {
                    bot.sendMessage(chatId, 'Please specify a user to mute.');
                }
            } else if (msg.text.toString().toLowerCase().startsWith('/unmute')) {
                const username = msg.text.split(' ')[1];
                if (username) {
                    bot.restrictChatMember(chatId, username, {
                        can_send_messages: true,
                    })
                    .then(() => {
                        bot.sendMessage(chatId, ${username} has been unmuted.);
                    })
                    .catch((error) => {
                        bot.sendMessage(chatId, 'Error unmuting user: ' + error.message);
                    });
                } else {
                    bot.sendMessage(chatId, 'Please specify a user to unmute.');
                }
            }
        }
    });
};
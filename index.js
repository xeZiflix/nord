const TelegramApi = require('node-telegram-bot-api')

const token = '5554742898:AAGJCJCftDavU3Z_OQWwRlLcqA0EU-dqk2I'

const bot = new TelegramApi(token, {polling: true})


var musicOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Танцевальные', callback_data: 'Танцевальные - /dance'},{text: 'В дорогу', callback_data: 'В дорогу - /road'}],
            [{text: 'Грустные', callback_data: 'Грустные - /sad'},{text: 'Кайфануть', callback_data: 'Грустные - /kaif'}],
        ]
    })
}


bot.onText(/\/start_test/, function (msg, match) {
    bot.sendMessage(msg.chat.id, 'Выберите любую кнопку:', musicOptions);
});

bot.on('text', function (msg) {
    console.log(`[text] ${ msg.chat.id } ${ msg.text }`);
});


const start = () =>{
    bot.setMyCommands([
        {command: '/start', description: 'Начальное привествие'},
        {command: '/info', description: 'Информация о боте'},
        {command: '/music', description: 'Подбор музыки'},
        {command: '/about', description: 'Другое...'},
        {command: '/dance', description: 'Танцевальные'},
        {command: '/road', description: 'В дорогу'},
        {command: '/sad', description: 'Грустные'},
        {command: '/kaif', description: 'Кайфануть'},
    ])


    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if(text ==='/start'){
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/7a7/58d/7a758d16-1a19-326c-9b83-394a774b5e78/29.webp')
            return bot.sendMessage(chatId, 'Добро пожаловать в MusicBot. Для навигации используйте меню.');
        }
        if(text ==='/info'){
            return bot.sendMessage(chatId, 'MusicBot - один из лучших музыкальных ботов по подбору музыки по настроению :) ');
        }
        if(text ==='/music'){
            await bot.sendMessage(chatId, 'Какую музыку ты предпочтешь на данный момент?');
            return bot.sendMessage(chatId, 'Выбери свое настроение:',musicOptions);
        }
        if(text ==='/about'){
            return bot.sendMessage(chatId, 'Данный бот создан исключительно для практического задания на предприятие "NordClan".  ' +
                ' Автор:  Камальдинов А.З. aka xeZiflix ');
        }
        if(text ==='/dance'){
            return bot.sendMessage(chatId, 'https://www.youtube.com/watch?v=rLi9RQhTduQ&ab_channel=%D0%A1%D0%B0%D0%BC%D0%B0%D1%8F%D0%9B%D1%83%D1%87%D1%88%D0%B0%D1%8F%D0%9C%D0%A3%D0%97%D0%AB%D0%9A%D0%90%21%E2%96%B6 ');
        }
        if(text ==='/road'){
            return bot.sendMessage(chatId, 'https://www.youtube.com/watch?v=WJB7SxCl_mQ&ab_channel=%D0%A2%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE%D0%9A%D0%9B%D0%90%D0%A1%D0%A1%D0%9D%D0%90%D0%AF%D0%9C%D0%A3%D0%97%D0%AB%D0%9A%D0%90 ');
        }
        if(text ==='/sad'){
            return bot.sendMessage(chatId, 'https://www.youtube.com/watch?v=DiYsIGHDoF8&ab_channel=WOWMUSIK ');
        }
        if(text ==='/kaif'){
            return bot.sendMessage(chatId, 'https://www.youtube.com/watch?v=w-UvQ8PO5nI&ab_channel=RapMafia ');
        }
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/7a7/58d/7a758d16-1a19-326c-9b83-394a774b5e78/7.webp')
        return bot.sendMessage(chatId, 'Я тебя не совсем понимаю. Попробуй ещё раз.');
    })
}

bot.on('callback_query', msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    bot.sendMessage(chatId, `Ты выбрал: ${data}. Нажмите на команду.`)
    console.log(msg)
})
start()
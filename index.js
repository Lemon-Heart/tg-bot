require('dotenv').config()
const sendPost = require('./services/sendPost')
const connectDB = require('./services/connectDB')
const { bot, session, Scenes } = require('./services/bot')

bot.use(session({ collectionName: 'sessions' }))
require('./services/scenes/createPost')
const { firstTask } = require('./services/scenes/listeners/firstTask')
const { secondTask } = require('./services/scenes/listeners/secondTask')
const { thirdTask } = require('./services/scenes/listeners/thirdTask')
const { fourthAndFifthTask } = require('./services/scenes/listeners/fourthAndFifthTask')
const { lastTask } = require('./services/scenes/listeners/lastTask')
const stage = new Scenes.Stage([firstTask, secondTask, thirdTask, fourthAndFifthTask, lastTask])
bot.use(stage.middleware())

// connectDB.remove()

bot.start(async (ctx) => {
    sendPost.sendTextWithButtonAfterPhoto(ctx, 'Но для начала я очень хочу с тобой познакомиться. Мне интересно узнать о твоих навыках в творчестве🎨, чтобы быть для тебя максимально полезной!\n\nВыбирай, к какой категории ты себя относишь?👇🏻', [['Никогда не рисовал, мечтаю научиться', 'btn_1'],['Рисовал когда-то давно', 'btn_2'],['Я начинающий художник', 'btn_3'],['Я художник в вечном поиске нового😄', 'btn_4']], 1000*10, './img/Я.JPG', `🙋🏻‍♀️Привет${ctx.message.from.first_name ? ', ' + ctx.message.from.first_name : ''}! Хочу тебя поздравить! Сегодня осуществится твоя мечта и ты сможешь рисовать портреты.\n\nДада, совсем не обязательно тратить 5 лет, чтобы получить художественное образование, прикинь😳\n\nУже совсем скоро ты узнаешь, как всего за 50 простых шагов можно научиться рисовать крутой портрет!\n🎁А также подарю тебе:\n\n- методичку с пошаговым рисованием портрета;\n- урок по наложению штриховки и передаче объёма в портрете.`)
    connectDB.start(ctx)
})
bot.action('btn_0', (ctx) => {
    sendPost.sendTextWithButtonAfterPhoto(ctx, 'Но для начала я очень хочу с тобой познакомиться. Мне интересно узнать о твоих навыках в творчестве🎨, чтобы быть для тебя максимально полезной!\n\nВыбирай, к какой категории ты себя относишь?👇🏻', [['Никогда не рисовал, мечтаю научиться', 'btn_1'],['Рисовал когда-то давно', 'btn_2'],['Я начинающий художник', 'btn_3'],['Я художник в вечном поиске нового😄', 'btn_4']], 1000*10, './img/Я.JPG', `🙋🏻‍♀️Привет! Хочу тебя поздравить! Сегодня осуществится твоя мечта и ты сможешь рисовать портреты.\n\nДада, совсем не обязательно тратить 5 лет, чтобы получить художественное образование, прикинь😳\n\nУже совсем скоро ты узнаешь, как всего за 50 простых шагов можно научиться рисовать крутой портрет!\n🎁А также подарю тебе:\n\n- методичку с пошаговым рисованием портрета;\n- урок по наложению штриховки и передаче объёма в портрете.`, false)
})
bot.action('btn_1', (ctx) => {
    sendPost.sendTextWithButton(ctx, 'Ты мой любимчик☺️\n\nЯ обожаю тех, кто мечтает... У каждого должна быть хотя бы одна мечта. И любая мечта должна осуществляться! Ты попал в нужное место и сделал правильный выбор!\n\nГлавное - ничего не бойся! Я буду рядом🤗\n\nА теперь ты готов узнать много новой, полезной и интересной информации?', [['Да-да-да, хочу хочу хочу☺️', 'btn_5']])
    connectDB.update(ctx.update.callback_query.from.id, 'Знакомство', 'btn_1')
})
bot.action('btn_2', (ctx) => {
    sendPost.sendTextWithButton(ctx, 'Ооо, как знакомо!\n\nЗа моими плечами 5️⃣ лет образования в вузе на кафедре Архитектуры. Вспоминаю те времена, как самые тяжёлые в моей жизни...\n\n⏰Подъём в 6 утра, каждый день к 8:00 на другой конец города с пересадками на общественном транспорте. Приходилось возить с собой большие тяжёлые деревянные планшеты и ноутбук. Бесконечные чертежи и макеты. 4-5 часов сна. И где-то 1-2 раза за день я успевала перекусить. Горящие сроки, переделки, защита проектов... и отсутствие отопления в здании, где мы проводили большую часть жизни на тот момент.\n\nУже после 1 курса поняла, что это совсем не то, чем я хотела бы заниматься. Но почему не забрала документы❓\n\nНа тот момент я, как и большинство людей, думала, что на творчестве не заработаешь. И, плача в подушку, продолжала учиться ещё 4 года🤦🏻‍♀️\n\nНо после того, как я заработала свои первые 100 тыс на творчестве, мой мир перевернулся. И теперь я обучаю других не только рисовать, но и зарабатывать на любимом деле.\n\nГотов узнать много новой, полезной и интересной информации?', [['Да-да-да, хочу хочу хочу☺️', 'btn_5']])
    connectDB.update(ctx.update.callback_query.from.id, 'Знакомство', 'btn_2')
})
bot.action('btn_3', (ctx) => {
    sendPost.sendTextWithButton(ctx, 'Новичок - это гордость!\n\nМногие только мечтают научиться рисовать. И, представляешь, боятся этого😱\n\nА ты уже преодолел этот страх! А значит - сделал полдела. Дальше остаётся только продолжать и не бояться! Идти и не сдаваться!\n\nА я буду рядом. Ведь ты попал туда, где есть все, что тебе нужно😉\n\nГотов узнать много новой, полезной и интересной информации?', [['Да-да-да, хочу хочу хочу☺️', 'btn_5']])
    connectDB.update(ctx.update.callback_query.from.id, 'Знакомство', 'btn_3')
})
bot.action('btn_4', (ctx) => {
    sendPost.sendTextWithButton(ctx, 'Привет, коллега!👩🏻‍🎨\n\nДа, мы - творческие не можем всегда рисовать одно и то же. Постоянно хочется чего-то нового, пробовать разные стили, искать себя...\n\nА уж кто не мечтал научиться рисовать портреты?😅\n\n✅Ведь если нет денег на подарок, то всегда можно нарисовать и подарить портрет;\n✅Портрет можно рисовать на заказ;\n✅Можно сотрудничать с крупными блогерами и рисовать для них аватарки и стикеры.\n\nА также существует ещё много крутых интересных идей и возможностей, связанных с рисованием портретов🔥\n\nГотов узнать обо всем этом подробнее?', [['Да-да-да, хочу хочу хочу☺️', 'btn_5']])
    connectDB.update(ctx.update.callback_query.from.id, 'Знакомство', 'btn_4')
})
bot.action('btn_5', (ctx) => {
    sendPost.sendTextWithButtonAfterExtURL(ctx, '⚠️ВНИМАНИЕ⚠️\nЭто очень важная информация!\n\nЯ уже сказала, что впереди тебя ждёт много полезного, а ещё и много интересного...\n\nПосле просмотра каждого видео тебе будет приходить небольшое задание. За выполнение каждого ты будешь получать 1500 бонусных рублей💸, которые в конце сможешь потратить на приобретение урока по рисованию портрета.\n\nА также впереди ещё будет много подарков🎁\n\nПодробнее об этом я рассказываю тут👇🏻', [['Тренды', 'btn_6']], 'https://youtu.be/MBATZ4pIPT8', 1000*15, './audio/Про задания и бонусные рубли.mp3')
    connectDB.update(ctx.update.callback_query.from.id, 'Введение', 'btn_5')
})
bot.action('btn_6', (ctx) => {
    sendPost.sendTextAfterURL(ctx, '1️⃣ИТАК, ТВОЕ ПЕРВОЕ ЗАДАНИЕ:\nИ первые бонусные 1500 рублей💸\n\nОпиши какие способы заработка на творчестве ты уже использовал?\n\n💬Ответ начни со слова «ИСПОЛЬЗОВАЛ»\n\n⚠️P.S. Это очень важно!!! Если начать с другого слова, то ты не сможешь получить доступ к следующему уроку❗️\n\nЕсли до этого ты никак не зарабатывал на творчестве, но хотел бы, напиши в каких направлениях интересно развиваться?\n\n💬Ответ начни со слова «ИНТЕРЕСНО»\n\n⚠️P.S. Это очень важно!!! Если начать с другого слова, то ты не сможешь получить доступ к следующему уроку❗️', 'https://youtu.be/5F3piInMsts', 1000*60*5.5)
    ctx.scene.enter('firstTask')
    connectDB.update(ctx.update.callback_query.from.id, 'Первое задание получено', 'btn_6')
})
bot.action('btn_7', (ctx) => {
    sendPost.sendTextAfterURL(ctx, '2️⃣ЛОВИ ВТОРОЕ ЗАДАНИЕ\nИ вторые 1500 бонусных рублей\n\n💬Напиши, на каких площадках ты уже размещал свои работы? Ответ начни со слова «РАЗМЕЩАЛ»\n\n💬С каких площадок тебе уже приходили заказы? Ответ начни со слова «ЗАКАЗЫ». Если заказов не было напиши «Заказы не приходили».\n\n💬Что нового ты хотел бы узнать и о каких площадках? Ответ начни с фразы «ХОЧУ УЗНАТЬ»\n\n⚠️P.S. Очень важно начинать ответ именно с тех слов, которые указаны в задании!!! Если начать с другого слова, то ты не сможешь получить доступ к следующему уроку❗️', 'https://youtu.be/fkJTFSBTCIg', 1000*60*7)
    ctx.scene.enter('secondTask')
    connectDB.update(ctx.update.callback_query.from.id, 'Второе задание получено', 'btn_7')
})
bot.action('btn_8', (ctx) => sendPost.sendFile(ctx, './pdf/platform.pdf'))
bot.action('btn_10', (ctx) => {
    sendPost.sendTextAfterURL(ctx, '3️⃣ТРЕТЬЕ ЗАДАНИЕ\nИ дополнительные 1500 бонусных💸\n\nСкорее всего, ты уже пытался рисовать портреты самостоятельно?😉\n\nРасскажи, с какими трудностями тебе приходилось сталкиваться? Что больше всего не получается? Чему хотелось бы научиться и сделать это с легкостью? Без занудных лекций и сложных пропорций...)\n\n💬Ответ начни с фразы «МНЕ ТРУДНО»\n\n⚠️P.S. Очень важно начинать ответ именно с этой фразы!!! Если начать с других слов, то ты не сможешь получить доступ к следующему уроку❗️', 'https://youtu.be/pAKING3prTY', 1000*60*7)
    ctx.scene.enter('thirdTask')
    startTimer(ctx, 'btn_10')
    connectDB.update(ctx.update.callback_query.from.id, 'Третье задание получено', 'btn_10')
})
bot.action('btn_11', (ctx) => {
    sendPost.sendTextAfterURL(ctx, '4️⃣ и 5️⃣ ЗАДАНИЯ\nЗа которые ты сможешь получить сразу 3000 бонусных рублей💸\n\nЗадание4️⃣:\n\nУзнал себя в этом видео? Но не переживай! На самом деле все сталкиваются со страхами и трудностями. Это нормально. И у меня они есть😉\n\nРасскажи, с чем приходилось сталкиваться? И как удаётся с этим справляться?\n\n💬Ответ начни с фразы «Я СТАЛКИВАЛСЯ(ЛАСЬ)»\n\nЗадание5️⃣:\n\nВкратце опиши свои ощущения после медитации. Что нового узнал?\n\n💬Ответ начни с фразы «Я ОЩУТИЛ(А)»\n\n⚠️P.S. Очень важно начинать ответ именно с этих фраз!!! Если начать с других слов, то ты не сможешь получить доступ к следующему уроку❗️', 'https://youtu.be/4_Gmw279XV0', 1000*60*14)
    ctx.scene.enter('fourthAndFifthTask')
    startTimer(ctx, 'btn_11')
    connectDB.update(ctx.update.callback_query.from.id, '4 и 5 задания получены', 'btn_11')
})
bot.action('btn_beforefinal', (ctx) => {
    sendPost.sendTextWithButtonAfterExtURL(ctx, 'Ты молодец! Уверена, что у тебя всё получилось! 💯\n\n6️⃣Лови заключительное задание и заработай ещё 1500 бонусных рублей💸:\n\nВсё, что тебе нужно сделать - поделиться своей работой и написать «ЗАДАНИЕ ВЫПОЛНЕНО»\n\nЧтобы поделиться работой опубликуй ее в альбоме по ссылке под этим постом👇🏻\n\nЯ лично проверяю каждую работу. И даю свою обратную связь🤗\nПосле того, как мной будет проверено выполнение ВСЕХ заданий, тебе будет начислено ещё 1500 БР и придёт инструкция как ты сможешь ими воспользоваться💝', [['Поделиться работой', 'https://vk.com/album-170738408_256211336']], 'https://youtu.be/5kWZvCuWpyY', 1000*60*30)
    ctx.scene.enter('lastTask')
    connectDB.update(ctx.update.callback_query.from.id, 'Последнее задание получено', 'btn_beforefinal')
})
bot.action('btn_13', (ctx) => sendPost.sendFile(ctx, './pdf/методичка.pdf'))
bot.action('btn_100', (ctx) => {
    sendPost.sendTextWithButton(ctx, '👏🏻 Ты молодец! Вижу, что ты действительно хочешь освоить новую профессию и начать зарабатывать на любимом деле!\n\nВперед! И у тебя обязательно всё получится 💯\n\nВ следующем видео ты узнаешь какие существуют площадки для размещения своих работ и поиска заказов👇🏻', [['Площадки', 'btn_7']])
    connectDB.update(ctx.update.callback_query.from.id, 'Первое задание пройдено', 'btn_100')
})
bot.action('btn_101', (ctx) => {
    sendPost.sendTextWithButton(ctx, '🔥Супер! Ты уже знаешь как зарабатывать на творчестве! Осталось набраться новых знаний и улучшить свои навыки в продажах.\n\nИ я готова тебе в этом помочь🤗\nЖми кнопку и я расскажу какие существуют площадки для размещения своих работ и поиска заказов👇🏻', [['Площадки', 'btn_7']])
    connectDB.update(ctx.update.callback_query.from.id, 'Первое задание пройдено', 'btn_101')
})
bot.action('btn_102', (ctx) => {
    sendPost.sendTextWithButton(ctx, 'Ура! 🥳\n\nТы выполнил второе задание и за это ты получаешь не просто бонусные 1500₽, а ещё и подарок 🎁\n\nЯ дарю тебе файл с ещё большим количеством площадок, где ты можешь размещать свои работы и уже сейчас получать новые заказы.\n\nКруто? Ещё как! Ты заслужил, лови👇🏻\n\nА также не забудь подписаться на мою группу ВКонтакте. Мне будет приятно, а ты сможешь найти там ещё больше пользы🤗', [['🎁Получить файл с площадками🎁', 'btn_8'], ['Подписаться на группу ВКонтакте', 'https://vk.com/valeriya.artist']])
        .then(() => {
            setTimeout(async () => {
                sendPost.sendTextWithButtonAfterPhoto(ctx, 'Я знаю как сложно бывает начинающим портретистам. И знаю все проблемы, с которыми тебе приходится сталкиваться. Знай, если у тебя что-то не получается - это не потому, что ты бездарный. Ты просто пока чего-то не знаешь👩🏻‍🎨\n\nУ меня есть решения, которые помогут тебе справиться со всеми трудностями!\n\nЖми на кнопку и смотри следующее видео👇🏻', [['Трудности при рисовании портретов', 'btn_10']], 0, './img/1.JPG', '✅Надеюсь, ты успел скачать файл\n✅и подписался на мою группу.\nНа этом  у меня для тебя не все.', false)
            }, 1000*1)
        })
    connectDB.update(ctx.update.callback_query.from.id, 'Второе задание пройдено', 'btn_102')
})
bot.action('btn_103', (ctx) => {
    sendPost.sendAudioWithButton(ctx, './audio/Ты выполнил 3 задания!!!.mp3', 'А теперь скорее жми кнопку, смотри новое видео, выполняй задание, за которое ты сможешь получить рекордное количество 💸', [['Медитация🧘', 'btn_11']])
    connectDB.update(ctx.update.callback_query.from.id, 'Третье задание пройдено', 'btn_103')
})
bot.action('btn_104', (ctx) => {
    sendPost.sendTextWithButtonAfterPhoto(ctx, 'А теперь пришло время раскрыть свой потенциал! Приготовься потренировать свой центр творчества, юмора и креатива - правое полушарие!\n\nПредлагаю отвлечься от новостей и принять участие в арт-терапии. Мы будем рисовать страстные губки 👄\n\nДаже если ты впервые держишь в руках карандаш, у тебя точно всё получится! Главное - расслабиться и получать удовольствие😉\n\nТы знаешь, что нужно делать👇🏻', [['Смотреть урок', 'btn_beforefinal']], 0, './img/2.JPG', 'ВАУ !!!🤩\n\nТы заработал целых  3️⃣0️⃣0️⃣0️⃣бонусных рублей !!!\n\nИ на твоём счету их уже 7500💸\n\nСовсем скоро ты сможешь потратить их на покупку самого крутого урока, где я расскажу как всего за 50 простых шагов научиться рисовать портрет👩🏻‍🎨', false)
    connectDB.update(ctx.update.callback_query.from.id, '4 и 5 задания выполнены', 'btn_104')
})
bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
const { Scenes } = require('../../bot')
const sendPost = require('../../sendPost')
const connectDB = require('../../connectDB')

const firstTask = new Scenes.BaseScene('firstTask')

firstTask.on('message', async (ctx) => {
  if (!/использовал/i.test(ctx.message.text) && /интересно/i.test(ctx.message.text)) {
    await sendPost.sendTextWithButton(ctx, '👏🏻 Ты молодец! Вижу, что ты действительно хочешь освоить новую профессию и начать зарабатывать на любимом деле!\n\nВперед! И у тебя обязательно всё получится 💯\n\nВ следующем видео ты узнаешь какие существуют площадки для размещения своих работ и поиска заказов👇🏻', [['Площадки', 'btn_7']], true)
    connectDB.update(ctx.message.from?.id, 'Первое задание пройдено', 'btn_100')
    ctx.scene.leave()
  } else if (/использовал/i.test(ctx.message.text)) {
    await sendPost.sendTextWithButton(ctx, '🔥Супер! Ты уже знаешь как зарабатывать на творчестве! Осталось набраться новых знаний и улучшить свои навыки в продажах.\n\nИ я готова тебе в этом помочь🤗\nЖми кнопку и я расскажу какие существуют площадки для размещения своих работ и поиска заказов👇🏻', [['Площадки', 'btn_7']], true)
    connectDB.update(ctx.message.from?.id, 'Первое задание пройдено', 'btn_100')
    ctx.scene.leave()
  } else sendPost.sendText(ctx, 'Хм, ключевые слова не распознаны, попробуй еще')
})

module.exports.firstTask = firstTask
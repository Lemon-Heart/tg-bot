const { Scenes } = require('../../bot')
const sendPost = require('../../sendPost')
const connectDB = require('../../connectDB')

const thirdTask = new Scenes.BaseScene('thirdTask')

thirdTask.on('message', async (ctx) => {
  if (/мне трудно/i.test(ctx.message.text)) {
    await sendPost.sendAudioWithButton(ctx, './audio/Ты выполнил 3 задания!!!.mp3', 'А теперь скорее жми кнопку, смотри новое видео, выполняй задание, за которое ты сможешь получить рекордное количество 💸', [['Медитация🧘', 'btn_11']], true)
    connectDB.update(ctx.message.from?.id, 'Третье задание пройдено', 'btn_103')
  } else sendPost.sendText(ctx, 'Хм, ключевые слова не распознаны, попробуй еще')
})

module.exports.thirdTask = thirdTask
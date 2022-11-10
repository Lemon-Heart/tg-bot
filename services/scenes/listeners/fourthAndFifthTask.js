const { Scenes } = require('../../bot')
const sendPost = require('../../sendPost')
const connectDB = require('../../connectDB')

const fourthAndFifthTask = new Scenes.BaseScene('fourthAndFifthTask')

fourthAndFifthTask.on('message', async (ctx) => {
  if (/я сталкивался/i.test(ctx.message.text) || /я сталкивалась/i.test(ctx.message.text) || /я ощутил/i.test(ctx.message.text)) {
    await sendPost.sendTextWithButtonAfterPhoto(ctx, 'А теперь пришло время раскрыть свой потенциал! Приготовься потренировать свой центр творчества, юмора и креатива - правое полушарие!\n\nПредлагаю отвлечься от новостей и принять участие в арт-терапии. Мы будем рисовать страстные губки 👄\n\nДаже если ты впервые держишь в руках карандаш, у тебя точно всё получится! Главное - расслабиться и получать удовольствие😉\n\nТы знаешь, что нужно делать👇🏻', [['Смотреть урок', 'btn_beforefinal']], 0, './img/2.JPG', 'ВАУ !!!🤩\n\nТы заработал целых  3️⃣0️⃣0️⃣0️⃣бонусных рублей !!!\n\nИ на твоём счету их уже 7500💸\n\nСовсем скоро ты сможешь потратить их на покупку самого крутого урока, где я расскажу как всего за 50 простых шагов научиться рисовать портрет👩🏻‍🎨')
    connectDB.update(ctx.message.from?.id, '4 и 5 задания выполнены', 'btn_104')
  } else sendPost.sendText(ctx, 'Хм, ключевые слова не распознаны, попробуй еще')
})

module.exports.fourthAndFifthTask = fourthAndFifthTask
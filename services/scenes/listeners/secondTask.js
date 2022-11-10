const { Scenes } = require('../../bot')
const sendPost = require('../../sendPost')
const connectDB = require('../../connectDB')

const secondTask = new Scenes.BaseScene('secondTask')

secondTask.on('message', async (ctx) => {
  if (/размещал/i.test(ctx.message.text) || /заказы/i.test(ctx.message.text) || /хочу узнать/i.test(ctx.message.text)) {
    await sendPost.sendTextWithButton(ctx, 'Ура! 🥳\n\nТы выполнил второе задание и за это ты получаешь не просто бонусные 1500₽, а ещё и подарок 🎁\n\nЯ дарю тебе файл с ещё большим количеством площадок, где ты можешь размещать свои работы и уже сейчас получать новые заказы.\n\nКруто? Ещё как! Ты заслужил, лови👇🏻\n\nА также не забудь подписаться на мою группу ВКонтакте. Мне будет приятно, а ты сможешь найти там ещё больше пользы🤗', [['🎁Получить файл с площадками🎁', 'btn_8'], ['Подписаться на группу ВКонтакте', 'https://vk.com/valeriya.artist']], true)
      .then(() => {
        setTimeout(async () => {
          sendPost.sendTextWithButtonAfterPhoto(ctx, 'Я знаю как сложно бывает начинающим портретистам. И знаю все проблемы, с которыми тебе приходится сталкиваться. Знай, если у тебя что-то не получается - это не потому, что ты бездарный. Ты просто пока чего-то не знаешь👩🏻‍🎨\n\nУ меня есть решения, которые помогут тебе справиться со всеми трудностями!\n\nЖми на кнопку и смотри следующее видео👇🏻', [['Трудности при рисовании портретов', 'btn_10']], 0, './img/1.JPG', '✅Надеюсь, ты успел скачать файл\n✅и подписался на мою группу.\nНа этом  у меня для тебя не все.')
        }, 1000*30)
      })
    connectDB.update(ctx.message.from?.id, 'Второе задание пройдено', 'btn_102')
    ctx.scene.leave()
  } else sendPost.sendText(ctx, 'Хм, ключевые слова не распознаны, попробуй еще')
})

module.exports.secondTask = secondTask
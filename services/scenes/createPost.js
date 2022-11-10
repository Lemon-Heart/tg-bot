const { bot, Scenes } = require('../bot')
const sendPost = require('../sendPost')
const connectDB = require('../connectDB')

let postPhoto
let postText
const createPost = new Scenes.BaseScene('createPost')
createPost.enter(ctx => {
  sendPost.sendTextWithButton(ctx, 'Загрузи фото', [['Пропустить', 'btn_1000']], true)
})
const stage = new Scenes.Stage([createPost])
bot.use(stage.middleware())
bot.command('createPost', ctx => {
  if (ctx.message.from.id === Number(process.env.SECOND_ADMIN_ID) || ctx.message.from.id === Number(process.env.ADMIN_ID)) ctx.scene.enter('createPost')
})
createPost.on('photo', ctx => {
  postPhoto = ctx.message.photo[0].file_id
  sendPost.sendText(ctx, 'Введи текст поста')
})
createPost.action('btn_1000', ctx => {
  sendPost.sendText(ctx, 'Введи текст поста')
  ctx.answerCbQuery()
})
createPost.on('text', async ctx => {
  postText = ctx.message.text
  try {
    if (postPhoto) {
      await ctx.replyWithMediaGroup([{
        media: postPhoto,
        caption: postText,
        type: 'photo'
      }])
        .then(() => {
          setTimeout(async () => {
            await sendPost.sendTextWithButton(ctx, 'Посмотри, что получилось', [['Супер, отправить', 'btn_send'], ['Ой, плохо, отмена', 'btn_leave']], true)
          }, 1000)
        })
    } else {
      await sendPost.sendText(ctx, postText)
        .then(() => {
          setTimeout(async () => {
            await sendPost.sendTextWithButton(ctx, 'Посмотри, что получилось', [['Супер, отправить', 'btn_send'], ['Ой, плохо, отмена', 'btn_leave']], true)
          }, 1000)
        })
    }
  } catch (e) { console.log(e) }
})
createPost.action('btn_send', async ctx => {
  await connectDB.mailAllUsers(postText, postPhoto)
    .then(() => {
      sendPost.sendText(ctx, 'Пост успешно отправлен\nУдалить последний пост /deleteLastPost')
      postPhoto = ''
      postText = ''
      ctx.scene.leave()
    })
  ctx.answerCbQuery()
})
createPost.action('btn_leave', async ctx => {
  sendPost.sendText(ctx, 'Создание поста отменено\nСоздать заново /createPost')
  await ctx.scene.leave()
    .then(() => {
      postPhoto = ''
      postText = ''
    })
  ctx.answerCbQuery()
})
bot.command('deleteLastPost', ctx => {
  if (ctx.message.from.id === Number(process.env.SECOND_ADMIN_ID) || ctx.message.from.id === Number(process.env.ADMIN_ID)) connectDB.deleteLastMessage()
})

module.exports.createPost = createPost
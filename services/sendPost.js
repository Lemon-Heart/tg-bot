const { Markup } = require('telegraf')

const sendTextWithButton = async (ctx, postBody, buttons, noBtn = false) => {
  try {
    const keyboard = []
    buttons.forEach(button => {
      if (/btn_/i.test(button[1])) keyboard.push([Markup.button.callback(button[0], button[1])])
      else keyboard.push([Markup.button.url(button[0], button[1])])
    })
    await ctx.replyWithHTML(postBody, Markup.inlineKeyboard(keyboard)).then(() => { if (!noBtn) ctx.answerCbQuery() })
  } catch (e) { console.log(e) }
}
const sendTextWithButtonAfterExtURL = async (ctx, postBody, buttons, extURL, delay, voices = false) => {
  try {
    await ctx.reply(extURL)
      .then(() => ctx.answerCbQuery())
      .then(() => {
        setTimeout(async () => {
          if (voices) {
            ctx.replyWithVoice({ source: voices})
              .then(() => {
                sendTextWithButton(ctx, postBody, buttons)
              })
          } else {
            sendTextWithButton(ctx, postBody, buttons)
          }
        }, delay)
      })
  } catch (e) { console.log(e) }
}
const sendTextWithButtonAfterFile = async (ctx, postBody, buttons, file, delay, photo = false, photoCaption = false) => {
  try {
    await ctx.replyWithDocument({ source: file})
      .then(() => ctx.answerCbQuery())
      .then(() => {
        setTimeout(async () => {
          if (photo) {
            await ctx.replyWithMediaGroup([{
              media: { source: photo },
              caption: photoCaption ? photoCaption : null,
              type: 'photo'
            }]).then(() => {
              sendTextWithButton(ctx, postBody, buttons)
            })
          } else {
            sendTextWithButton(ctx, postBody, buttons)
          }
        }, delay)
      })
  } catch (e) { console.log(e) }
}
const sendTextWithButtonAfterPhoto = async (ctx, postBody, buttons, delay, photo, photoCaption = false, noBtn = true) => {
  try {
    await ctx.replyWithMediaGroup([{
      media: { source: photo },
      caption: photoCaption ? photoCaption : null,
      type: 'photo'
    }]).then(() => {
      setTimeout(async () => {
        sendTextWithButton(ctx, postBody, buttons, noBtn)
      }, delay)
    })
  } catch (e) { console.log(e) }
}
const sendTextAfterURL = async (ctx, postBody, extURL, delay) => {
  try {
    await ctx.reply(extURL)
      .then(() => ctx.answerCbQuery())
      .then(() => {
        setTimeout(async () => {
          ctx.replyWithHTML(postBody)
        }, delay)
      })
  } catch (e) { console.log(e) }
}
const sendFile = async (ctx, file, noBtn = false) => {
  try {
    await ctx.replyWithDocument({ source: file}).then(() => { if (!noBtn) ctx.answerCbQuery() })
  } catch (e) { console.log(e) }
}
const sendAudioWithButton = async (ctx, voices, postBody, buttons, noBtn = false) => {
  try {
    await ctx.replyWithVoice({ source: voices})
      .then(() => { if (!noBtn) ctx.answerCbQuery() })
      .then(() => {
        sendTextWithButton(ctx, postBody, buttons, true)
      })
  } catch (e) { console.log(e) }
}
const sendText = async (ctx, postBody) => {
  try {
    await ctx.replyWithHTML(postBody)
  } catch (e) { console.log(e) }
}
const sendURL = async (ctx, URL) => {
  try {
    await ctx.reply(URL)
  } catch (e) { console.log(e) }
}
module.exports.sendTextWithButton = sendTextWithButton
module.exports.sendTextWithButtonAfterExtURL = sendTextWithButtonAfterExtURL
module.exports.sendTextWithButtonAfterFile = sendTextWithButtonAfterFile
module.exports.sendTextWithButtonAfterPhoto = sendTextWithButtonAfterPhoto
module.exports.sendTextAfterURL = sendTextAfterURL
module.exports.sendFile = sendFile
module.exports.sendAudioWithButton = sendAudioWithButton
module.exports.sendText = sendText
module.exports.sendURL = sendURL
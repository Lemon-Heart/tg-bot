const { Telegraf, session, Scenes } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

module.exports.bot = bot
module.exports.session = session
module.exports.Scenes = Scenes
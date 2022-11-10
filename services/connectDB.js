const mysql = require('mysql2/promise')
const { bot } = require('./bot')
const { Markup } = require('telegraf')
const cron = require('node-cron')

const config = {
  host: 'bodymaiu.beget.tech',
  user: process.env.DB_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
}

cron.schedule('* * * * *', () => {
  console.log('Запрос к БД')
  isInaction()
})

async function start(ctx) {
  const connection = await mysql.createConnection(config)
  const [ rows ] = await connection.execute(`SELECT * FROM users WHERE id=?`, [`${ctx.message.from?.id}`])
  if (!rows?.length) await connection.execute(`INSERT INTO users(id, name, link, status, btn, time, first_time, notified, notified_finaly) VALUES('${ctx.message.from?.id}','${ctx.message.from?.first_name}', '${ctx.message.from?.username ?? ''}', 'Старт', 'btn_0', ${Date.now() + 1000*60*30}, ${Date.now()}, ${0}, ${0})`)
  connection.end()
}
async function update(id, status, btn, time = Date.now() + 1000*60*30, notified = 0) {
  const connection = await mysql.createConnection(config)
  await connection.query(`UPDATE users SET status=?, btn=?, time=?, notified=? WHERE id=?`, [status, btn, time, notified, id])
  connection.end()
}
async function updateNotifiedFinaly(id, notifiedFinaly) {
  const connection = await mysql.createConnection(config)
  await connection.query(`UPDATE users SET notified_finaly=${notifiedFinaly} WHERE id=${id}`)
  connection.end()
}
async function isInaction() {
  const connection = await mysql.createConnection(config)
  const [ rows ] = await connection.execute(`SELECT * FROM users`)
  if (rows.length) {
    rows.forEach((user) => {
      if (user.btn !== 'btn_end') {
        try {
          if (Date.now() >= user.time && user.notified === 0) {
            bot.telegram.sendMediaGroup(user.id, [{
              media: { source: './img/inactive.JPG' },
              caption:
                user.btn === 'btn_beforefinal' ?
                'ЭЙ, ну ты чего?\nВедь ты уже на финишной прямой 🏁\nЯ жду твою работу, а тебя ждет ещё один подарок 🎁\n\nНе упускай возможность, которой больше никогда и нигде не будет!!!\n\nВсё, что тебе осталось сделать - поделиться своей работой в этом чате и написать «ЗАДАНИЕ ВЫПОЛНЕНО»'
                :
                'Эй, мы так не договаривались🙅🏻‍♀️\n\nЯ подготовила для тебя столько полезного и интересного, а ты готов вот так просто взять и не взять все то, что я так долго создавала и записывала?????\n\nГотов упустить шанс научиться рисовать крутые портреты❓\nГотов отказаться от бесплатных подарков❓\nГотов потерять возможность начать зарабатывать на любимом деле❓',
              type: 'photo'
            }]).then(() => {
              setTimeout(() => {
                bot.telegram.sendMessage(
                  user.id,
                  user.btn === 'btn_beforefinal' ?
                    'А также опубликовать свою работу в альбоме по ссылке под этим постом👇🏻\n\nЯ лично проверяю каждую работу. И даю свою обратную связь🤗\nПосле того, как мной будет проверено выполнение ВСЕХ заданий, тебе будет начислено ещё 1500 БР и придёт инструкция как ты сможешь ими воспользоваться👇🏻'
                    :
                    '✅Или готов все исправить и продолжить?\nВпереди тебя ждет 6 небольших видео, в которых я собрала целое море полезного материала. Ты можешь применить его и уже сейчас начать зарабатывать на творчестве! А также подарки и бонусы…\n❗️ТАКОГО ТЫ НЕ НАЙДЕШЬ БОЛЬШЕ НИГДЕ❗️\n\nВсе, что тебя отделяет от заветной мечты - это нажатие на кнопку ниже. Напоминаю, что на выполнение всех домашних заданий у тебя осталось меньше, чем 24 часа.\n\nСкорее жми👇🏻',
                  Markup.inlineKeyboard([
                    user.btn === 'btn_beforefinal' ?
                    [Markup.button.callback('Поделиться работой', 'https://vk.com/album-170738408_256211336')]
                    :
                    [Markup.button.callback('Извини, я отвлекся. Продолжить🤗', user.btn)]
                ]))
              }, 1)
              update(user.id, user.status, user.btn, user.time, 1)
            })
          }
          if (Date.now() - user.first_time >= 1000*60*60*18 && user.notified_finaly === 0) {
            bot.telegram.sendMediaGroup(user.id, [{
              media: { source: './img/inactive2.JPG' },
              caption: '⚠️⏳Совсем скоро закроется доступ к уроку по рисованию портрета, а также ко всем подаркам! Так как задания всё еще не выполнены.\n\nУ тебя есть ещё 5 часов. Иначе доступ ко всем материалам закроется НАВСЕГДА и будет доступен только за 10.000₽',
              type: 'photo'
            }]).then(() => {
              setTimeout(() => {
                bot.telegram.sendMessage(
                  user.id,
                  'Прямо сейчас нажми на кнопку ниже, выполни это простое задание и заработай бонусные рубли👇🏻👇🏻👇🏻\n\nP.S. Если все задания выполнены вовремя - просто дождись проверки.',
                  Markup.inlineKeyboard([
                    [Markup.button.callback('Продолжить выполнять задания', user.btn)]
                ]))
              }, 1)
            })
            updateNotifiedFinaly(user.id, 1)
          }
        } catch (e) { console.log(e) }
      }
    })
  }
  connection.end()
}
lastMessageId = []
async function mailAllUsers(postText, postPhoto = null) {
  const connection = await mysql.createConnection(config)
  const [ rows ] = await connection.execute(`SELECT * FROM users`)
  if (rows.length) {
    rows.forEach((user) => {
      try {
        if (postPhoto) {
          bot.telegram.sendMediaGroup(user.id, [{
            media: postPhoto,
            caption: postText,
            type: 'photo'
          }])
            .then(data => {
              lastMessageId.push([data[0].chat.id, data[0].message_id])
            })
        } else {
          bot.telegram.sendMessage(user.id, postText)
            .then(data => {
              lastMessageId.push([data.chat.id, data.message_id])
            })
        }
      } catch (e) { console.log(e) }
    })
  }
  connection.end()
}
async function deleteLastMessage() {
  lastMessageId.map(o => bot.telegram.deleteMessage(o[0], o[1]))
}
async function remove(names) {
  const connection = await mysql.createConnection(config)
  await connection.query('DELETE FROM users WHERE name IN ("Татьяна", "Настя", "Валерия", "Анастасия", "Андрей")')
  connection.end()
}

module.exports.start = start
module.exports.isInaction = isInaction
module.exports.update = update
module.exports.remove = remove
module.exports.mailAllUsers = mailAllUsers
module.exports.deleteLastMessage = deleteLastMessage
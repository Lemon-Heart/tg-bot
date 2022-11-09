const mysql = require('mysql2/promise')

const config = {
  host: 'bodymaiu.beget.tech',
  user: process.env.DB_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
}

async function start(ctx) {
  const connection = await mysql.createConnection(config)
  const [ rows ] = await connection.execute(`SELECT * FROM users WHERE id=?`, [`${ctx.message.from?.id}`])
  if (!rows?.length) await connection.execute(`INSERT INTO users(id, name, link, status) VALUES('${ctx.message.from?.id}','${ctx.message.from?.first_name}', '${ctx.message.from?.username ?? ''}', 'Старт')`)
  connection.end()
}
async function update(ctx, status) {
  const connection = await mysql.createConnection(config)
  await connection.query(`UPDATE users SET status=? WHERE id=?`, [status, `${ctx.update.callback_query?.from.id ? ctx.update.callback_query.from.id : ctx.update.message.from.id}`])
  connection.end()
}
async function remove(ctx) {
  const connection = await mysql.createConnection(config)
  await connection.query('DELETE FROM users WHERE name=?', ['Татьяна'])
  connection.end()
}

module.exports.start = start
module.exports.update = update
module.exports.remove = remove
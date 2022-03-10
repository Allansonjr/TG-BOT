const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const text = require('./constants')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => {
	ctx.reply(`Привет ${ctx.message.from.username ? ctx.message.from.username : 'Привет гость...'}`)
})

bot.help(ctx => ctx.reply(text.commands))

// Пишем обработчика
bot.command('course', async ctx => {
	try {
		await ctx.replyWithHTML('<b>Наши Курсы</b>', Markup.inlineKeyboard([
			[
				Markup.button.callback('UX/UI', 'btn_ux'),
				Markup.button.callback('HTML', 'btn_html'),
			],
			[
				Markup.button.callback('Front-end', 'btn_fe'),
			],
			[Markup.button.callback('Back-End', 'btn_backend')],
			[Markup.button.callback('Наш сайт', 'btn_site')],
		]))
	} catch (e) {
		(console.error(e))
	}
})


//Start
bot.launch()
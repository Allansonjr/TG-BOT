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
	console.log(text.myTxt2)
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
		console.error(e)
	}
})


// Обработчик


const handlerAction = (btnName, photo, txt) => {
	bot.action(btnName, async ctx => {
		try {
			// Убирает таймиен с кнопки
			await ctx.answerCbQuery()
			if (photo !== false) {
				await ctx.replyWithPhoto({
					source: photo,
				})
			}
			await ctx.replyWithHTML(txt)
		} catch (e) {
			console.error(e)
		}
	})
}

handlerAction('btn_ux', './img/valery-sysoev-p9OkL4yW3C8-unsplash.jpg', text.myTxt1)
handlerAction('btn_html', './img/claudio - schwarz - i25aqE_YUZs - unsplash.jpg', text.myTxt2)
handlerAction('btn_fe', './img/front-end.jpg', text.myTxt3)
handlerAction('btn_backend', './img/unsplash.jpg', text.myTxt4)
handlerAction('btn_site', './img/academy-banner.png', text.myTxt5)

//Start

bot.launch()
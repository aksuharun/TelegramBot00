const TelegramBot = require('node-telegram-bot-api')
const token = YOUR_API_KEY
const bot = new TelegramBot(token,{polling:true})


const langs = ["en" ,"tr"]
var activeLang = 0;
const Cmd = class{
	constructor(help){
		this.help = help
	}
}

const random = new Cmd([
	"/random command is a random number and letter generator between 0-9 and A-Z. Type \"num\" or \"number\" (non case sensitive) after /random command to generate random number. Type \"letter\" to generate random letter",
	"/random komutu 0-9 ve A-Z arasında sayı ya da harf üretir. Sayı üretmek için /random yazdıktan sonra \"sayı\" ya da \"sayi\" (büyük/küçük harf olması önemsiz) yazın.\n Harf üretmek içinse \"harf\" yazın"
])

const lang = new Cmd("🇬🇧 Use /lang command to change language. eg: \"/lang en\". Use /help command to see commands\n\n 🇹🇷 Dil Seçmek için /lang komutunu kullan. Örnek: \"/lang tr\"")
bot.onText(/\/start/,(msg)=>{
	bot.sendMessage(msg.chat.id,lang.help)
})

bot.onText(/\/lang (.+)/, (msg,match) => {
	const chatId = msg.chat.id
	const res = match[1]

	if(res == "en"){
		activeLang = 0
		bot.sendMessage(chatId,"🇬🇧 Language set to English")
	}
	else if(res == "tr"){

		activeLang = 1
		bot.sendMessage(chatId,"🇹🇷 Dil Türkçe olarak ayarlandı")
	}
}) 
bot.onText(/\/echo (.+)/,(msg,match) => {
	const chatId = msg.chat.id
	const res = match[1]
	
	bot.sendMessage(chatId,res)
})

bot.onText(/\/random (.+)/,(msg,match) =>{
	const chatId = msg.chat.id
	const res =  match[1].toLowerCase()
	if(res == "help"){
		bot.sendMessage(chatId, random.help[activeLang])
	}
	else if(res == "sayi" || res == "sayı" || res == "number" || res == "num"){
		let num = Math.floor(Math.random() * 10)
		bot.sendMessage(chatId,num)
	}
	else if(res == "letter" || res == "harf"){
			let letter = String.fromCharCode(Math.floor(Math.random() * 26 + 65))
			bot.sendMessage(chatId,letter)
	}
})

bot.onText(/\/author/,(msg,match)=>{
	bot.sendMessage(msg.chat.id,)
})

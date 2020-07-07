const PATH = ''
const fs = require('fs')
require('dotenv').config()

const Discord = require('discord.js')

const client = new Discord.Client()

let commands = {}

async function loadCommands(path) {
    console.log('loading commands...')
    let files = fs.readdirSync(path)
    files.forEach(file => {
        if (file.endsWith('.js')) {
            let name = file.toLowerCase().substring(0, file.length - 3)
            let command = require(`${path}/${file}`)
            commands[name] = command
        }
    })
}

client.on("ready", () => {
    console.log(`Connected as ${client.user.tag}`)
    loadCommands('./commands')
})

client.login(process.env.BOT_TOKEN)

client.on("message", (recieved) => {
    if (recieved.author === client.user) return

    if (recieved.content.startsWith('!')) {

        let com = recieved.content.split(' ')[0].slice(1)
        if (commands[com] !== undefined)
            try {
                commands[com].run(client, recieved)
            } catch (error) {   //Ошибка должна выкидываться в текстовом варианте
                recieved.channel.send('Упс, ошибка. ' + error)
            }
        else {
            recieved.channel.send("Такой команды не существует.")
        }
    }
})


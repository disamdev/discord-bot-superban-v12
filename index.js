const Discord = require('discord.js');
const client = new Discord.Client()
const db = require('megadb')
require('dotenv').config();
const karit = require('ckarit');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', function(request, response) {
	response.sendFile(__dirname + '/pages/index.html');
});
app.listen(3000, () => console.log(`Servidor de HBot iniciado`));

const { Client, Collection, Guild} = require('discord.js');
const keepAlive = require('./server.js')

const fs =  require('fs');
let { readdirSync } = require("fs");

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./comandos/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', async message => {

  let prefix = "."

if(!message.content.startsWith(prefix)) return;

let usuario = message.mentions.members.first() || message.member;
const args  = message.content.slice(prefix.length).trim().split(/ +/g);
const command =  args.shift().toLowerCase();

  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
if(cmd){
cmd.execute(client, message, args)
}
})

client.on('ready', (ready) => {

		  
     const array = [
			 {
				 name: 'baneando personas',
				 type: 'PLAYING'
			 }
		 ]

		 setInterval(() => {
			 function presence() {
				 client.user.setPresence({
					 status: 'on',
					 activity: array[Math.floor(Math.random() * array.length)]
				 });
			 }

			 presence();
		 }, 10000)

		 console.log("El bot está completamente conectado")
})

  client.snipes = new Map()
	client.on('messageDelete', message => {
  client.snipes.set(message.channel.id, {
    content: message.content,
    delete: message.author,
    canal: message.channel
  })
})

client.login('token') // Pon tu token entre las comillas, si usas replit puedes usar los Secrets para ponerlo

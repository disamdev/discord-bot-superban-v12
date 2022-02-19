const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "superban",
  alias: [],

async execute (client, message, args){

	var perms = message.member.hasPermission("BAN_MEMBERS")
	if(!perms) message.channel.send("Solo los administradores pueden usar este comando")
  
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**No tengo permisos para hacer esto**")

   const id = args.join(' ')
   if(!id) return message.channel.send("¿A quién quieres banear? Para banear a alguien tienes que poner ``.superban`` y la ID de un usuario al que quieras banear")

   const member = await client.users.fetch(id)
  
	 if(message.author.id === id) return message.channel.send("**No puedes banearte a ti mismo**")
   
   message.guild.members.ban(member.id)

   message.channel.send(`El usuario **${member.username}** fue baneado`)

 }

}

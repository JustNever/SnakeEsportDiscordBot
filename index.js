const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`)
  bot.user.setActivity("bit.ly/snake-esport");
});

bot.on("message", async message =>{
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) message.channel.send("Impossible de trouver l'utilisateur !");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission de kick !");
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Cette personne ne peux pas être expulsé !");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~ __Expulsion__ ~")
    .setColor("#0061ff")
    .addField("Utilisateur expulsé", `${kUser} avec l'ID ${kUser.id}`)
    .addField("Explusé par", `<@${message.author.id}> avec l'ID ${message.author.id}`)
    .addField("Date", message.createdAt)
    .addField("Raison", kReason)

    let kickChannel = message.guild.channels.find(`name`, "accueil");
    if(!kickChannel) return message.channel.send("Impossible de trouver le salon d'incident !");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) message.channel.send("Impossible de trouver l'utilisateur !");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission de bannir !");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Cette personne ne peux pas être expulsé !");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~ __Bannissement__ ~")
    .setColor("#ff0000")
    .addField("Utilisateur banni", `${bUser} avec l'ID ${bUser.id}`)
    .addField("Banni par", `<@${message.author.id}> avec l'ID ${message.author.id}`)
    .addField("Date", message.createdAt)
    .addField("Raison", bReason)

    let banChannel = message.guild.channels.find(`name`, "accueil");
    if(!banChannel) return message.channel.send("Impossible de trouver le salon d'incident !");

    message.guild.member(bUser).ban(bReason);
    banChannel.send(banEmbed);

    return;
  }

});

bot.login(process.env.TOKEN);

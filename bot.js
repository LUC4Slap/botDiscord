const { Client, GatewayIntentBits } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");
const config = require("./config.json");
const fs = require("fs");
const client = new Client({
  intents: [32767, GatewayIntentBits.MessageContent],
});
client.login(config.token);

client.once("ready", () => console.log("online"));

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content == "") {
    console.log("Conteudo vazio");
    return;
  }

  const args = message.content.trim().slice(config.prefix.length).split(/!+/g);
  const command = args[0].split(" ")[0].toLowerCase();
  try {
    const commandFile = require(`./commands/${command}.js`);
    let userId = message.author.id;
    let user = message.guild.members.cache.get(userId);
    let idChannelVoice = user.voice.channel.id;
    commandFile.run(client, message, args, idChannelVoice);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

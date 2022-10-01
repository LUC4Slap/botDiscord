const { Partials, Client, GatewayIntentBits } = require("discord.js");
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
  // console.log(JSON.stringify(message, null, 2));
  const args = message.content.trim().slice(config.prefix.length).split(/!+/g);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

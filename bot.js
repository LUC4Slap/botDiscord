const { Client, GatewayIntentBits } = require("discord.js");
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
  // console.log(args);
  const command = args[0].split(" ")[0].toLowerCase();
  try {
    const commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "server") {
    await interaction.reply("Server info.");
  } else if (commandName === "user") {
    await interaction.reply("User info.");
  }
});

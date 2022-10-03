const { EmbedBuilder, GuildMemberManager } = require("discord.js");

module.exports = {
  name: "ping",
  author: "Lucas",
  run: async (client, message, args, idChannelVoice) => {
    // let userID = client;
    // console.log(JSON.stringify(userID, null, 2));
    let cor_da_embed = 0x0099ff;
    let ping_do_bot = client.ws.ping;
    let embed_1 = new EmbedBuilder()
      .setColor(cor_da_embed)
      .setDescription(`**O meu ping este em ${ping_do_bot} ms.`);

    let embed_2 = new EmbedBuilder()
      .setColor(cor_da_embed)
      .setDescription(`**O meu ping este em ${ping_do_bot} ms.`);

    let command_dev = await message
      .reply({ content: `${message.author}`, embeds: [embed_1] })
      .then((msg) => {
        setTimeout(() => {
          msg.edit({ embeds: [embed_2] });
        }, 2000);
      });
  },
};

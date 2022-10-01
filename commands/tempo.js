const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");
module.exports = {
  name: "tempo",
  author: "Lucas",
  //${config.baseUrl}?q=${args[0]}&appid=${config.api_key_temp}&lang=pt_br
  run: async (client, message, args) => {
    let url = `${config.baseUrl}?q=${args[0]}&appid=${config.api_key_temp}&lang=pt_br`;
    console.log(url);
    // let cor_da_embed = 0x0099ff;
    // let ping_do_bot = client.ws.ping;
    // let embed_1 = new EmbedBuilder()
    //   .setColor(cor_da_embed)
    //   .setDescription(`**O meu ping este em ${ping_do_bot} ms.`);

    // let embed_2 = new EmbedBuilder()
    //   .setColor(cor_da_embed)
    //   .setDescription(`**O meu ping este em ${ping_do_bot} ms.`);

    // let command_dev = await message
    //   .reply({ content: `${message.author}`, embeds: [embed_1] })
    //   .then((msg) => {
    //     setTimeout(() => {
    //       msg.edit({ embeds: [embed_2] });
    //     }, 2000);
    //   });
  },
};

const {
  AudioPlayerStatus,
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");
const { EmbedBuilder } = require("discord.js");
const ytdl = require("ytdl-core");
const config = require("../config.json");

module.exports = {
  name: "musica",
  author: "Lucas",
  run: async (client, message, args) => {
    const streamOptions = {
      seek: 0,
      volume: 1,
    };

    let channel = null;
    try {
      channel = await message.guild.channels.fetch(config.channel_id);
    } catch (error) {
      let cor_da_embed = 0x0099ff;
      let embed_1 = new EmbedBuilder()
        .setColor(cor_da_embed)
        .setDescription(`Canal não encontrado`);
      await message
        .reply({ content: `${message.author}`, embeds: [embed_1] })
        .then((msg) => {
          setTimeout(() => {
            msg.edit({ embeds: [embed_2] });
          }, 2000);
        });
      return;
    }

    if (channel != null) {
      console.log("Canal encontrado de client");
      const connection = await joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
      if (connection) {
        const strem = ytdl(args[2].trim(), { filter: "audioonly" });
        const player = createAudioPlayer();
        const resource = createAudioResource(strem);

        await player.play(resource);
        // const DJ = connection.playStream(strem, streamOptions);
        connection.subscribe(player);
        player.on("error", (error) => console.error(error));
        player.on(AudioPlayerStatus.Idle, () => {
          console.log(`song's finished`);
          connection.disconnect();
        });
      }
    }
  },
};

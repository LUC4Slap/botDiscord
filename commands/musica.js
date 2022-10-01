const {
  AudioPlayerStatus,
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");

module.exports = {
  name: "musica",
  author: "Lucas",
  run: async (client, message, args) => {
    const streamOptions = {
      seek: 0,
      volume: 1,
    };

    let channel = await message.guild.channels.fetch("1025423307299893331");
    if (channel == null) {
      console.log("Canal não encontrado de client");
    }

    if (channel != null) {
      console.log("Canal encontrado de client");
      const connection = await joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
      if (connection) {
        const strem = ytdl(args[0], { filter: "audioonly" });
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

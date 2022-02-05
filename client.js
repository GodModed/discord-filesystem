const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.DIRECT_MESSAGES]});
const { token, bot_name, prefix } = require('./settings.json');
const fs = require('fs');

client.commands = new Collection
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith
('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Logged in on, ${client.user.tag}!`)
    console.log(client.listenerCount("messageCreate"))
    client.guilds.cache.each(guilds => {
        try {
            guilds.members.cache.get(client.user.id).setNickname(`${guilds.name}'s ${bot_name}`)
            console.log(`Sucsessfuly set the username of the bot to ${guilds.name}'s ${bot_name} in ${guilds.id}`)
        } catch(e) {
            console.log(e)
        }
    });
    client.user.setActivity("=file | minipractice.net", {
        type: "STREAMING",
        url: "https://twitch.tv/discord"
      });
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()
    if (!client.commands.has(command)) return;
    try{
      client.commands.get(command).execute(client, message, args);
    }catch(error){
      console.error(error)
      message.reply("There was an issue executing that command!");
    }
});

client.login(token);
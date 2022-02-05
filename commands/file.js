const Discord = require("discord.js")
const { prefix, bot_name } = require("../settings.json")
module.exports = {
    name: 'file',
    execute(client, message, args) {
        const fileEmbed = new Discord.MessageEmbed()
        .setTitle(`${bot_name} commands`)
        .setDescription(`**Prefix:** ${prefix}`)
        .addField(`\`file_add [file name] [file]\``, `Adds a file to the file system`)
        .addField(`\`file_send [file name]\``, `Sends the file chosen as a discord message`)
        .addField(`\`file_tree\``, `Shows all of the files in the file system`)
        .setColor(0x000000)
        message.reply({embeds: [fileEmbed]})
    },
  };
const fs = require("fs")
const Discord = require("discord.js")
const path = require('path');
const { prefix, bot_name } = require("../settings.json")
module.exports = {
    name: 'file_tree',
    async execute(client, message, args) {
        var finder = require('findit')(process.argv[2] || './files');
        const fileEmbed = new Discord.MessageEmbed().setTitle(`${bot_name} Files`)
        var files = "";
        finder.on('file', function (file, stat) {
            files = files + "\n" + file
        });
        finder.on('end', async function () {
            fileEmbed.addField("File List", files)
            await message.reply({embeds: [fileEmbed]})
            delete files;
        })
    },
  };
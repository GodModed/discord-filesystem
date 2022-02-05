const fs = require("fs")
const Discord = require("discord.js")
const path = require('path');
const { prefix, bot_name } = require("../settings.json")
module.exports = {
    name: 'file_send',
    async execute(client, message, args) {
        if (!args) return message.reply("Please give a file name")
        else {
            try {
                let attachment = "./files/" + args[0]
                await message.reply({files: [attachment]})
                delete attachment
            } catch (error) {
                console.log(error)
                await message.reply("That is not a valid file. If it is the file you submited, add the file ending on. Else execute the command ```=file_tree```")
            }
        }

    }
};
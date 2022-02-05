const { MessageEmbed } = require('discord.js');
const { owner_ids } = require("../settings.json")
module.exports = {
    name: "eval",

    async execute(client, message, args) {
        if (!owner_ids.includes(message.author.id)) return console.log(message.author.name, "Attempted to use eval!")
        try {
            const code = args.join(" ");
            if (!code) {
                return message.reply("No args")
            }

            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            let embed = new MessageEmbed()
                .setAuthor("Eval", message.author.avatarURL())
                .addField("Input", `\`\`\`js\n${code}\`\`\``)
                .addField("Output", `\`\`\`${evaled}\`\`\``)
                .setColor("GREEN")
            try {
                message.reply({ embeds: [embed] });
            } catch (err) {
                const code = args.join(" ");
                let errembed = new MessageEmbed()
                    .setAuthor("Eval", message.author.avatarURL())
                    .addField("Input", `\`\`\`js\n${code}\`\`\``)
                    .addField("Error", `\`\`\`${err}\`\`\``)
                    .setColor("RED")
                message.reply({ embeds: [errembed] });
            }
        } catch (err) {
            const code = args.join(" ");
            let errembed = new MessageEmbed()
                .setAuthor("Eval", message.author.avatarURL())
                .addField("Input", `\`\`\`js\n${code}\`\`\``)
                .addField("Error", `\`\`\`${err}\`\`\``)
                .setColor("RED")
            message.reply({ embeds: [errembed] });
        }
    }
}
let fs = require(`fs`);
const https = require('https');
const path = require('path');

async function download(url, filePath, message) {
    let filename = path.basename(url);
    filename = filename.split(".")
    const req = https.get(url, function(res) {
        const fileStream = fs.createWriteStream(`./files/${filePath}.${filename[1]}`);
        res.pipe(fileStream);

        fileStream.on("error", function(error){
            message.reply("Error while adding the file ;(")
            console.log(error)
        })

        fileStream.on("finish", function(){
            fileStream.close();
            message.reply("Done!")
            delete filename
        })
    })
    req.on("error", function(err) {
        message.reply("Error while making that request ;(")
        console.log(err)
    })
}

module.exports = {
    name: 'file_add',
    async execute(client, message, args) {
        if (!message.attachments.first()) return message.reply("Please attach a file.")
        if (!args[0]) return message.reply("Insert a file name")
        let filename = args[0] + "." + path.basename(message.attachments.first().url).split(".")[1]
        if (fs.existsSync("./files/" + filename)) return message.reply("There is already a file associated with this name.")
        await download(message.attachments.first().url, args[0], message)
    },
};
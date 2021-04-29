const Discord = require("discord.js");
const axios = require("axios").default;
require("dotenv").config();

const client = new Discord.Client();
const botToken = process.env.BOT_TOKEN;
const apiKey = process.env.API_KEY;
axios.defaults.baseURL = 'https://xivapi.com';

const prefix = "!";

client.on("message", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "character") {
        const characterId = await axios.get(`/character/search?name=${args.join("+")}`)
            .then( ({data}) => {
                console.log(data)
            });
        
    }
    console.log(commandBody)
    console.log(args.join("+"))
    console.log(command)
});

client.login(botToken);

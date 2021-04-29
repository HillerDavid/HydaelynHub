require("dotenv").config();
const botToken = process.env.BOT_TOKEN;
const apiKey = process.env.API_KEY;

const Discord = require("discord.js");
const client = new Discord.Client();

const express = require("express");
const app = express();
const server = require('https').Server(app);
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

const axios = require("axios").default;
axios.defaults.baseURL = 'https://xivapi.com';

const prefix = "!";

client.on("message", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "character") {
        const characterId = axios.get(`/character/search?name=${args.join("+")}`)
            .then(({ data }) => {
                console.log(data)
            });
    }
});

client.login(botToken);

server.listen(PORT, function () {
    console.log(
        '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
        PORT,
        PORT
    );
});
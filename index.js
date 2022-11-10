const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildEmojisAndStickers,
    ],
    partials: [Partials.Message, Partials.Reaction],
    presence: { status: 'online', activities: [{ name: 'over Jexactyl.com', type: ActivityType.Watching }] }
});

client.once('ready', () => {
    console.log('Jexactyl Online... Preparing for World Domination!');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    require('./validation.js')(message);
});

client.login(process.env.TOKEN);
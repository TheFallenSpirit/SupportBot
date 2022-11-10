const { default: axios } = require("axios");
const { Message, Attachment } = require("discord.js");
const { read } = require("jimp");
const { recognize } = require("tesseract.js");
const responses = require("./responses");

/**
 * @param {Message} message 
 */
module.exports = async (message) => {
    let text = message.content;
    if (message.content.startsWith('https://bin.ptdl.co')) {
        message.react('👀');
        text = await parseUrl(message);
    };
    if (message.attachments.size > 0) {
        message.react('👀');
        text = await parseImage(message.attachments.first());
        console.log(text);
    };
    let index = responses.findIndex((r) => text.toLowerCase().match(r.key));
    if (index == -1) return;
    message.reply({ content: responses[index].response });
};

/**
 * @param {Attachment} image
 * @return {Promise<string>}
 */
async function parseImage(image) {
    return new Promise(async (resolve, reject) => {
        const date = Date.now();
        const img = await read(image.url);
        await img.contrast(-0.2).write(`${__dirname}/cache/img-${date}.png`);
        await recognize(`${__dirname}/cache/img-${date}.png`, 'eng').then(({ data: { text } }) => resolve(text)).catch(reject);
    });
};

/**
 * @param {Message} message
 * @return {Promise<string>}
 */
async function parseUrl(message) {
    return new Promise(async (resolve, reject) => {
        const response = await axios.get(message.content).catch(reject);
        if (typeof response.data === 'string') resolve(response.data); else reject(new Error('Content type error.'));
    });
};
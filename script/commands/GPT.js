module.exports.config = {
  name: "GPT",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "zihad - 🥀",
  description: "Generates AI-generated text based on input.",
  commandCategory: "😎 AI ✅",
  usages: "[text]",
  cooldowns: 0
};

module.exports.run = async function({ api, event, args }) {
  const axios = require('axios');
  if (this.config.credits !== "zihad - 🥀") { 
    return api.sendMessage(`Please change the credits.`, event.threadID, event.messageID);
  }
  let text = args.join(" ");
  if (!text) return api.sendMessage("Missing input.", event.threadID, event.messageID);

  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${text}`,
    temperature: 1,
    max_tokens: 1240,
  });
  console.log(completion.data.choices[0].text);
  api.sendMessage(`Searching answer for "${text}"...`, event.threadID, (e, info) => {
    setTimeout(() => {
      api.sendMessage(`${completion.data.choices[0].text}`, event.threadID, event.messageID);
    }, 100)
  }, event.messageID)
}

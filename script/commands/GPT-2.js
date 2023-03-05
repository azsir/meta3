module.exports.config = {
    name: "ai2",
    version: "2.0.8",
    hasPermssion: 0,
    credits: "Zihad - 🥀",
    description: "An AI editor that can answer any question",
    commandCategory: "😎 AI ✅",
    usages: "[Ask anything]",
    cooldowns: 5,
    dependencies: {
    "openai": ""
    }
    };
module.exports.run = async function({ api, event, args }) {

  
const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
                                apiKey: "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",
                            });
                            const openai = new OpenAIApi(configuration);
  let data = args.join(" ");
                            if (data.length < 2) {
                                api.sendMessage("AI i can help you to do your homework, speech and even essay.", event.threadID);
                            } else {
                                try {
                                    const completion = await openai.createCompletion({
                                        model: "text-davinci-003",
                                        prompt: args.join(" "),
                                        temperature: 0,
                                        max_tokens: 2000,
                                        top_p: 1,
                                        frequency_penalty: 0.0,
                                        presence_penalty: 0.0,
                                    });
                                    api.sendMessage(completion.data.choices[0].text, event.threadID, event.messageID);
                                }
                                catch (error) {
                                    if (error.response) {
                                        console.log(error.response.status);
                                        console.log(error.response.data);
                                    } else {
                                        console.log(error.message);
                                        api.sendMessage(error.message, event.threadID);
                                    }
                                }
                            }
                        }
const { OpenAI } = require('openai');
require('dotenv').config();
const { contentString } = require('./chatgpt-prompts/contentString.js')
const { changeStory } = require('./chatgpt-prompts/changeStory.js');


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
  });


async function generateStory(callback, res, inputValue, prevInput = null) {
    //if contains previous input, then is is from the "rechange-story" route, so change the API contents accoridngly
    if (prevInput){
        try {
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: changeStory(prevInput) },
                    { role: "user", content: inputValue }
                ],
                model: "gpt-3.5-turbo",
            });
            const storyReply = completion.choices[0].message.content;
            callback(null, storyReply,res);
        } catch (error) {
            callback(error, null,res);
        }
    }else{
        
        try {
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: contentString },
                    { role: "user", content: inputValue }
                ],
                model: "gpt-3.5-turbo",
            });
            const storyReply = completion.choices[0].message.content;
            callback(null, storyReply, res);
        } catch (error) {
            callback(error, null, res);
        }
    }
    
}

module.exports = {generateStory};

const { OpenAI } = require('openai');
const { promptToDialect } = require('./chatgpt-prompts/promptToDialect');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
  });

async function generateDialect(finalPrompt){
    try{
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: promptToDialect(finalPrompt) },
                { role: "user", content: finalPrompt }
            ],
            model: "gpt-3.5-turbo",
        });
        const finalDialect = completion.choices[0].message.content;
        return finalDialect
    }catch (error) {
        return error
    }
  }

  module.exports = {generateDialect};
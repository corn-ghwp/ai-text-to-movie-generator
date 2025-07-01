require("dotenv").config();
const fs        = require("node:fs/promises");
const path      = require("node:path");
const axios     = require("axios");
const Replicate = require("replicate");

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

async function download(url, outfile) {
  const { data } = await axios.get(url, { responseType: "arraybuffer" });
  await fs.writeFile(outfile, data);
}

async function generateVideoAudio(promptText, index) {
  const videoUrl = await replicate.run("bytedance/seedance-1-pro", {
    input: { prompt: promptText }
  });
  await download(videoUrl, path.join("media", `${index}.mp4`));

  const mp3Url = await replicate.run("minimax/speech-02-hd", {
    input: {
      text: promptText,
      emotion: "auto",
      voice_id: "Friendly_Person",
      language_boost: "English",
      english_normalization: true,
      speed: 1
    }
  });
  await download(mp3Url, path.join("media", `${index}.mp3`));
  return (`Generation for index ${index} done`)
}

async function textToVideoGeneration(dialectCollections) {
  console.log("inside generator");
  await fs.mkdir("media", { recursive: true });          
  const tasks = dialectCollections.map((text, idx) =>{
    console.log("Generating for index", idx, "text:", text)
    return generateVideoAudio(text, idx)
});

  await Promise.all(tasks);
  console.log("All done");
}

module.exports = {textToVideoGeneration };
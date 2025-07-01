// Core Node.js modules
const fs = require('fs');
const path = require('path');

// Third-party modules
const express = require('express');
const cors = require('cors');

// Local modules
const { generateStory } = require('./module-functions/generateStory.js');
const { generateStoryCallback } = require('./module-functions/callbacks/generateStoryCallback.js')
const { getDialect } = require('./module-functions/getDialect.js');
const {processMovie} = require('./module-functions/processMovie.js')
const { handleStreaming } = require('./module-functions/handleStreaming.js')


// Initialize Express app
const app = express();
const port = 3000;



app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve static files from the 'public' folder

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.post('/generate-story', (req, res) => {
    const inputPromptText = req.body.input;
    generateStory(generateStoryCallback, res, inputPromptText);
  });

app.post('/rechange-story', (req, res) => {
  const changeInput = req.body.input
  const prevInput = req.body.prevInput
  
  generateStory(generateStoryCallback, res, changeInput, prevInput)
})

app.post('/get-dialect', (req, res) => {
  const finalPrompt = req.body.finalPrompt
  getDialect(finalPrompt,res)
})

app.post('/process-movie', async (req, res) => {
    const dialect = req.body.dialect
    processMovie(dialect,res)
})

app.get('/get-movie', async (req, res) => {
  handleStreaming(req,res)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
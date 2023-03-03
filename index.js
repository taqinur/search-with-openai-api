const express = require('express');
const openai = require('openai');
require('dotenv').config();

// Set up the OpenAI API credentials
openai.apiKey = process.env.APIKEY;

// Set up the Express.js app
const app = express();
const port = process.env.PORT || 3000;

// Set up a route to handle the API request
app.get('/search', (req, res) => {
  const query = req.query.q;
  const prompt = `Search results for ${query}:`;
  const model = 'text-davinci-002';
  const temperature = 0.7;
  const maxTokens = 60;

  openai.Completion.create({
    engine: model,
    prompt: prompt,
    temperature: temperature,
    max_tokens: maxTokens,
  }).then((response) => {
    const generatedText = response.choices[0].text;
    res.send(generatedText);
  }).catch((error) => {
    console.log(error);
    res.status(500).send('Error generating search results');
  });
});

// Set up a route to serve the frontend
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { summarizeText } = require('./llm');
const { validateTextInput } = require('./validate');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Summarizer API is running' });
});

app.post('/api/summarize', validateTextInput, async (req, res) => {
  const text = res.locals.text;

  // 1. Check Configuration
  if (!process.env.OPENAI_API_KEY) {
    console.error("Configuration Error: Missing OPENAI_API_KEY environment variable. Please check your .env file.");
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  // 3. Process the AI Request
  try {
    const result = await summarizeText(text);
    return res.json(result);
  } catch (error) {
    console.error('LLM Processing Error:', error);
    
    // Attempt fallback semantic errors depending on SDK
    if (error.status === 401) {
       return res.status(500).json({ error: 'Invalid LLM API Key.' });
    }
    
    if (error.message === "Model returned malformed JSON") {
       return res.status(500).json({ error: 'Failed to extract structured summary from text.' });
    }

    return res.status(500).json({ error: 'An unexpected error occurred while communicating with the AI service.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server runs on http://localhost:${PORT}`);
});

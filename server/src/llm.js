const OpenAI = require('openai');
const { systemPrompt } = require('./prompt');

// The OpenAI SDK automatically uses process.env.OPENAI_API_KEY
// and process.env.OPENAI_BASE_URL if they are defined in .env
function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
  }
  return new OpenAI();
}

async function summarizeText(text) {
  const openai = getOpenAIClient();

  // process.env.LLM_MODEL allows easy switching between OpenAI and Groq without code changes
  const modelName = process.env.LLM_MODEL || 'gpt-4o-mini';

  const response = await openai.chat.completions.create({
    model: modelName,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Text to analyze:\n${text}` },
    ],
    response_format: { type: "json_object" }, // Groq supports JSON mode for this model
    temperature: 0.2,
  });

  const content = response.choices[0].message.content;
  
  try {
    return JSON.parse(content);
  } catch (parseError) {
    console.error("Failed to parse LLM Output:", content);
    throw new Error("Model returned malformed JSON");
  }
}

module.exports = { summarizeText };


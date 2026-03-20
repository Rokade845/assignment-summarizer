require('dotenv').config();
const { summarizeText } = require('./src/llm');
summarizeText("This is a simple test text to summarize. I hope it works.").then(r => console.log('SUCCESS:', r)).catch(e => { console.error('ERROR TRACE:', e); console.error('HEADERS:', e.headers); });

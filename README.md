<div align="center">
  <h1>🧠 SummaryAI</h1>
  <i>A minimal full-stack application that extracts intelligent summaries, key points, and sentiment from unstructured text.</i>
</div>

---

##  Overview

This project securely separates the client UI from the backend server to protect API keys while seamlessly integrating with **OpenAI** (or compatible SDK providers like Groq). 

It accepts raw text and returns a strictly typed JSON structure containing:
- 📝 A one-sentence summary
- 🎯 Three actionable key points
- 🎭 A sentiment label (`positive`, `neutral`, `negative`)

---

##  Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js, Vite | Fast, minimal UI and state management |
| **Backend** | Node.js, Express.js | Secure API Gateway & Validation |
| **LLM Integration** | `openai` SDK | Industry-standard LLM integration |
| **Security/Config** | `dotenv`, `cors` | Environment secrets and local routing |

---

## Getting Started

### 1. Installation
The project is split into a client and server. Open two separate terminal windows.

**Backend Server (Terminal 1):**
```bash
cd server
npm install
```

**Frontend Client (Terminal 2):**
```bash
cd client
npm install
```

### 2. Environment Configuration
**Why `.env.example`?** Your real `.env` file contains your highly secret `OPENAI_API_KEY` and is intentionally ignored by GitHub (via `.gitignore`). To show reviewers what environment variables are required to run your project without exposing your secrets, we use `.env.example` as a safe, public "blueprint".

Create your actual `.env` file automatically using this blueprint:
```bash
cp server/.env.example server/.env
```
Open `server/.env` and insert your actual API key:
> 💡 **Tip:** If you are using a free OpenAI-compatible provider like Groq, simply uncomment the `OPENAI_BASE_URL` override in the `.env` file!

### 3. Run the App Locally
Start the development servers:

**Start the Backend:**
```bash
cd server
npm start
```
*Runs on `http://localhost:3000`*

**Start the Frontend:**
```bash
cd client
npm run dev
```
*Runs on `http://localhost:5173`*

---

## 🏗 Architectural Decisions & Trade-Offs

### 🔌 API Choice & Flexibility
I utilized the **OpenAI Node.js SDK**. Because OpenAI is the industry standard wrapper, keeping the codebase tied to their SDK allows the backend to be completely provider-agnostic. By simply changing `OPENAI_BASE_URL` in the `.env` file, we can swap between OpenAI, Groq, or OpenRouter without changing a single line of application code.

### ✍️ Prompt Engineering
To guarantee the LLM returns parsable data, the prompt acts as a strict JSON converter. It establishes constraints:
- Enforces an exact schema structure.
- Locks the `sentiment` field exclusively to an enum (`positive | neutral | negative`).
- Explicitly prohibits wrapping the response in Markdown backticks.

### ⚖️ Shortcuts & Future Improvements
Given the constraints of a minimal submission, the following trade-offs were made:
- **Simplified Backend Routing:** All LLM handling exists securely in `llm.js`, but backend routes utilize a single controller (`index.js`). This avoids unnecessary service-layer bloat.
- **No Database/Auth:** Eliminated user authentication to focus strictly on the LLM interaction logic.
- **Improvements with More Time:** I would implement a runtime validation library like `Zod` to strictly type-check the incoming POST payloads and outgoing LLM objects, protecting against unexpected AI hallucinations. Adding file upload parsing (`.pdf`/`.txt`) would also greatly elevate the utility of the tool.

---

## 📸 Example Output

**Raw Input Text:**
> *"Honestly the new interface update is so confusing. I spent 20 minutes trying to find the export button instead of doing my actual work. It used to be right under the file menu, now it's buried in some advanced settings tab. On the bright side, the app loads a little bit faster than before, but overall it's a huge step backward."*

**Structured LLM Output:**
```json
{
  "summary": "A user expresses frustration over a confusing interface update that relocated the export button, despite acknowledging a slight improvement in load speed.",
  "keyPoints": [
    "The new interface update is perceived as highly confusing and unintuitive.",
    "Locating a previously easily accessible export button now takes significantly longer.",
    "Although the app loads faster, the overall experience is considered a regression."
  ],
  "sentiment": "negative"
}
```

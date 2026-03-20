import { useState } from 'react';
import ResultCard from './components/ResultCard';
import './index.css';

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Please enter some text to summarize.');
      return;
    }

    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze text.');
      }

      setResult(data);
    } catch (err) {
      setError(err.message || 'Network error. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Smart Summarizer AI</h1>
        <p className="subtitle">
          Paste unstructured text below. We'll extract a clean summary, 3 key points, and overall sentiment.
        </p>
      </header>

      <main>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your chaotic text here..."
              disabled={loading}
            />
            
            {error && (
              <div className="error-message">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading || !text.trim()}>
              {loading ? (
                <div className="loader">
                  <span></span>
                  <span></span>
                  <span></span>
                  Analyzing...
                </div>
              ) : (
                'Summarize Text'
              )}
            </button>
          </form>
        </div>

        {result && <ResultCard result={result} />}
      </main>
    </div>
  );
}

export default App;

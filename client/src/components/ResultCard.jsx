import React from 'react';

const ResultCard = ({ result }) => {
  if (!result) return null;

  const { summary, keyPoints, sentiment } = result;

  return (
    <div className="card">
      <div className="result-header">
        <h2>Analysis Result</h2>
        <span className={`sentiment-badge ${sentiment}`}>
          {sentiment}
        </span>
      </div>

      <div className="result-section">
        <h3>Summary</h3>
        <p>{summary}</p>
      </div>

      <div className="result-section">
        <h3>Key Points</h3>
        <ul className="key-points-list">
          {keyPoints?.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultCard;

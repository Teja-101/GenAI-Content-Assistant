import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('Blog Post');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(''); // Clear previous result while loading
    try {
      const response = await axios.post('https://genai-backend-3xi3.onrender.com', {
        topic: topic,
        type: contentType
      });
      setResult(response.data.content);
    } catch (error) {
      console.error("Error fetching data", error);
      setResult("⚠️ Error: Could not connect to the backend. Please ensure the server is running.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <div className="glass-card">
        <h1>GenAI Assistant</h1>
        <p className="subtitle">Your AI-powered creative partner for instant content.</p>
        
        <div className="input-group">
          <input 
            type="text" 
            placeholder="What should we write about today?" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          
          <select 
            value={contentType} 
            onChange={(e) => setContentType(e.target.value)}
          >
            <option>Blog Post</option>
            <option>LinkedIn Post</option>
            <option>Twitter Thread</option>
            <option>Email Draft</option>
          </select>
        </div>

        <button 
          className="generate-btn"
          onClick={handleGenerate} 
          disabled={loading || !topic}
        >
          {loading ? (
            <>
              <span className="loader"></span> Generating Magic...
            </>
          ) : (
            'Generate Content'
          )}
        </button>

        {result && (
          <div className="result-area">
            <div className="result-card">
              <h3>Generated Output</h3>
              <p className="result-text">{result}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
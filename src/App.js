import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [subject, setSubject] = useState('maths_literacy'); // Default subject
  const [grade, setGrade] = useState('Grade 1'); // Default grade

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    try {
      // Send user input (message, subject, and grade) to the backend
      const res = await axios.post('http://localhost:5000/chat', {
        message,
        subject,
        grade,
      });

      setResponse(res.data.response);  // Update the response state with AI's response
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Subject-Specific Chatbot</h1>

      <div>
        <label>Select Grade: </label>
        <select onChange={(e) => setGrade(e.target.value)} value={grade}>
          <option value="Grade 1">Grade 1</option>
          <option value="Grade 2">Grade 2</option>
          <option value="Grade 3">Grade 3</option>
          <option value="Grade 4">Grade 4</option>
          <option value="Grade 5">Grade 5</option>
          <option value="Grade 6">Grade 6</option>
          <option value="Grade 7">Grade 7</option>
          <option value="Grade 8">Grade 8</option>
          <option value="Grade 9">Grade 9</option>
          <option value="Grade 10">Grade 10</option>
          <option value="Grade 11">Grade 11</option>
          <option value="Grade 12">Grade 12</option>
        </select>
      </div>

      <div>
        <label>Select Subject: </label>
        <select onChange={(e) => setSubject(e.target.value)} value={subject}>
          <option value="maths_literacy">Maths Literacy</option>
          <option value="life_skills">Life Skills</option>
        </select>
      </div>

      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a question..."
        />
      </div>

      <button onClick={handleSubmit}>Ask</button>

      <div>
        {response && (
          <div>
            <h3>AI Response:</h3>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('it_general');
  const [grade, setGrade] = useState('8');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSubjectOptions = () => {
    const gradeNum = parseInt(grade);
    if (gradeNum >= 10) {
      return [
        { value: 'it_general', label: 'Information Technology (General)' },
        { value: 'delphi', label: 'Delphi Programming' },
        { value: 'java', label: 'Java Programming' },
      ];
    }
    return [{ value: 'it_general', label: 'Information Technology' }];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setIsLoading(true);

    setChatHistory(prev => [...prev, { type: 'user', text: userMessage }]);

    try {
      const botResponse = generateResponse(userMessage, subject, grade);

      setTimeout(() => {
        setChatHistory(prev => [...prev, { type: 'bot', text: botResponse }]);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const generateResponse = (question, subj, gradeLevel) => {
    const responses = {
      it_general: [
        "Great question! Information Technology is all about using computers and software to solve real-world problems. What specific area interests you?",
        "That's an interesting topic! In IT, we learn about hardware, software, networks, and programming. Let me help you understand this better!",
        "Awesome! Learning IT opens up so many career opportunities. Let's explore this together!",
      ],
      delphi: [
        "Delphi is a fantastic programming language! It uses Object Pascal and is great for building Windows applications. What would you like to know about it?",
        "Nice choice! Delphi makes it easy to create visual applications with drag-and-drop components. Let's dive into it!",
        "Delphi programming is fun! You can create everything from simple calculators to complex database applications. What interests you most?",
      ],
      java: [
        "Java is one of the most popular programming languages in the world! It's platform-independent, which means your code can run anywhere. What would you like to learn?",
        "Excellent! Java is object-oriented and used for everything from mobile apps to enterprise systems. Let's explore it together!",
        "Java is amazing! With it, you can build Android apps, web applications, and so much more. What specific topic interests you?",
      ],
    };

    const subjectResponses = responses[subj] || responses.it_general;
    return subjectResponses[Math.floor(Math.random() * subjectResponses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <div className="header-icon">💻</div>
        <div className="header-content">
          <h1>IT Learning Buddy</h1>
          <p className="subtitle">Your friendly guide to Information Technology, Delphi & Java!</p>
        </div>
      </div>

      <div className="controls">
        <div className="control-group">
          <label>Grade Level:</label>
          <select
            onChange={(e) => {
              setGrade(e.target.value);
              if (parseInt(e.target.value) < 10 && (subject === 'delphi' || subject === 'java')) {
                setSubject('it_general');
              }
            }}
            value={grade}
            className="select-input"
          >
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
        </div>

        <div className="control-group">
          <label>Subject:</label>
          <select
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            className="select-input"
          >
            {getSubjectOptions().map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {chatHistory.length === 0 ? (
            <div className="welcome-message">
              <h2>Welcome to IT Learning Buddy!</h2>
              <p>I'm here to help you learn Information Technology{parseInt(grade) >= 10 ? ', Delphi, and Java programming' : ''}!</p>
              <div className="example-questions">
                <h3>Try asking me:</h3>
                <ul>
                  <li>"What is a computer network?"</li>
                  <li>"How does the internet work?"</li>
                  {parseInt(grade) >= 10 && subject === 'delphi' && (
                    <>
                      <li>"How do I create a button in Delphi?"</li>
                      <li>"What is Object Pascal?"</li>
                    </>
                  )}
                  {parseInt(grade) >= 10 && subject === 'java' && (
                    <>
                      <li>"What is a Java class?"</li>
                      <li>"How do I write a loop in Java?"</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            chatHistory.map((msg, index) => (
              <div key={index} className={`message ${msg.type}-message`}>
                <div className="message-icon">
                  {msg.type === 'user' ? '👤' : '🤖'}
                </div>
                <div className="message-content">
                  <p>{msg.text}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="message bot-message">
              <div className="message-icon">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="input-container">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about IT, Delphi, or Java..."
          rows="3"
        />
        <button onClick={handleSubmit} disabled={isLoading || !message.trim()}>
          {isLoading ? 'Thinking...' : 'Send'} 📤
        </button>
      </div>
    </div>
  );
};

export default App;

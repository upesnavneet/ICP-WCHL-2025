import { useState, useRef } from 'react';
import axios from 'axios';
import './OpenAIQuery.css';
import Darkveil from '../../DarkVeil/DarkVeil/DarkVeil';
import TextType from "../../TypeText/TextType/TextType";

const OpenAIQuery = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingKey, setTypingKey] = useState(0);
  const [showTyping, setShowTyping] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const systemMessage = {
      role: 'system',
      content: `You are an expert crypto assistant. Your creator is the UPES ACM Team members which include Navneet, Stuti, Niharika, Daksh and Yogesh.
      You help users understand smart contracts, tokenomics, DeFi, blockchain concepts, and trends in simple terms. 
      You answer clearly, concisely, and truthfully.`
    };

    const userMessage = { role: 'user', content: prompt, justAdded: false };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setPrompt('');
    setTypingKey(prev => prev + 1);
    setShowTyping(true);
    setIsLoading(true);

    const chatHistory = [systemMessage, ...updatedMessages];

    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

if (!apiKey) {
  console.error("❌ API Key not found");
}

      const res = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-3.5-turbo',
          messages: chatHistory,
        },
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
          },
        }
      );

      const aiMessage = {
        ...res.data.choices[0].message,
        justAdded: true, // Animate this one
      };

      // Reset justAdded on all previous messages, then add the new one
      setMessages((prev) =>
        prev.map((msg) => ({ ...msg, justAdded: false })).concat(aiMessage)
      );

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        role: 'assistant',
        content: '❌ Error occurred while fetching response.',
        justAdded: true,
      };
      setMessages((prev) =>
        prev.map((msg) => ({ ...msg, justAdded: false })).concat(errorMessage)
      );
      setIsLoading(false);
    }
  };

  const handleStop = () => {
    setShowTyping(false);
  };

  return (
    <>
      <div className="background">
        <Darkveil />
      </div>

      <div className="chat-container">
        <h2 className="title">BlockBot</h2>

        <div className="info-box">
  <h3>What is BlockBot?</h3>
  <p>
    BlockBot is your crypto-savvy assistant designed to help you understand
    complex blockchain topics like smart contracts, tokenomics, DeFi strategies,
    and more. Whether you're a beginner or enthusiast, just type in your question
    and get accurate, concise insights explained in simple terms.
  </p>
</div>

        <div className="chat-wrapper">
          {/* Left: Messages */}
          <div className="response-column">
            <div className="history-thread">
              {messages.map((msg, index) => {
                const isAssistant = msg.role === 'assistant';
                const shouldAnimate = isAssistant && msg.justAdded;

                return (
                  <div key={index} className={`message ${msg.role}`}>
                    {msg.role === 'user' ? (
                      <p><strong>You:</strong> {msg.content}</p>
                    ) : (
                      <div className="response-box">
                        <div className="response-header">
                          <h4 className="response-title">Response</h4>
                          {shouldAnimate && (
                            <button onClick={handleStop} className="stop-button">Stop</button>
                          )}
                        </div>
                        <div>
                          {shouldAnimate && showTyping ? (
                            <TextType
                              key={typingKey}
                              text={msg.content}
                              typingSpeed={50}
                              pauseDuration={1500}
                              showCursor={true}
                              cursorCharacter="|"
                            />
                          ) : (
                             <p> msg.content </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Input Box */}
          <div className="input-column">
            <form onSubmit={handleSubmit} className="form">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask anything about a crypto token or project..."
                className="input"
                rows={2}
              />
              <button type="submit" className="button" disabled={isLoading}>
                {isLoading ? 'Thinking...' : 'Ask'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenAIQuery;

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Maximize2, Minimize2, ChevronDown, MessageSquare, Sparkles } from 'lucide-react';

// Sample responses for different categories
const SAMPLE_RESPONSES = {
  crew: [
    "Crew member John Doe has 3 flights scheduled for next week.",
    "There are 5 crew members currently on standby at JFK airport.",
    "Flight SQ321 has a full crew complement of 8 members assigned.",
    "According to regulations, this route requires 2 pilots and 5 cabin crew members.",
    "The crew utilization rate this month is 78%, which is 5% higher than last month."
  ],
  flight: [
    "Flight BA456 is currently scheduled to depart on time at 14:30 UTC.",
    "There are 2 aircraft available for reassignment at LAX terminal.",
    "The average turnaround time for A320 aircraft has improved by 12 minutes this month.",
    "Weather conditions at destination airport are favorable with clear skies predicted.",
    "Flight EK789 is expected to arrive 15 minutes ahead of schedule."
  ],
  maintenance: [
    "Aircraft N12345 is due for scheduled maintenance in 3 days.",
    "The maintenance team has completed all checks for today's departures.",
    "Aircraft G-ABCD requires an unexpected component replacement, estimated time 4 hours.",
    "Maintenance efficiency has increased by 12% following the new procedural implementation.",
    "There are 3 maintenance crews available for emergency assignment."
  ],
  operations: [
    "All ground operations at terminal 2 are proceeding normally.",
    "There is a 20-minute delay in baggage handling at terminal 3 due to staff shortage.",
    "Fuel prices have decreased by 2.3% this week, positively affecting operational costs.",
    "Gate allocations have been optimized for the afternoon rush, reducing congestion by 15%.",
    "Current runway utilization is at 85% capacity with no delays reported."
  ]
};

const SUGGESTIONS = [
  "How many crew members are available tomorrow?",
  "What's the status of flight BA123?",
  "When is the next maintenance scheduled for aircraft N12345?",
  "Show me the current ground operations status"
];

// CSS Styles for the chatbot
const styles = {
  chatbotButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#4F46E5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(79, 70, 229, 0.5)',
    border: 'none',
    cursor: 'pointer',
    zIndex: 1000
  },
  chatContainer: {
    position: 'fixed',
    bottom: '90px',
    right: '20px',
    width: '380px',
    height: '550px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 1000
  },
  chatHeader: {
    backgroundColor: '#4F46E5',
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white'
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  headerIcons: {
    display: 'flex',
    gap: '10px'
  },
  headerButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    padding: '5px'
  },
  botIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '8px',
    borderRadius: '50%'
  },
  messagesContainer: {
    flex: 1,
    padding: '15px',
    overflowY: 'auto',
    backgroundColor: '#f9fafb',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  messageRow: {
    display: 'flex',
    gap: '10px',
    maxWidth: '90%'
  },
  botMessage: {
    alignSelf: 'flex-start'
  },
  userMessage: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse'
  },
  messageBubble: {
    padding: '12px 15px',
    borderRadius: '18px',
    fontSize: '14px',
    maxWidth: '100%'
  },
  botBubble: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    color: '#374151',
    borderTopLeftRadius: '4px'
  },
  userBubble: {
    backgroundColor: '#4F46E5',
    color: 'white',
    borderTopRightRadius: '4px'
  },
  inputContainer: {
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderTop: '1px solid #e5e7eb'
  },
  textarea: {
    flex: 1,
    border: '1px solid #d1d5db',
    borderRadius: '18px',
    padding: '12px 15px',
    fontSize: '14px',
    resize: 'none',
    outline: 'none',
    minHeight: '45px',
    maxHeight: '120px'
  },
  sendButton: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: '#4F46E5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer'
  },
  suggestionsContainer: {
    padding: '10px 15px',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb'
  },
  suggestionsTitle: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: '10px'
  },
  suggestionChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  suggestionChip: {
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    padding: '8px 12px',
    fontSize: '12px',
    color: '#4F46E5',
    cursor: 'pointer'
  },
  minimizedChat: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#4F46E5',
    borderRadius: '24px',
    padding: '10px 18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)',
    cursor: 'pointer',
    width: '180px',
    zIndex: 1000,
    color: 'white'
  },
  timestamp: {
    fontSize: '10px',
    color: '#9ca3af',
    marginTop: '5px',
    textAlign: 'right'
  }
};

function AirOpsAIBot() {
  // Set up state
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { 
      role: 'bot', 
      content: 'Hello! I\'m AirOps AI. How can I assist you with crew management, flight operations, or maintenance today?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Generate a response based on user message
  const generateResponse = (userMessage) => {
    setIsTyping(true);
    
    // Determine which category the message belongs to
    let responseCategory = 'operations'; // default
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('crew') || lowerCaseMessage.includes('staff')) {
      responseCategory = 'crew';
    } else if (lowerCaseMessage.includes('flight') || lowerCaseMessage.includes('aircraft')) {
      responseCategory = 'flight';
    } else if (lowerCaseMessage.includes('maintenance') || lowerCaseMessage.includes('repair')) {
      responseCategory = 'maintenance';
    }
    
    // Get a random response from the appropriate category
    const responses = SAMPLE_RESPONSES[responseCategory];
    const randomIndex = Math.floor(Math.random() * responses.length);
    
    // Simulate typing delay
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        { 
          role: 'bot', 
          content: responses[randomIndex],
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  // Send a message
  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    const newUserMessage = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, newUserMessage]);
    setMessage('');
    
    generateResponse(message);
  };

  // Handle Enter key press to send message
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    const newUserMessage = {
      role: 'user',
      content: suggestion,
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, newUserMessage]);
    generateResponse(suggestion);
  };

  // Scroll to bottom when chat history updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Open button when chat is closed
  const renderOpenButton = () => {
    return React.createElement('button', {
      style: styles.chatbotButton,
      onClick: () => setIsOpen(true)
    }, React.createElement(MessageSquare, { 
      size: 24,
      color: 'white'
    }));
  };

  // Minimized chat bar
  const renderMinimizedChat = () => {
    return React.createElement('div', {
      style: styles.minimizedChat,
      onClick: () => setIsMinimized(false)
    }, [
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: '10px' }
      }, [
        React.createElement('div', { style: styles.botIcon }, 
          React.createElement(Sparkles, { size: 20, color: 'white' })
        ),
        React.createElement('span', null, 'AirOps AI')
      ]),
      React.createElement(Maximize2, { size: 16, color: 'white' })
    ]);
  };

  // Full chat interface
  const renderChatInterface = () => {
    return React.createElement('div', {
      style: styles.chatContainer
    }, [
      // Header
      React.createElement('div', { style: styles.chatHeader }, [
        React.createElement('div', { style: styles.headerTitle }, [
          React.createElement('div', { style: styles.botIcon },
            React.createElement(Sparkles, { size: 20, color: 'white' })
          ),
          React.createElement('div', null, [
            React.createElement('div', null, 'AirOps AI'),
            React.createElement('div', { style: { fontSize: '12px', opacity: 0.8 } }, 'AI-powered assistant')
          ])
        ]),
        React.createElement('div', { style: styles.headerIcons }, [
          React.createElement('button', { 
            style: styles.headerButton,
            onClick: () => setIsMinimized(true)
          }, React.createElement(Minimize2, { size: 16 })),
          React.createElement('button', { 
            style: styles.headerButton,
            onClick: () => setIsOpen(false)
          }, React.createElement(X, { size: 16 }))
        ])
      ]),
      
      // Messages Container
      React.createElement('div', { style: styles.messagesContainer }, [
        // Chat Messages
        ...chatHistory.map((msg, index) => {
          return React.createElement('div', {
            key: index,
            style: {
              ...styles.messageRow,
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
            }
          }, [
            msg.role === 'bot' && React.createElement('div', { style: styles.botIcon },
              React.createElement(Sparkles, { size: 14, color: 'white' })
            ),
            React.createElement('div', {
              style: {
                ...styles.messageBubble,
                ...(msg.role === 'user' ? styles.userBubble : styles.botBubble)
              }
            }, [
              React.createElement('div', null, msg.content),
              React.createElement('div', { style: styles.timestamp }, formatTime(msg.timestamp))
            ])
          ]);
        }),
        
        // Typing indicator
        isTyping && React.createElement('div', {
          style: {
            ...styles.messageRow,
            alignSelf: 'flex-start'
          }
        }, [
          React.createElement('div', { style: styles.botIcon },
            React.createElement(Sparkles, { size: 14, color: 'white' })
          ),
          React.createElement('div', {
            style: {
              ...styles.messageBubble,
              ...styles.botBubble,
              display: 'flex',
              gap: '4px'
            }
          }, [
            React.createElement('div', { 
              style: { 
                width: '8px', 
                height: '8px', 
                backgroundColor: '#d1d5db',
                borderRadius: '50%',
                animation: 'typing 1s infinite ease-in-out'
              } 
            }),
            React.createElement('div', { 
              style: { 
                width: '8px', 
                height: '8px', 
                backgroundColor: '#d1d5db',
                borderRadius: '50%',
                animation: 'typing 1s infinite ease-in-out 0.2s'
              } 
            }),
            React.createElement('div', { 
              style: { 
                width: '8px', 
                height: '8px', 
                backgroundColor: '#d1d5db',
                borderRadius: '50%',
                animation: 'typing 1s infinite ease-in-out 0.4s'
              } 
            })
          ])
        ]),
        
        React.createElement('div', { ref: messagesEndRef })
      ]),
      
      // Suggestions
      React.createElement('div', { style: styles.suggestionsContainer }, [
        React.createElement('div', { style: styles.suggestionsTitle }, 'Quick Questions'),
        React.createElement('div', { style: styles.suggestionChips }, 
          SUGGESTIONS.map((suggestion, index) => 
            React.createElement('button', {
              key: index,
              style: styles.suggestionChip,
              onClick: () => handleSuggestionClick(suggestion)
            }, suggestion)
          )
        )
      ]),
      
      // Input Area
      React.createElement('div', { style: styles.inputContainer }, [
        React.createElement('textarea', {
          style: styles.textarea,
          value: message,
          onChange: (e) => setMessage(e.target.value),
          onKeyDown: handleKeyDown,
          placeholder: 'Type your question here...',
          rows: 1
        }),
        React.createElement('button', {
          style: {
            ...styles.sendButton,
            opacity: message.trim() === '' ? 0.5 : 1,
            cursor: message.trim() === '' ? 'not-allowed' : 'pointer'
          },
          onClick: handleSendMessage,
          disabled: message.trim() === ''
        }, React.createElement(Send, { size: 18, color: 'white' }))
      ])
    ]);
  };

  // Main component render
  return React.createElement(React.Fragment, null, [
    !isOpen && !isMinimized && renderOpenButton(),
    isMinimized && renderMinimizedChat(),
    isOpen && !isMinimized && renderChatInterface(),
    
    // Add the CSS for the animation
    React.createElement('style', null, `
      @keyframes typing {
        0%, 60%, 100% {
          transform: translateY(0);
          opacity: 0.6;
        }
        30% {
          transform: translateY(-4px);
          opacity: 1;
        }
      }
    `)
  ]);
}

export default AirOpsAIBot;
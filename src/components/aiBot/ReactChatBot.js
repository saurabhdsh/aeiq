import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Maximize2, Minimize2, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

// Sample responses for different categories
const SAMPLE_RESPONSES = {
  greetings: [
    "Hello! How can I assist you with AirOps today?",
    "Hi there! What information do you need about flights or operations?",
    "Greetings! I'm ready to help with any airline operations queries.",
    "Hello! I'm your AirOps assistant. How may I help you today?",
    "Hi! I'm here to provide information about flights, crew, and operations. What do you need?"
  ],
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
  ],
  terminal: [
    "Terminal 2 currently has 12 gates available for operations, with 8 gates occupied.",
    "Gate T2-A4 is currently under maintenance and will be back in service by 18:00 UTC.",
    "Terminal 1 has 15 gates with 3 dedicated to international flights.",
    "Terminal 3 is operating at 92% capacity with 18 of 20 gates in active use.",
    "Gates T2-B1 through T2-B6 are allocated for domestic flights only.",
    "Terminal 2 has 7 gates available for immediate reassignment if needed.",
    "We're experiencing high traffic at Terminal 4 with all 16 gates occupied until 15:00.",
    "The new Terminal 5 expansion added 8 additional gates, bringing the total to 24."
  ],
  gate_crew: [
    "Gate 41 currently has 4 crew members assigned for the next departure.",
    "Ground crew at Gate 23 is fully staffed with 6 personnel.",
    "Gate 15 has 3 cabin crew members and 2 ground staff preparing for boarding.",
    "There are 5 crew members available at Gate 32 for the upcoming flight.",
    "Gate 41 requires 2 additional crew members for optimal staffing.",
    "All required crew members are present at Gate 19 for on-time departure.",
    "Gate 41 crew will be rotated in 45 minutes with the incoming shift.",
    "Cabin crew briefing is in progress at Gate 7 for flight DL289."
  ],
  delays: [
    "Today we have 3 delayed flights: BA205 (45 min), UA189 (30 min), and LH492 (15 min).",
    "No significant delays reported for today's operations.",
    "There's a 30-minute delay for all departures from Terminal 3 due to weather conditions.",
    "Flight AA876 is delayed by 1 hour due to late arrival of incoming aircraft.",
    "Weather conditions have caused minor delays (10-15 minutes) for 5 flights today.",
    "Maintenance issue has delayed flight EK432 by 50 minutes.",
    "Air traffic congestion has resulted in 15-20 minute delays for several European flights.",
    "All flights are currently operating on schedule with no significant delays."
  ]
};

const SUGGESTIONS = [
  "How many crew members are available tomorrow?",
  "What's the status of flight BA123?",
  "When is the next maintenance scheduled for aircraft N12345?",
  "Show me the current ground operations status",
  "How many gates are available at Terminal 2?",
  "What's the current capacity of Terminal 3?",
  "Are there any gates under maintenance?",
  "Crew availability at Gate 41?",
  "Any flights delayed today?"
];

// Updated color constants with transparency
const COLORS = {
  primary: '#10B981', // Light green primary color
  primaryLight: 'rgba(16, 185, 129, 0.1)', // Transparent light green for backgrounds
  primaryMedium: 'rgba(16, 185, 129, 0.5)', // Medium transparent green
  secondaryBg: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
  neutralBg: 'rgba(249, 250, 251, 0.7)', // Semi-transparent light gray
  border: 'rgba(229, 231, 235, 0.5)', // Semi-transparent border
  glassEffect: 'rgba(255, 255, 255, 0.4)', // Glass-like effect background
  darkText: '#374151', // Dark text
  lightText: '#FFFFFF' // White text on dark backgrounds
};

// Update styles for chatContainer and other components to be transparent
const styles = {
  chatbotButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: COLORS.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
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
    backgroundColor: COLORS.glassEffect,
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 1000,
    border: `1px solid ${COLORS.border}`,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  },
  chatHeader: {
    backgroundColor: COLORS.primary,
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    backgroundImage: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryMedium} 100%)`
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: '8px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  messagesContainer: {
    flex: 1,
    padding: '15px',
    overflowY: 'auto',
    backgroundColor: 'transparent',
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
    backgroundColor: COLORS.secondaryBg,
    border: `1px solid ${COLORS.border}`,
    color: COLORS.darkText,
    borderTopLeftRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)'
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    color: 'white',
    borderTopRightRadius: '4px',
    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)'
  },
  inputContainer: {
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderTop: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.glassEffect,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  },
  textarea: {
    flex: 1,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '18px',
    padding: '12px 15px',
    fontSize: '14px',
    resize: 'none',
    outline: 'none',
    minHeight: '45px',
    maxHeight: '120px',
    backgroundColor: COLORS.secondaryBg,
    transition: 'border-color 0.2s ease',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)'
  },
  sendButton: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: COLORS.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)'
  },
  suggestionsContainer: {
    padding: '10px 15px',
    borderTop: `1px solid ${COLORS.border}`,
    backgroundColor: COLORS.glassEffect,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  },
  suggestionsTitle: {
    fontSize: '12px',
    fontWeight: '500',
    color: COLORS.darkText,
    marginBottom: '10px'
  },
  suggestionChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  suggestionChip: {
    backgroundColor: COLORS.secondaryBg,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '16px',
    padding: '8px 12px',
    fontSize: '12px',
    color: COLORS.primary,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)'
  },
  minimizedChat: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: COLORS.primary,
    backgroundImage: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryMedium} 100%)`,
    borderRadius: '24px',
    padding: '10px 18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
    cursor: 'pointer',
    width: '180px',
    zIndex: 1000,
    color: 'white'
  },
  timestamp: {
    fontSize: '10px',
    color: 'rgba(55, 65, 81, 0.5)',
    marginTop: '5px',
    textAlign: 'right'
  },
  typingDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#D1D5DB',
    borderRadius: '50%',
    display: 'inline-block',
    margin: '0 2px'
  }
};

function ReactChatBot() {
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Generate a response based on user message
  const generateResponse = (userMessage) => {
    setIsTyping(true);
    
    // Determine which category the message belongs to
    let responseCategory = 'operations'; // default
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Check for greetings first
    const greetingWords = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy'];
    if (greetingWords.some(word => lowerCaseMessage.includes(word)) || lowerCaseMessage.trim().length < 5) {
      handleAnimatedTyping([
        'Processing your message...',
        SAMPLE_RESPONSES.greetings[Math.floor(Math.random() * SAMPLE_RESPONSES.greetings.length)]
      ]);
      return;
    }
    
    if (lowerCaseMessage.includes('crew') && lowerCaseMessage.includes('gate')) {
      responseCategory = 'gate_crew';
    } else if (lowerCaseMessage.includes('delay') || 
      (lowerCaseMessage.includes('flight') && 
      (lowerCaseMessage.includes('late') || lowerCaseMessage.includes('on time') || lowerCaseMessage.includes('delayed')))) {
      responseCategory = 'delays';
    } else if (lowerCaseMessage.includes('crew') || lowerCaseMessage.includes('staff')) {
      responseCategory = 'crew';
    } else if (lowerCaseMessage.includes('flight') || lowerCaseMessage.includes('aircraft') || lowerCaseMessage.includes('plane')) {
      responseCategory = 'flight';
    } else if (lowerCaseMessage.includes('maintenance') || lowerCaseMessage.includes('repair')) {
      responseCategory = 'maintenance';
    } else if (lowerCaseMessage.includes('terminal') || lowerCaseMessage.includes('gate') || lowerCaseMessage.includes('gates')) {
      responseCategory = 'terminal';
    }
    
    // Special case handlers with better typing animation
    if (lowerCaseMessage.includes('how many gates') && lowerCaseMessage.includes('terminal 2')) {
      // Simulate natural typing time with multiple stages
      setTimeout(() => {
        // First show "Checking terminal data..."
        setChatHistory(prev => [
          ...prev,
          {
            role: 'bot',
            content: 'Checking terminal data...',
            timestamp: new Date(),
            isTyping: true
          }
        ]);
        
        // Then update to "Retrieving gate information..."
        setTimeout(() => {
          setChatHistory(prev => {
            const newHistory = [...prev];
            const lastMsg = newHistory[newHistory.length - 1];
            if (lastMsg.isTyping) {
              newHistory[newHistory.length - 1] = {
                ...lastMsg,
                content: 'Retrieving gate information...'
              };
            }
            return newHistory;
          });
          
          // Finally show the complete answer
          setTimeout(() => {
            setChatHistory(prev => {
              const newHistory = [...prev];
              const lastIndex = newHistory.length - 1;
              if (newHistory[lastIndex].isTyping) {
                newHistory[lastIndex] = {
                  role: 'bot',
                  content: "Terminal 2 has a total of 20 gates (T2-A1 through T2-A10 and T2-B1 through T2-B10). Currently, 12 gates are available for operations, with 8 gates occupied.",
                  timestamp: new Date()
                };
              }
              return newHistory;
            });
            setIsTyping(false);
          }, 1200);
        }, 1000);
      }, 700);
      return;
    }
    
    // Handle other special cases with animated typing
    if ((lowerCaseMessage.includes('crew') || lowerCaseMessage.includes('staff')) && lowerCaseMessage.includes('gate 41')) {
      handleAnimatedTyping([
        'Checking gate 41 crew status...',
        'Retrieving crew roster information...',
        "Gate 41 currently has a total of 7 crew members: 2 pilots, 4 cabin crew, and 1 ground staff coordinator. They're preparing for flight AA345 to Chicago, scheduled for departure in 35 minutes. All required crew are present and the pre-flight briefing has been completed."
      ]);
      return;
    }
    
    if ((lowerCaseMessage.includes('delay') || lowerCaseMessage.includes('delayed')) && 
        (lowerCaseMessage.includes('flight') || lowerCaseMessage.includes('today'))) {
      handleAnimatedTyping([
        'Checking flight status...',
        'Retrieving delay information...',
        "Today we have 4 delayed flights:\n• BA205 (45 min delay) - Equipment issue\n• UA189 (30 min delay) - Late arrival of aircraft\n• LH492 (15 min delay) - Weather conditions\n• AC876 (25 min delay) - Crew scheduling\n\nAll other flights are currently operating on schedule. Passengers on affected flights have been notified via SMS and email."
      ]);
      return;
    }
    
    // For all other responses, use the animated typing
    const responses = SAMPLE_RESPONSES[responseCategory];
    const randomIndex = Math.floor(Math.random() * responses.length);
    const finalResponse = responses[randomIndex];
    
    // For general responses, use typing animation with appropriate intermediate steps
    let intermediateMessages = [];
    
    // Choose appropriate intermediate messages based on the category
    if (responseCategory === 'crew') {
      intermediateMessages = ['Checking crew data...', 'Retrieving crew information...'];
    } else if (responseCategory === 'flight') {
      intermediateMessages = ['Checking flight status...', 'Retrieving flight information...'];
    } else if (responseCategory === 'maintenance') {
      intermediateMessages = ['Checking maintenance schedule...', 'Retrieving maintenance data...'];
    } else if (responseCategory === 'terminal') {
      intermediateMessages = ['Checking terminal status...', 'Retrieving terminal information...'];
    } else if (responseCategory === 'gate_crew') {
      intermediateMessages = ['Checking gate status...', 'Retrieving gate crew data...'];
    } else if (responseCategory === 'delays') {
      intermediateMessages = ['Checking flight delays...', 'Retrieving delay information...'];
    } else {
      intermediateMessages = ['Processing your request...', 'Retrieving information...'];
    }
    
    handleAnimatedTyping([...intermediateMessages, finalResponse]);
  };

  // Helper function for animated typing effect
  const handleAnimatedTyping = (messages) => {
    if (!messages || messages.length === 0) return;
    
    // Show first intermediate message
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        {
          role: 'bot',
          content: messages[0],
          timestamp: new Date(),
          isTyping: true
        }
      ]);
      
      // If there are more messages, show them in sequence
      if (messages.length > 1) {
        setTimeout(() => {
          setChatHistory(prev => {
            const newHistory = [...prev];
            const lastMsg = newHistory[newHistory.length - 1];
            if (lastMsg.isTyping) {
              newHistory[newHistory.length - 1] = {
                ...lastMsg,
                content: messages[1]
              };
            }
            return newHistory;
          });
          
          // Show the final message
          if (messages.length > 2) {
            setTimeout(() => {
              setChatHistory(prev => {
                const newHistory = [...prev];
                const lastIndex = newHistory.length - 1;
                if (newHistory[lastIndex].isTyping) {
                  newHistory[lastIndex] = {
                    role: 'bot',
                    content: messages[2],
                    timestamp: new Date()
                  };
                }
                return newHistory;
              });
              setIsTyping(false);
            }, 1200 + Math.floor(messages[2].length / 10) * 100); // Longer delay for longer messages
          }
        }, 1000);
      }
    }, 700);
  }

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

  // Suggestions section
  const renderSuggestions = () => {
    return React.createElement('div', { style: styles.suggestionsContainer }, [
      React.createElement('div', { 
        style: {
          ...styles.suggestionsTitle,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer'
        },
        onClick: () => setShowSuggestions(!showSuggestions)
      }, [
        React.createElement('span', null, 'Quick Questions'),
        React.createElement('button', {
          style: {
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            color: '#4F46E5'
          }
        }, 
          showSuggestions 
            ? React.createElement(ChevronUp, { size: 14 }) 
            : React.createElement(ChevronDown, { size: 14 })
        )
      ]),
      
      // Only show suggestions if showSuggestions is true
      showSuggestions && React.createElement('div', { 
        style: {
          ...styles.suggestionChips,
          animation: 'fadeIn 0.3s ease'
        }
      }, 
        SUGGESTIONS.map((suggestion, index) => 
          React.createElement('button', {
            key: index,
            style: styles.suggestionChip,
            onClick: () => handleSuggestionClick(suggestion)
          }, suggestion)
        )
      )
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
              alignItems: 'center',
              gap: '4px'
            }
          }, [
            React.createElement('div', { 
              style: { 
                ...styles.typingDot,
                animation: 'bounce 1s infinite'
              } 
            }),
            React.createElement('div', { 
              style: { 
                ...styles.typingDot,
                animation: 'bounce 1s infinite 0.2s'
              } 
            }),
            React.createElement('div', { 
              style: { 
                ...styles.typingDot,
                animation: 'bounce 1s infinite 0.4s'
              } 
            })
          ])
        ]),
        
        React.createElement('div', { ref: messagesEndRef })
      ]),
      
      // Suggestions with toggle functionality
      renderSuggestions(),
      
      // Input Area with fixed Send button
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
        }, 
          React.createElement(ArrowRight, { 
            size: 18, 
            color: 'white'
          })
        )
      ])
    ]);
  };

  // Add CSS for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes bounce {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-4px); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Main component render
  return React.createElement(React.Fragment, null, [
    !isOpen && !isMinimized && renderOpenButton(),
    isMinimized && renderMinimizedChat(),
    isOpen && !isMinimized && renderChatInterface()
  ]);
}

export default ReactChatBot; 
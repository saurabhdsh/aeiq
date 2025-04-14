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

// Add flight delay/cancellation scenario data
const FLIGHT_DISRUPTION_DATA = {
  flightData: [
    {
      flightNumber: "BA205",
      origin: "London (LHR)",
      destination: "New York (JFK)",
      scheduledDeparture: "14:30",
      status: "Delayed (2 hours)",
      reason: "Technical issue with navigation system",
      aircraft: "Boeing 777-300ER"
    },
    {
      flightNumber: "UA189",
      origin: "Chicago (ORD)",
      destination: "San Francisco (SFO)", 
      scheduledDeparture: "10:45",
      status: "Cancelled",
      reason: "Crew availability issues",
      aircraft: "Boeing 787-9"
    },
    {
      flightNumber: "LH492",
      origin: "Frankfurt (FRA)",
      destination: "Dubai (DXB)",
      scheduledDeparture: "22:15",
      status: "Delayed (90 mins)",
      reason: "Late arrival of inbound aircraft",
      aircraft: "Airbus A350-900"
    }
  ],
  cascadingImpacts: {
    aircraft: [
      "Aircraft rotation disruption affecting 3 subsequent flights",
      "Maintenance schedule adjustments required",
      "Potential overnight parking issues at destination"
    ],
    crew: [
      "Flight duty time limitations may be exceeded for 2 crew members",
      "Crew connection to flight LH219 at risk",
      "Rest period requirements may not be met for return leg"
    ],
    passengers: [
      "142 passengers with connecting flights affected",
      "Overnight accommodation needed for 86 passengers",
      "Rebooking required for 27 premium passengers"
    ],
    operations: [
      "Gate reassignment required at destination",
      "Ground staff overtime required for late arrival handling",
      "Slot time penalties may apply at congested destination airport"
    ]
  },
  recommendations: {
    immediate: [
      "Swap aircraft with flight BA209 (currently on ground with 3-hour turnaround window)",
      "Deploy standby crew to prevent duty time violations",
      "Proactively rebook affected connecting passengers onto partner airline flights"
    ],
    shortTerm: [
      "Adjust crew rosters to prevent impact on tomorrow's operations",
      "Reallocate ground resources to expedite aircraft turnaround",
      "Prioritize high-value connecting passengers for rebooking"
    ],
    passengerHandling: [
      "Issue meal vouchers for delays exceeding 2 hours",
      "Prepare dedicated customer service desk for affected connecting passengers",
      "Fast-track security and immigration for tight connections"
    ],
    resourceOptimization: [
      "Implement reduced turnaround protocol to recover schedule",
      "Negotiate slot time adjustment with destination airport authority",
      "Optimize catering to reduce ground time"
    ]
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
  const [conversationState, setConversationState] = useState({
    inDisruptionFlow: false,
    currentDisruptionStep: null,
    selectedFlight: null,
    hasAskedForRecommendations: false,
    hasProvidedRecommendations: false
  });
  
  // Add state for recommendation deployment
  const [showDeploymentModal, setShowDeploymentModal] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState({
    phase: 'pending',
    currentStep: 0,
    totalSteps: 5
  });
  
  // Handle recommendation deployment
  const handleDeployRecommendations = () => {
    setShowDeploymentModal(true);
    
    // Track each step of the deployment process
    const stepTimings = [
      { step: 1, delay: 500 },  // Connecting to Sabre CMS
      { step: 2, delay: 1500 }, // Validating crew schedules
      { step: 3, delay: 2500 }, // Updating flight systems
      { step: 4, delay: 3500 }, // Preparing passenger communications
      { step: 5, delay: 5000 }, // Optimizing ground operations
      { step: 6, delay: 6500 }  // Finalizing and notifying teams
    ];
    
    // Simulate deployment process with animations - longer step-by-step sequence
    setDeploymentStatus({
      phase: 'in-progress',
      currentStep: 1,
      totalSteps: stepTimings.length - 1
    });
    
    // Simulate steps progression with appropriate delays
    stepTimings.forEach(({ step, delay }) => {
      setTimeout(() => {
        if (step < stepTimings.length) {
          setDeploymentStatus({
            phase: 'in-progress',
            currentStep: step,
            totalSteps: stepTimings.length - 1
          });
        } else {
          // Final step - complete
          setDeploymentStatus({
            phase: 'complete',
            currentStep: step,
            totalSteps: stepTimings.length - 1
          });
        }
      }, delay);
    });
  };
  
  // Close the deployment modal
  const handleCloseDeploymentModal = () => {
    setShowDeploymentModal(false);
    setDeploymentStatus({
      phase: 'pending',
      currentStep: 0,
      totalSteps: 5
    });
    
    // Add completion message to chat
    setChatHistory(prev => [
      ...prev,
      {
        role: 'bot',
        content: 'Recommendations successfully deployed! All steps have been completed: Sabre CMS has been updated with new crew assignments, flight systems have been synchronized, passenger notifications have been queued, and ground operations have been optimized. Operations team has been notified and all contingency plans are now in effect. Real-time monitoring of this disruption is now active.',
        timestamp: new Date()
      }
    ]);
  };
  
  // Generate a response based on user message
  const generateResponse = (userMessage) => {
    setIsTyping(true);
    
    // Extract potential flight numbers first - we'll use this in multiple places
    const flightMatches = userMessage.match(/[A-Z]{2}\d{3,4}/g);
    let detectedFlight = null;
    
    if (flightMatches && flightMatches.length > 0) {
      // Try to match with our sample data
      detectedFlight = FLIGHT_DISRUPTION_DATA.flightData.find(
        f => f.flightNumber === flightMatches[0]
      );
    }
    
    // Determine which category the message belongs to
    let responseCategory = 'operations'; // default
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Direct flight number entry - prioritize this over other checks
    if (detectedFlight) {
      setConversationState(prev => ({
        ...prev, 
        inDisruptionFlow: true,
        currentDisruptionStep: 'flightIdentified',
        selectedFlight: detectedFlight
      }));
      
      handleAnimatedTyping([
        `Looking up details for flight ${detectedFlight.flightNumber}...`,
        `Flight ${detectedFlight.flightNumber} from ${detectedFlight.origin} to ${detectedFlight.destination} is ${detectedFlight.status} due to: ${detectedFlight.reason}.`,
        `Would you like me to provide recommendations for managing the impacts of this disruption?`
      ]);
      return;
    }
    
    // Check if we're in an active disruption conversation flow
    if (conversationState.inDisruptionFlow) {
      handleDisruptionFlow(lowerCaseMessage);
      return;
    }
    
    // If we've previously exited a disruption flow, ensure all states are reset
    if (conversationState.currentDisruptionStep !== null || conversationState.selectedFlight !== null) {
      setConversationState({
        inDisruptionFlow: false,
        currentDisruptionStep: null,
        selectedFlight: null,
        hasAskedForRecommendations: false,
        hasProvidedRecommendations: false
      });
    }
    
    // Check for greetings first
    const greetingWords = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy'];
    if (greetingWords.some(word => lowerCaseMessage.includes(word)) || lowerCaseMessage.trim().length < 5) {
      handleAnimatedTyping([
        'Processing your message...',
        SAMPLE_RESPONSES.greetings[Math.floor(Math.random() * SAMPLE_RESPONSES.greetings.length)]
      ]);
      return;
    }
    
    // Detect flight delay/cancellation queries
    const disruptionKeywords = ['delay', 'delayed', 'cancel', 'cancelled', 'disruption', 'issue'];
    const flightKeywords = ['flight', 'aircraft', 'plane', 'connection'];
    
    if (disruptionKeywords.some(word => lowerCaseMessage.includes(word)) && 
        flightKeywords.some(word => lowerCaseMessage.includes(word))) {
      
      // General disruption query, offer flight selection
      setConversationState(prev => ({
        ...prev,
        inDisruptionFlow: true,
        currentDisruptionStep: 'selectFlight'
      }));
      
      const flightOptions = FLIGHT_DISRUPTION_DATA.flightData.map(
        f => `${f.flightNumber}: ${f.origin} to ${f.destination} - ${f.status}`
      ).join('\n• ');
      
      handleAnimatedTyping([
        'Checking disrupted flights...',
        'I found several flights with current disruptions. Which one are you inquiring about?',
        `• ${flightOptions}\n\nPlease specify the flight number you're interested in.`
      ]);
      return;
    }
    
    // Continue with other categories...
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

  // Handler for the disruption conversation flow
  const handleDisruptionFlow = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Check for direct flight number entry first
    const flightMatches = userMessage.match(/[A-Z]{2}\d{3,4}/g);
    
    if (flightMatches && flightMatches.length > 0) {
      const selectedFlight = FLIGHT_DISRUPTION_DATA.flightData.find(
        f => f.flightNumber === flightMatches[0]
      );
      
      if (selectedFlight) {
        setConversationState(prev => ({
          ...prev,
          currentDisruptionStep: 'flightIdentified',
          selectedFlight: selectedFlight
        }));
        
        handleAnimatedTyping([
          `Looking up details for flight ${selectedFlight.flightNumber}...`,
          `Flight ${selectedFlight.flightNumber} from ${selectedFlight.origin} to ${selectedFlight.destination} is ${selectedFlight.status} due to: ${selectedFlight.reason}.`,
          `Would you like me to provide recommendations for managing the impacts of this disruption?`
        ]);
        return;
      }
    }
    
    // If no direct flight number match, continue with conversation flow
    switch (conversationState.currentDisruptionStep) {
      case 'selectFlight':
        // Already handled above with the direct flight check
        // This is a fallback if no flight number format was detected
        handleAnimatedTyping([
          'I need a specific flight number to provide detailed information.',
          'Please specify which flight you want information about (e.g., "BA205").'
        ]);
        return;
        
      case 'flightIdentified':
        // User has seen flight info, check if they want recommendations
        const affirmativeWords = ['yes', 'yeah', 'sure', 'okay', 'please', 'recommend', 'help', 'options'];
        const negativeWords = ['no', 'nope', 'later', 'not now', 'don\'t', 'stop'];
        
        if (affirmativeWords.some(word => lowerCaseMessage.includes(word))) {
          setConversationState(prev => ({
            ...prev,
            currentDisruptionStep: 'providingImpacts',
            hasAskedForRecommendations: true
          }));
          
          // Show cascading impacts first
          const { aircraft, crew, passengers, operations } = FLIGHT_DISRUPTION_DATA.cascadingImpacts;
          
          handleAnimatedTyping([
            'Analyzing potential impacts...',
            'Here are the cascading impacts of this disruption:',
            `**Aircraft Impacts:**\n• ${aircraft.join('\n• ')}\n\n**Crew Impacts:**\n• ${crew.join('\n• ')}\n\n**Passenger Impacts:**\n• ${passengers.join('\n• ')}\n\n**Operational Impacts:**\n• ${operations.join('\n• ')}\n\nWould you like to see AI-recommended actions to mitigate these impacts?`
          ]);
          return;
        } else if (negativeWords.some(word => lowerCaseMessage.includes(word))) {
          // User doesn't want recommendations
          setConversationState(prev => ({
            ...prev,
            inDisruptionFlow: false,
            currentDisruptionStep: null
          }));
          
          handleAnimatedTyping([
            'Understood.',
            'Let me know if you need any other information about flights, crew, or operations.'
          ]);
          return;
        } else {
          // Unclear response
          handleAnimatedTyping([
            "I'm not sure if you want recommendations.",
            'Would you like me to provide recommendations for handling this flight disruption? Please answer with yes or no.'
          ]);
          return;
        }
        
      case 'providingImpacts':
        // User has seen impacts, check if they want recommendations
        const wantRecommendations = ['yes', 'yeah', 'sure', 'okay', 'recommend', 'suggestions', 'actions', 'help'].some(
          word => lowerCaseMessage.includes(word)
        );
        
        if (wantRecommendations) {
          setConversationState(prev => ({
            ...prev,
            currentDisruptionStep: 'recommendationsProvided',
            hasProvidedRecommendations: true
          }));
          
          // Provide detailed recommendations
          const { immediate, shortTerm, passengerHandling, resourceOptimization } = FLIGHT_DISRUPTION_DATA.recommendations;
          
          handleAnimatedTyping([
            'Generating AI recommendations...',
            'Computing optimal solutions...',
            `**Immediate Actions:**\n• ${immediate.join('\n• ')}\n\n**Short-term Planning:**\n• ${shortTerm.join('\n• ')}\n\n**Passenger Handling:**\n• ${passengerHandling.join('\n• ')}\n\n**Resource Optimization:**\n• ${resourceOptimization.join('\n• ')}\n\nWould you like me to explain any of these recommendations in more detail?`
          ], true);
          return;
        } else {
          // User doesn't want recommendations
          setConversationState(prev => ({
            ...prev,
            inDisruptionFlow: false,
            currentDisruptionStep: null
          }));
          
          handleAnimatedTyping([
            'Understood.',
            'Is there anything else you would like to know about this flight or other operations?'
          ]);
          return;
        }
        
      case 'recommendationsProvided':
        // After providing recommendations, offer to exit the flow
        setConversationState(prev => ({
          ...prev,
          inDisruptionFlow: false,
          currentDisruptionStep: null
        }));
        
        handleAnimatedTyping([
          'Processing your request...',
          'I hope these recommendations are helpful for managing the flight disruption.',
          'Is there anything else you would like to know about flight operations or other services?'
        ]);
        return;
        
      default:
        // Reset the flow if we reach an unknown state
        setConversationState(prev => ({
          ...prev,
          inDisruptionFlow: false,
          currentDisruptionStep: null
        }));
        
        handleAnimatedTyping([
          'I appear to have lost track of our conversation.',
          'How else can I assist you with flight operations today?'
        ]);
        return;
    }
  };

  // Helper function for animated typing effect
  const handleAnimatedTyping = (messages, includeButton = false) => {
    if (!messages || messages.length === 0) return;
    
    // Show first intermediate message
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        {
          role: 'bot',
          content: messages[0],
          timestamp: new Date(),
          isTyping: true,
          includeDeployButton: includeButton
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
                    timestamp: new Date(),
                    includeDeployButton: includeButton
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
    let suggestionList = [...SUGGESTIONS];
    
    // Add context-specific suggestions based on conversation state
    if (conversationState.inDisruptionFlow) {
      switch (conversationState.currentDisruptionStep) {
        case 'selectFlight':
          suggestionList = ["BA205", "UA189", "LH492"];
          break;
        case 'flightIdentified':
          suggestionList = ["Yes, show me the impacts", "No, thank you"];
          break;
        case 'providingImpacts':
          suggestionList = ["Show recommendations", "No recommendations needed"];
          break;
        case 'recommendationsProvided':
          suggestionList = ["Thank you", "Tell me about another flight", "Check crew impacts"];
          break;
        default:
          // Keep default suggestions
          break;
      }
    }
    
    // Existing render logic with updated suggestions
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
            color: COLORS.primary
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
        suggestionList.slice(0, 4).map((suggestion, index) => 
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
              msg.includeDeployButton && React.createElement('div', {
                style: {
                  marginTop: '15px',
                  display: 'flex',
                  justifyContent: 'center'
                }
              }, 
                React.createElement('button', {
                  onClick: handleDeployRecommendations,
                  style: {
                    backgroundColor: COLORS.primary,
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
                    transition: 'all 0.2s ease'
                  }
                }, [
                  React.createElement('span', null, 'Deploy Recommendations'),
                  React.createElement(ArrowRight, { size: 14, color: 'white' })
                ])
              ),
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
      @keyframes slideUp {
        from { transform: translateY(20px); }
        to { transform: translateY(0); }
      }
      @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
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
    isOpen && !isMinimized && renderChatInterface(),
    
    // Deployment modal
    showDeploymentModal && React.createElement('div', {
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
        animation: 'fadeIn 0.3s ease'
      }
    }, 
      React.createElement('div', {
        style: {
          backgroundColor: 'white',
          borderRadius: '16px',
          width: '450px',
          maxWidth: '90%',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          animation: 'fadeIn 0.3s ease, slideUp 0.3s ease',
          overflow: 'hidden'
        }
      }, [
        // Modal header
        React.createElement('div', {
          style: {
            backgroundColor: COLORS.primary,
            padding: '20px',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundImage: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryMedium} 100%)`
          }
        }, [
          React.createElement('h3', {
            style: {
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }
          }, [
            React.createElement(Sparkles, { size: 20 }),
            'Deploying AI Recommendations'
          ]),
          deploymentStatus.phase === 'complete' && React.createElement('button', {
            onClick: handleCloseDeploymentModal,
            style: {
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer'
            }
          }, React.createElement(X, { size: 20 }))
        ]),
        
        // Modal content
        React.createElement('div', {
          style: {
            padding: '30px'
          }
        }, [
          React.createElement('div', {
            style: {
              textAlign: 'center'
            }
          }, [
            // Status indicator
            deploymentStatus.phase === 'in-progress' ? 
              React.createElement('div', {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '20px'
                }
              }, [
                React.createElement('div', {
                  style: {
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: '3px solid rgba(16, 185, 129, 0.1)',
                    borderTopColor: COLORS.primary,
                    animation: 'rotate 1.5s linear infinite'
                  }
                }),
                React.createElement('div', {
                  style: {
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: COLORS.darkText
                  }
                }, 'Deploying recommendations...'),
                React.createElement('div', {
                  style: {
                    fontSize: '14px',
                    color: '#6b7280',
                    marginTop: '-10px'
                  }
                }, `Step ${deploymentStatus.currentStep} of ${deploymentStatus.totalSteps}`),
                React.createElement('div', {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '12px',
                    marginTop: '15px'
                  }
                }, [
                  // Step 1
                  React.createElement('div', {
                    style: {
                      fontSize: '14px',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      opacity: deploymentStatus.currentStep >= 1 ? 1 : 0.5
                    }
                  }, [
                    React.createElement('div', {
                      style: {
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: deploymentStatus.currentStep >= 1 ? COLORS.primary : '#d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        animation: deploymentStatus.currentStep === 1 ? 'pulse 1s infinite' : 'none'
                      }
                    }, deploymentStatus.currentStep > 1 ? '✓' : '1'),
                    React.createElement('div', {
                      style: {
                        display: 'flex',
                        flexDirection: 'column'
                      }
                    }, [
                      React.createElement('span', {
                        style: {
                          fontWeight: deploymentStatus.currentStep === 1 ? 'bold' : 'normal'
                        }
                      }, 'Connecting to Sabre CMS'),
                      deploymentStatus.currentStep === 1 && React.createElement('span', {
                        style: {
                          fontSize: '12px',
                          color: '#6b7280'
                        }
                      }, 'Establishing secure connection to crew management system...')
                    ])
                  ]),
                  
                  // Step 2
                  React.createElement('div', {
                    style: {
                      fontSize: '14px',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      opacity: deploymentStatus.currentStep >= 2 ? 1 : 0.5
                    }
                  }, [
                    React.createElement('div', {
                      style: {
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: deploymentStatus.currentStep >= 2 ? COLORS.primary : '#d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        animation: deploymentStatus.currentStep === 2 ? 'pulse 1s infinite' : 'none'
                      }
                    }, deploymentStatus.currentStep > 2 ? '✓' : '2'),
                    React.createElement('div', {
                      style: {
                        display: 'flex',
                        flexDirection: 'column'
                      }
                    }, [
                      React.createElement('span', {
                        style: {
                          fontWeight: deploymentStatus.currentStep === 2 ? 'bold' : 'normal'
                        }
                      }, 'Validating Crew Schedules'),
                      deploymentStatus.currentStep === 2 && React.createElement('span', {
                        style: {
                          fontSize: '12px',
                          color: '#6b7280'
                        }
                      }, 'Checking duty time limits and standby availability...')
                    ])
                  ]),
                  
                  // Step 3
                  React.createElement('div', {
                    style: {
                      fontSize: '14px',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      opacity: deploymentStatus.currentStep >= 3 ? 1 : 0.5
                    }
                  }, [
                    React.createElement('div', {
                      style: {
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: deploymentStatus.currentStep >= 3 ? COLORS.primary : '#d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        animation: deploymentStatus.currentStep === 3 ? 'pulse 1s infinite' : 'none'
                      }
                    }, deploymentStatus.currentStep > 3 ? '✓' : '3'),
                    React.createElement('div', {
                      style: {
                        display: 'flex',
                        flexDirection: 'column'
                      }
                    }, [
                      React.createElement('span', {
                        style: {
                          fontWeight: deploymentStatus.currentStep === 3 ? 'bold' : 'normal'
                        }
                      }, 'Updating Flight Systems'),
                      deploymentStatus.currentStep === 3 && React.createElement('span', {
                        style: {
                          fontSize: '12px',
                          color: '#6b7280'
                        }
                      }, 'Synchronizing with aircraft scheduling systems...')
                    ])
                  ]),
                  
                  // Step 4
                  React.createElement('div', {
                    style: {
                      fontSize: '14px',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      opacity: deploymentStatus.currentStep >= 4 ? 1 : 0.5
                    }
                  }, [
                    React.createElement('div', {
                      style: {
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: deploymentStatus.currentStep >= 4 ? COLORS.primary : '#d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        animation: deploymentStatus.currentStep === 4 ? 'pulse 1s infinite' : 'none'
                      }
                    }, deploymentStatus.currentStep > 4 ? '✓' : '4'),
                    React.createElement('div', {
                      style: {
                        display: 'flex',
                        flexDirection: 'column'
                      }
                    }, [
                      React.createElement('span', {
                        style: {
                          fontWeight: deploymentStatus.currentStep === 4 ? 'bold' : 'normal'
                        }
                      }, 'Preparing Passenger Communications'),
                      deploymentStatus.currentStep === 4 && React.createElement('span', {
                        style: {
                          fontSize: '12px',
                          color: '#6b7280'
                        }
                      }, 'Generating customized passenger notifications...')
                    ])
                  ]),
                  
                  // Step 5
                  React.createElement('div', {
                    style: {
                      fontSize: '14px',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      opacity: deploymentStatus.currentStep >= 5 ? 1 : 0.5
                    }
                  }, [
                    React.createElement('div', {
                      style: {
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: deploymentStatus.currentStep >= 5 ? COLORS.primary : '#d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        animation: deploymentStatus.currentStep === 5 ? 'pulse 1s infinite' : 'none'
                      }
                    }, deploymentStatus.currentStep > 5 ? '✓' : '5'),
                    React.createElement('div', {
                      style: {
                        display: 'flex',
                        flexDirection: 'column'
                      }
                    }, [
                      React.createElement('span', {
                        style: {
                          fontWeight: deploymentStatus.currentStep === 5 ? 'bold' : 'normal'
                        }
                      }, 'Optimizing Ground Operations'),
                      deploymentStatus.currentStep === 5 && React.createElement('span', {
                        style: {
                          fontSize: '12px',
                          color: '#6b7280'
                        }
                      }, 'Adjusting gate assignments and ground staffing...')
                    ])
                  ])
                ])
              ])
              :
              React.createElement('div', {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '20px'
                }
              }, [
                React.createElement('div', {
                  style: {
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: COLORS.primary
                  }
                }, React.createElement('div', {
                  style: {
                    fontSize: '40px',
                    fontWeight: 'bold'
                  }
                }, '✓')),
                React.createElement('div', {
                  style: {
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: COLORS.darkText
                  }
                }, 'Deployment Complete!'),
                React.createElement('div', {
                  style: {
                    fontSize: '14px',
                    color: '#6b7280',
                    maxWidth: '90%',
                    margin: '0 auto',
                    textAlign: 'left',
                    lineHeight: '1.5'
                  }
                }, [
                  React.createElement('p', {
                    style: { marginBottom: '12px' }
                  }, 'All recommendations have been successfully deployed through our integrated systems:'),
                  React.createElement('ul', {
                    style: {
                      paddingLeft: '20px',
                      marginBottom: '12px'
                    }
                  }, [
                    React.createElement('li', null, 'Sabre CMS has been updated with crew reassignments'),
                    React.createElement('li', null, 'Flight scheduling system synchronized with new times'),
                    React.createElement('li', null, 'Passenger notifications queued for delivery'),
                    React.createElement('li', null, 'Ground operations optimized for disruption handling'),
                    React.createElement('li', null, 'Operations team notified with detailed action plan')
                  ]),
                  React.createElement('p', null, 'Real-time monitoring of this disruption is now active.')
                ]),
                React.createElement('button', {
                  onClick: handleCloseDeploymentModal,
                  style: {
                    backgroundColor: COLORS.primary,
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    marginTop: '10px',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                  }
                }, 'Close')
              ])
          ])
        ])
      ])
    )
  ]);
}

export default ReactChatBot; 
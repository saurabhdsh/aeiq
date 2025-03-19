import React, { useState, useEffect } from "react";
import { PlaneTakeoff, ArrowRight, AlertTriangle, CheckCircle, Clock, Search, Filter, ChevronLeft, ChevronRight, MapPin, X, Wind, Cloud, Droplets, Thermometer, Zap, Calendar, BarChart, BadgeAlert, Cpu, Play, Pause, RotateCcw, ChevronDown, ChevronUp, Settings, Activity } from "lucide-react";

const getRiskBadge = (risk) => {
  switch (risk.toLowerCase()) {
    case 'high':
      return <span className="risk-badge risk-high">High Risk</span>;
    case 'medium':
      return <span className="risk-badge risk-medium">Medium Risk</span>;
    case 'low':
      return <span className="risk-badge risk-low">Low Risk</span>;
    default:
      return <span className="risk-badge risk-low">Unknown</span>;
  }
};

const getStatusBadge = (status) => {
  switch (status.toLowerCase()) {
    case 'scheduled':
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Scheduled</span>;
    case 'in air':
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">In Air</span>;
    case 'delayed':
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Delayed</span>;
    case 'arrived':
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Arrived</span>;
    case 'cancelled':
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Cancelled</span>;
    default:
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">Unknown</span>;
  }
};

// Format date for display
const formatDateTime = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const FlightsTable = ({ flights }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeView, setActiveView] = useState("all");
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState("");
  const [aiProcessing, setAiProcessing] = useState(false);
  const flightsPerPage = 6;
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [selectedSimulation, setSelectedSimulation] = useState(null);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [simulationResults, setSimulationResults] = useState(null);
  const [expandedScenario, setExpandedScenario] = useState(null);
  const [selectedVariables, setSelectedVariables] = useState({
    weather: "current",
    traffic: "normal",
    fuelPrice: "current",
    crewAvailability: "normal"
  });

  useEffect(() => {
    // Filter flights based on search query
    if (searchQuery.trim() === "") {
      setFilteredFlights(flights);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = flights.filter(
        (flight) =>
          flight.id.toLowerCase().includes(lowercasedQuery) ||
          flight.origin.toLowerCase().includes(lowercasedQuery) ||
          flight.destination.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredFlights(filtered);
    }
  }, [searchQuery, flights]);

  // Filter by active view
  useEffect(() => {
    if (activeView === "all") {
      setFilteredFlights(flights);
    } else if (activeView === "active") {
      setFilteredFlights(flights.filter(flight => flight.status !== "Landed"));
    } else if (activeView === "delayed") {
      setFilteredFlights(flights.filter(flight => flight.status === "Delayed"));
    } else if (activeView === "highRisk") {
      setFilteredFlights(flights.filter(flight => flight.risk === "High"));
    }
  }, [activeView, flights]);

  const getStatusIndicator = (status) => {
    switch (status) {
      case "On Time":
        return (
          <div className="status-indicator status-ontime">
            <CheckCircle size={16} />
            <span>On Time</span>
          </div>
        );
      case "Delayed":
        return (
          <div className="status-indicator status-delayed">
            <Clock size={16} />
            <span>Delayed</span>
          </div>
        );
      case "Warning":
        return (
          <div className="status-indicator status-warning">
            <AlertTriangle size={16} />
            <span>Warning</span>
          </div>
        );
      default:
        return (
          <div className="status-indicator">
            <span>{status}</span>
          </div>
        );
    }
  };

  const handleViewDetails = (flight) => {
    setSelectedFlight(flight);
    setShowDetailModal(true);
    
    // Simulate AI processing and recommendation
    setAiProcessing(true);
    setAiRecommendation("");
    
    setTimeout(() => {
      let recommendation = "";
      
      // Generate different AI recommendations based on flight status and risk
      if (flight.risk === "High" && flight.status === "Delayed") {
        recommendation = "Recommend alternate route via BIGUR waypoint to avoid inclement weather pattern. Projected fuel saving of 12% and potential arrival time improvement of 28 minutes.";
      } else if (flight.risk === "Medium") {
        recommendation = "Consider altitude adjustment to FL340 based on current wind patterns. Analysis shows potential 8% fuel efficiency improvement.";
      } else if (flight.origin === "JFK" || flight.destination === "JFK") {
        recommendation = "New York metro area experiencing 15% increased traffic volume. Suggest requesting priority landing slot now to avoid potential delays.";
      } else if (flight.aircraft.includes("737")) {
        recommendation = "Maintenance records indicate minor calibration issue with starboard sensor array. Not flight-critical but recommend maintenance check at destination.";
      } else {
        recommendation = "Current flight parameters optimal. No immediate action required, continuing to monitor atmospheric conditions along flight path.";
      }
      
      setAiRecommendation(recommendation);
      setAiProcessing(false);
    }, 1500);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedFlight(null);
    setAiRecommendation("");
  };

  // Get current flights for pagination
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);

  // Get random weather data for flight details
  const getWeatherData = (flight) => {
    // Generate pseudo-random but consistent data based on flight ID
    const hash = flight.id.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const absHash = Math.abs(hash);
    
    return {
      windSpeed: (10 + (absHash % 20)) + " knots",
      windDirection: ((absHash % 360)) + "°",
      temperature: (5 + (absHash % 25)) + "°C",
      humidity: (30 + (absHash % 50)) + "%",
      pressure: (980 + (absHash % 40)) + " hPa",
      visibility: (absHash % 10 > 7 ? "Excellent" : absHash % 10 > 4 ? "Good" : "Moderate")
    };
  };

  // Get flight path visualization data
  const getFlightPathData = (flight) => {
    // This would connect to a real tracking system in a production app
    // We're generating dummy data for the demo
    const flightDuration = 180; // 3 hours in minutes
    const currentProgress = (flight.id.charCodeAt(0) + flight.id.charCodeAt(flight.id.length-1)) % 100;
    
    return {
      progress: currentProgress,
      elapsedTime: Math.floor(currentProgress * flightDuration / 100),
      remainingTime: Math.floor((100 - currentProgress) * flightDuration / 100),
      altitude: (30 + (flight.id.charCodeAt(2) % 10)) + "," + (flight.id.charCodeAt(3) % 1000).toString().padStart(3, '0') + " ft",
      groundSpeed: (400 + (flight.id.charCodeAt(1) % 150)) + " knots"
    };
  };

  const handleViewSimulation = (flight) => {
    setSelectedSimulation(flight);
    setShowSimulationModal(true);
    setSimulationProgress(0);
    setSimulationResults(null);
    setSimulationRunning(false);
  };

  const runSimulation = () => {
    setSimulationRunning(true);
    setSimulationProgress(0);
    setSimulationResults(null);

    // Generate dynamic results based on selected variables
    const generateDynamicResults = () => {
      const results = [];
      
      // Optimal Route Adjustment Scenario
      if (selectedVariables.traffic !== "low") {
        const trafficImpact = selectedVariables.traffic === "high" ? 15 : 8;
        results.push({
          id: 1,
          scenario: "Optimal Route Adjustment",
          probability: selectedVariables.weather === "optimal" ? 92 : 85,
          impact: selectedVariables.traffic === "high" ? "High" : "Medium",
          outcomes: {
            fuelSavings: `${trafficImpact}%`,
            timeReduction: `${trafficImpact + 10} minutes`,
            costSavings: `$${(trafficImpact * 250).toFixed(0)}`,
            riskLevel: "Low"
          },
          description: `Rerouting through ${selectedVariables.traffic === "high" ? "alternative airspace" : "less congested routes"} while maintaining optimal safety margins.`
        });
      }

      // Weather-based Scenario
      if (selectedVariables.weather !== "optimal") {
        const weatherImpact = selectedVariables.weather === "adverse" ? 12 : 8;
        results.push({
          id: 2,
          scenario: "Weather Optimization",
          probability: 90,
          impact: selectedVariables.weather === "adverse" ? "High" : "Medium",
          outcomes: {
            fuelSavings: `${weatherImpact}%`,
            timeReduction: `${weatherImpact + 5} minutes`,
            costSavings: `$${(weatherImpact * 200).toFixed(0)}`,
            riskLevel: selectedVariables.weather === "adverse" ? "Medium" : "Low"
          },
          description: `Altitude and route adjustments to optimize for ${selectedVariables.weather === "adverse" ? "severe" : "moderate"} weather conditions.`
        });
      }

      // Fuel Efficiency Scenario
      if (selectedVariables.fuelPrice !== "low") {
        const fuelImpact = selectedVariables.fuelPrice === "high" ? 18 : 10;
        results.push({
          id: 3,
          scenario: "Fuel Efficiency Optimization",
          probability: 95,
          impact: selectedVariables.fuelPrice === "high" ? "High" : "Medium",
          outcomes: {
            fuelSavings: `${fuelImpact}%`,
            timeReduction: `${Math.floor(fuelImpact/2)} minutes`,
            costSavings: `$${(fuelImpact * 300).toFixed(0)}`,
            riskLevel: "Low"
          },
          description: `Optimized flight parameters for maximum fuel efficiency under ${selectedVariables.fuelPrice === "high" ? "elevated" : "current"} fuel prices.`
        });
      }

      // Crew Optimization Scenario
      if (selectedVariables.crewAvailability !== "optimal") {
        const crewImpact = selectedVariables.crewAvailability === "limited" ? 20 : 12;
        results.push({
          id: 4,
          scenario: "Crew Resource Management",
          probability: 88,
          impact: selectedVariables.crewAvailability === "limited" ? "High" : "Medium",
          outcomes: {
            fuelSavings: `${Math.floor(crewImpact/2)}%`,
            timeReduction: `${crewImpact} minutes`,
            costSavings: `$${(crewImpact * 150).toFixed(0)}`,
            riskLevel: selectedVariables.crewAvailability === "limited" ? "Medium" : "Low"
          },
          description: `Optimized crew scheduling and rotation to maintain operational efficiency under ${selectedVariables.crewAvailability} availability conditions.`
        });
      }

      return results;
    };

    // Simulate processing time with visual feedback
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setSimulationProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setSimulationRunning(false);
        setSimulationResults(generateDynamicResults());
      }
    }, 100);
  };

  // Add a console log to debug simulation results
  useEffect(() => {
    if (simulationResults) {
      console.log('Simulation Results:', simulationResults);
    }
  }, [simulationResults]);

  const resetSimulation = () => {
    setSimulationProgress(0);
    setSimulationResults(null);
    setSimulationRunning(false);
  };

  return (
    <div className="flights-module">
      <div className="flight-controls">
        <div className="search-container">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search flights by ID, origin, or destination..."
            className="flight-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="view-tabs">
          <button 
            className={`view-tab ${activeView === 'all' ? 'active' : ''}`}
            onClick={() => setActiveView('all')}
          >
            All Flights
          </button>
          <button 
            className={`view-tab ${activeView === 'active' ? 'active' : ''}`}
            onClick={() => setActiveView('active')}
          >
            Active
          </button>
          <button 
            className={`view-tab ${activeView === 'delayed' ? 'active' : ''}`}
            onClick={() => setActiveView('delayed')}
          >
            Delayed
          </button>
          <button 
            className={`view-tab ${activeView === 'highRisk' ? 'active' : ''}`}
            onClick={() => setActiveView('highRisk')}
          >
            High Risk
          </button>
        </div>
      </div>

      {currentFlights.length === 0 ? (
        <div className="no-flights">
          <PlaneTakeoff size={24} />
          <p>No flights match your search criteria</p>
        </div>
      ) : (
        <div className="flight-cards-container">
          {currentFlights.map((flight) => (
            <div key={flight.id} className="flight-card">
              <div className="flight-card-header">
                <div className="flight-id">{flight.id}</div>
                {getRiskBadge(flight.risk)}
              </div>
              
              <div className="flight-route">
                <div className="origin">
                  <div className="airport-code">{flight.origin}</div>
                  <div className="airport-name">{flight.originFull}</div>
                </div>
                <div className="route-line">
                  <div className="route-dot"></div>
                  <div className="route-arrow">
                    <ArrowRight size={16} />
                  </div>
                  <div className="route-dot"></div>
                </div>
                <div className="destination">
                  <div className="airport-code">{flight.destination}</div>
                  <div className="airport-name">{flight.destinationFull}</div>
                </div>
              </div>
              
              <div className="flight-details">
                <div className="flight-detail">
                  <div className="detail-label">Status</div>
                  <div className="detail-value">{getStatusIndicator(flight.status)}</div>
                </div>
                <div className="flight-detail">
                  <div className="detail-label">Departure</div>
                  <div className="detail-value">{flight.scheduledDeparture}</div>
                </div>
                <div className="flight-detail">
                  <div className="detail-label">Arrival</div>
                  <div className="detail-value">{flight.scheduledArrival}</div>
                </div>
              </div>
              
              <div className="flight-footer">
                <div className="flight-detail">
                  <div className="detail-label">Aircraft</div>
                  <div className="detail-value">{flight.aircraft}</div>
                </div>
                <div className="flight-detail">
                  <div className="detail-label">Gate</div>
                  <div className="detail-value">{flight.gate}</div>
                </div>
                <div className="flight-actions">
                  <button 
                    className="flight-details-btn"
                    onClick={() => handleViewDetails(flight)}
                  >
                    View Details
                  </button>
                  <button 
                    className="flight-simulation-btn"
                    onClick={() => handleViewSimulation(flight)}
                  >
                    <Activity size={14} />
                    Simulate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Flight Details Modal */}
      {showDetailModal && selectedFlight && (
        <div className="flight-detail-modal-backdrop">
          <div className="flight-detail-modal">
            <div className="modal-header">
              <div className="modal-title">
                <PlaneTakeoff size={20} />
                <h3>Flight {selectedFlight.id} Details</h3>
              </div>
              <button className="modal-close-btn" onClick={closeDetailModal}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-content">
              {/* Flight Path Visualization */}
              <div className="flight-path-visualization">
                <div className="visualization-header">
                  <div className="origin">
                    <div className="airport-code">{selectedFlight.origin}</div>
                    <div className="airport-name">{selectedFlight.originFull}</div>
                  </div>
                  <div className="flight-status">
                    {getStatusIndicator(selectedFlight.status)}
                  </div>
                  <div className="destination">
                    <div className="airport-code">{selectedFlight.destination}</div>
                    <div className="airport-name">{selectedFlight.destinationFull}</div>
                  </div>
                </div>
                
                {/* Progress Indicator */}
                {(() => {
                  const pathData = getFlightPathData(selectedFlight);
                  return (
                    <div className="flight-progress-container">
                      <div className="flight-progress-track">
                        <div 
                          className="flight-progress-indicator" 
                          style={{width: `${pathData.progress}%`}}
                        >
                          <div className="plane-icon-container">
                            <PlaneTakeoff size={16} className="plane-icon" />
                          </div>
                        </div>
                      </div>
                      <div className="flight-progress-labels">
                        <div className="progress-label">
                          {pathData.elapsedTime} min elapsed
                        </div>
                        <div className="progress-label">
                          {pathData.remainingTime} min remaining
                        </div>
                      </div>
                      <div className="flight-metrics">
                        <div className="metric">
                          <div className="metric-label">Ground Speed</div>
                          <div className="metric-value">{pathData.groundSpeed}</div>
                        </div>
                        <div className="metric">
                          <div className="metric-label">Altitude</div>
                          <div className="metric-value">{pathData.altitude}</div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="detail-columns">
                {/* Flight Information Column */}
                <div className="detail-column">
                  <h4 className="detail-column-title">Flight Information</h4>
                  
                  <div className="detail-row">
                    <div className="detail-item">
                      <div className="detail-item-label">Aircraft Type</div>
                      <div className="detail-item-value">{selectedFlight.aircraft}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-item-label">Registration</div>
                      <div className="detail-item-value">{selectedFlight.registration || "N7846B"}</div>
                    </div>
                  </div>
                  
                  <div className="detail-row">
                    <div className="detail-item">
                      <div className="detail-item-label">Scheduled Departure</div>
                      <div className="detail-item-value">{selectedFlight.scheduledDeparture}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-item-label">Estimated Arrival</div>
                      <div className="detail-item-value">{selectedFlight.scheduledArrival}</div>
                    </div>
                  </div>
                  
                  <div className="detail-row">
                    <div className="detail-item">
                      <div className="detail-item-label">Departure Gate</div>
                      <div className="detail-item-value">{selectedFlight.gate || "A12"}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-item-label">Arrival Gate</div>
                      <div className="detail-item-value">{selectedFlight.arrivalGate || "B22"}</div>
                    </div>
                  </div>
                  
                  <div className="detail-row">
                    <div className="detail-item">
                      <div className="detail-item-label">Risk Assessment</div>
                      <div className="detail-item-value">{getRiskBadge(selectedFlight.risk)}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-item-label">Distance</div>
                      <div className="detail-item-value">{selectedFlight.distance || "1,432 NM"}</div>
                    </div>
                  </div>
                </div>
                
                {/* Weather Information Column */}
                <div className="detail-column">
                  <h4 className="detail-column-title">Route Weather Conditions</h4>
                  
                  {(() => {
                    const weatherData = getWeatherData(selectedFlight);
                    return (
                      <>
                        <div className="detail-row">
                          <div className="detail-item">
                            <div className="weather-item">
                              <Wind size={16} />
                              <div>
                                <div className="detail-item-label">Wind Speed</div>
                                <div className="detail-item-value">{weatherData.windSpeed}</div>
                              </div>
                            </div>
                          </div>
                          <div className="detail-item">
                            <div className="weather-item">
                              <Thermometer size={16} />
                              <div>
                                <div className="detail-item-label">Temperature</div>
                                <div className="detail-item-value">{weatherData.temperature}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="detail-row">
                          <div className="detail-item">
                            <div className="weather-item">
                              <Droplets size={16} />
                              <div>
                                <div className="detail-item-label">Humidity</div>
                                <div className="detail-item-value">{weatherData.humidity}</div>
                              </div>
                            </div>
                          </div>
                          <div className="detail-item">
                            <div className="weather-item">
                              <Cloud size={16} />
                              <div>
                                <div className="detail-item-label">Visibility</div>
                                <div className="detail-item-value">{weatherData.visibility}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
              
              {/* AI-Assisted Recommendations */}
              <div className="ai-recommendation-section">
                <div className="ai-recommendation-header">
                  <div className="ai-icon">
                    <Cpu size={20} />
                  </div>
                  <h4>AI-Assisted Flight Recommendations</h4>
                </div>
                
                <div className="ai-recommendation-content">
                  {aiProcessing ? (
                    <div className="ai-processing">
                      <div className="ai-processing-animation">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <p>AI analyzing flight patterns and environmental factors...</p>
                    </div>
                  ) : (
                    <div className="ai-message">
                      <p>{aiRecommendation}</p>
                    </div>
                  )}
                </div>
                
                <div className="ai-actions">
                  <button className="action-btn">Apply Recommendation</button>
                  <button className="action-btn">Request Alternative</button>
                  <button className="action-btn">Dismiss</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Pagination */}
      {filteredFlights.length > flightsPerPage && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          <button
            className="pagination-btn"
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Simulation Modal */}
      {showSimulationModal && selectedSimulation && (
        <div className="simulation-modal-backdrop">
          <div className="simulation-modal">
            <div className="modal-header">
              <div className="modal-title">
                <Activity size={20} />
                <h3>Decision Simulation - Flight {selectedSimulation.id}</h3>
              </div>
              <button 
                className="modal-close-btn" 
                onClick={() => {
                  setShowSimulationModal(false);
                  setSimulationProgress(0);
                  setSimulationResults(null);
                  setSimulationRunning(false);
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-content">
              <div className="simulation-controls">
                <div className="simulation-variables">
                  <h4>Simulation Variables</h4>
                  <div className="variables-grid">
                    <div className="variable-item">
                      <label>Weather Conditions</label>
                      <select 
                        value={selectedVariables.weather}
                        onChange={(e) => setSelectedVariables(prev => ({...prev, weather: e.target.value}))}
                        disabled={simulationRunning}
                      >
                        <option value="current">Current Forecast</option>
                        <option value="adverse">Adverse Weather</option>
                        <option value="optimal">Optimal Conditions</option>
                      </select>
                    </div>
                    <div className="variable-item">
                      <label>Air Traffic Density</label>
                      <select
                        value={selectedVariables.traffic}
                        onChange={(e) => setSelectedVariables(prev => ({...prev, traffic: e.target.value}))}
                        disabled={simulationRunning}
                      >
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div className="variable-item">
                      <label>Fuel Price Scenario</label>
                      <select
                        value={selectedVariables.fuelPrice}
                        onChange={(e) => setSelectedVariables(prev => ({...prev, fuelPrice: e.target.value}))}
                        disabled={simulationRunning}
                      >
                        <option value="current">Current Market</option>
                        <option value="high">Price Surge</option>
                        <option value="low">Price Drop</option>
                      </select>
                    </div>
                    <div className="variable-item">
                      <label>Crew Availability</label>
                      <select
                        value={selectedVariables.crewAvailability}
                        onChange={(e) => setSelectedVariables(prev => ({...prev, crewAvailability: e.target.value}))}
                        disabled={simulationRunning}
                      >
                        <option value="normal">Normal</option>
                        <option value="limited">Limited</option>
                        <option value="optimal">Optimal</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="simulation-actions">
                  {!simulationRunning && simulationProgress === 0 && (
                    <button className="run-simulation-btn" onClick={runSimulation}>
                      <Play size={16} />
                      Run Simulation
                    </button>
                  )}
                  {simulationRunning && (
                    <button className="pause-simulation-btn" onClick={() => setSimulationRunning(false)}>
                      <Pause size={16} />
                      Pause
                    </button>
                  )}
                  {!simulationRunning && simulationProgress > 0 && (
                    <button className="reset-simulation-btn" onClick={resetSimulation}>
                      <RotateCcw size={16} />
                      Reset
                    </button>
                  )}
                </div>

                {(simulationRunning || simulationProgress > 0) && (
                  <div className="simulation-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-indicator"
                        style={{ width: `${simulationProgress}%` }}
                      ></div>
                    </div>
                    <div className="progress-label">
                      {simulationProgress < 100 
                        ? `Processing Scenarios... ${simulationProgress}%`
                        : 'Simulation Complete'}
                    </div>
                  </div>
                )}
              </div>

              {simulationResults && simulationResults.length > 0 && (
                <div className="simulation-results">
                  <h4>Scenario Analysis</h4>
                  <div className="scenarios-list">
                    {simulationResults.map((scenario) => (
                      <div key={scenario.id} className="scenario-card">
                        <div 
                          className="scenario-header"
                          onClick={() => setExpandedScenario(expandedScenario === scenario.id ? null : scenario.id)}
                        >
                          <div className="scenario-title">
                            <h5>{scenario.scenario}</h5>
                            <div className="scenario-meta">
                              <span className="probability">
                                {scenario.probability}% Probability
                              </span>
                              <span className={`impact impact-${scenario.impact.toLowerCase()}`}>
                                {scenario.impact} Impact
                              </span>
                            </div>
                          </div>
                          <button className="expand-btn">
                            {expandedScenario === scenario.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                        
                        {expandedScenario === scenario.id && (
                          <div className="scenario-details">
                            <p className="scenario-description">{scenario.description}</p>
                            <div className="outcome-metrics">
                              <div className="outcome-metric">
                                <label>Fuel Savings</label>
                                <span className="value">{scenario.outcomes.fuelSavings}</span>
                              </div>
                              <div className="outcome-metric">
                                <label>Time Reduction</label>
                                <span className="value">{scenario.outcomes.timeReduction}</span>
                              </div>
                              <div className="outcome-metric">
                                <label>Cost Savings</label>
                                <span className="value">{scenario.outcomes.costSavings}</span>
                              </div>
                              <div className="outcome-metric">
                                <label>Risk Level</label>
                                <span className="value">{scenario.outcomes.riskLevel}</span>
                              </div>
                            </div>
                            <div className="scenario-actions">
                              <button className="apply-scenario-btn">
                                Apply This Scenario
                              </button>
                              <button className="modify-scenario-btn">
                                <Settings size={14} />
                                Modify Parameters
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightsTable; 
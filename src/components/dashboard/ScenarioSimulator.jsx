import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Lightbulb, ThumbsUp, Clock, ArrowRight, Check, ChevronRight, ArrowLeft, AlertTriangle, Brain, Play, ChevronsRight, Calendar, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScenarioOption = ({ option, isSelected, isRecommended, showResults, onClick }) => {
  return (
    <div 
      className={`relative mb-3 p-4 border rounded-lg cursor-pointer transition-all ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20' 
          : (showResults && isRecommended)
          ? 'border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/20'
          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
      }`}
      onClick={() => !showResults && onClick(option.id)}
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border flex items-center justify-center mr-3 ${
          isSelected 
            ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400' 
            : 'border-gray-300 dark:border-gray-600'
        }`}>
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 dark:text-white">{option.action}</h4>
          
          {showResults && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-3"
            >
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Predicted Outcomes:</h5>
              <ul className="space-y-2">
                {option.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center justify-center mr-2 mt-0.5 text-xs">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{outcome}</span>
                  </li>
                ))}
              </ul>
              
              {isRecommended && (
                <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center">
                  <ThumbsUp className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
                  <span className="text-sm text-green-800 dark:text-green-400">AI Recommended Action</span>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const ScenarioCard = ({ scenario, completedScenarios }) => {
  const isCompleted = completedScenarios.includes(scenario.id);
  
  return (
    <div 
      className={`mb-3 p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
        isCompleted 
          ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <h3 className="font-medium text-gray-900 dark:text-white">{scenario.title}</h3>
            {isCompleted && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                Completed
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{scenario.description}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

const ScenarioSimulator = ({ scenarios }) => {
  const [activeScenario, setActiveScenario] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState([]);

  const handleSelectScenario = (scenario) => {
    setActiveScenario(scenario);
    setSelectedOption(null);
    setShowResults(false);
  };

  const handleSelectOption = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleSubmitDecision = () => {
    if (selectedOption) {
      setShowResults(true);
      if (!completedScenarios.includes(activeScenario.id)) {
        setCompletedScenarios([...completedScenarios, activeScenario.id]);
      }
    }
  };

  const handleNewScenario = () => {
    setActiveScenario(null);
    setSelectedOption(null);
    setShowResults(false);
  };

  const getRecommendedOption = () => {
    if (!activeScenario) return null;
    return activeScenario.options.find(o => o.recommendation);
  };

  const getImpactBadgeClass = (impact) => {
    switch (impact) {
      case "High":
        return "impact-badge impact-high";
      case "Medium":
        return "impact-badge impact-medium";
      case "Low":
        return "impact-badge impact-low";
      default:
        return "impact-badge impact-low";
    }
  };

  return (
    <div className="card-body">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {scenarios.map((scenario) => (
          <div 
            key={scenario.id}
            style={{
              border: "1px solid var(--gray-200)",
              borderRadius: "var(--border-radius)",
              backgroundColor: "var(--white)",
              boxShadow: "var(--shadow-sm)",
              overflow: "hidden",
            }}
          >
            <div style={{ 
              padding: "20px", 
              borderBottom: "1px solid var(--gray-200)" 
            }}>
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginBottom: "8px" 
              }}>
                <h3 style={{ 
                  fontSize: "16px", 
                  fontWeight: "600", 
                  color: "var(--gray-900)" 
                }}>
                  {scenario.name}
                </h3>
                <span className={getImpactBadgeClass(scenario.impact)}>
                  {scenario.impact} Impact
                </span>
              </div>
              <p style={{ 
                fontSize: "14px", 
                color: "var(--gray-600)" 
              }}>
                {scenario.description}
              </p>
            </div>
            
            <div style={{ 
              padding: "12px 20px", 
              borderBottom: "1px solid var(--gray-200)",
              backgroundColor: "var(--gray-50)" 
            }}>
              <h4 style={{ 
                fontSize: "12px", 
                fontWeight: "600", 
                color: "var(--gray-500)",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                Variables
              </h4>
              <div style={{ 
                marginTop: "8px", 
                display: "flex", 
                flexWrap: "wrap", 
                gap: "8px" 
              }}>
                {scenario.variables.map((variable, index) => (
                  <span 
                    key={index}
                    style={{
                      padding: "4px 10px",
                      fontSize: "12px",
                      borderRadius: "4px",
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      color: "var(--primary)"
                    }}
                  >
                    {variable}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ 
              padding: "12px 20px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between" 
            }}>
              <div style={{ 
                display: "flex", 
                alignItems: "center" 
              }}>
                <Calendar size={14} style={{ color: "var(--gray-400)", marginRight: "6px" }} />
                <span style={{ 
                  fontSize: "12px", 
                  color: "var(--gray-500)" 
                }}>
                  Last run: {scenario.lastRun}
                </span>
              </div>
              <div style={{ 
                display: "flex", 
                gap: "8px" 
              }}>
                <button 
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "6px 10px",
                    fontSize: "12px",
                    fontWeight: "500",
                    borderRadius: "var(--border-radius)",
                    backgroundColor: "var(--white)",
                    border: "1px solid var(--gray-300)",
                    color: "var(--gray-700)",
                    cursor: "pointer"
                  }}
                >
                  <Zap size={14} style={{ marginRight: "6px" }} />
                  Configure
                </button>
                <button 
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "6px 12px",
                    fontSize: "12px",
                    fontWeight: "500",
                    borderRadius: "var(--border-radius)",
                    backgroundColor: "var(--accent)",
                    border: "none",
                    color: "var(--white)",
                    cursor: "pointer"
                  }}
                >
                  <Play size={14} style={{ marginRight: "6px" }} />
                  Run Simulation
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: "24px",
        padding: "16px",
        borderLeft: "4px solid var(--accent)",
        borderRadius: "var(--border-radius)",
        backgroundColor: "rgba(139, 92, 246, 0.1)"
      }}>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <Brain size={22} style={{ color: "var(--accent)", marginRight: "12px", marginTop: "2px" }} />
          <div>
            <h3 style={{ 
              fontSize: "14px", 
              fontWeight: "600", 
              color: "var(--gray-900)",
              marginBottom: "4px"
            }}>
              AI Decision Augmentation
            </h3>
            <p style={{ 
              fontSize: "14px", 
              color: "var(--gray-600)",
              marginBottom: "12px" 
            }}>
              Our AI models can analyze multiple variables and scenarios to provide optimal decision recommendations based on historical data and predictive analytics.
            </p>
            <button 
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "8px 16px",
                fontSize: "12px",
                fontWeight: "500",
                borderRadius: "var(--border-radius)",
                backgroundColor: "rgba(139, 92, 246, 0.2)",
                border: "none",
                color: "var(--accent)",
                cursor: "pointer"
              }}
            >
              <ChevronsRight size={16} style={{ marginRight: "6px" }} />
              Create Custom Scenario
            </button>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: "24px",
        padding: "16px",
        border: "1px solid var(--gray-200)",
        borderRadius: "var(--border-radius)",
        backgroundColor: "var(--gray-50)"
      }}>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <AlertTriangle size={20} style={{ color: "var(--warning)", marginRight: "12px", marginTop: "2px" }} />
          <div>
            <h3 style={{ 
              fontSize: "14px", 
              fontWeight: "600", 
              color: "var(--gray-900)",
              marginBottom: "4px"
            }}>
              Recent Simulations
            </h3>
            <p style={{ 
              fontSize: "14px", 
              color: "var(--gray-600)",
              marginBottom: "12px" 
            }}>
              Weather Diversion simulation showed potential 32% cost reduction by using AI-optimized flight paths instead of standard protocols.
            </p>
            <button 
              style={{
                fontSize: "12px",
                color: "var(--primary)",
                backgroundColor: "transparent",
                border: "none",
                padding: "0",
                cursor: "pointer",
                textDecoration: "underline"
              }}
            >
              View detailed report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSimulator; 
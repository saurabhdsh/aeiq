import React, { useState, useEffect, useRef } from 'react';
import { LineChart, BarChart2, Percent, DollarSign, Clock, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Gauge, Calendar, BarChart, Cpu, Brain, CheckCircle, Zap, Layers, Activity, Wrench, X, Play } from 'lucide-react';

const TrendIndicator = ({ value, threshold = 0 }) => {
  const isPositive = value >= threshold;
  return isPositive ? (
    <div className="trend trend-up">
      <ArrowUpRight size={14} />
      <span>+{value.toFixed(1)}%</span>
    </div>
  ) : (
    <div className="trend trend-down">
      <ArrowDownRight size={14} />
      <span>{value.toFixed(1)}%</span>
    </div>
  );
};

const MetricCard = ({ title, value, icon: Icon, trend, color }) => {
  return (
    <div style={{ padding: "16px", borderBottom: "1px solid var(--gray-200)" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className={`icon-circle icon-${color}`} style={{ width: "40px", height: "40px" }}>
          <Icon size={18} />
        </div>
        <div style={{ marginLeft: "16px" }}>
          <h3 style={{ fontSize: "14px", color: "var(--gray-500)", marginBottom: "4px" }}>{title}</h3>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontSize: "20px", fontWeight: "700", color: "var(--gray-900)" }}>{value}%</span>
            <div style={{ marginLeft: "8px" }}>
              <TrendIndicator value={trend} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SimpleBarChart = ({ data }) => {
  const maxValue = Math.max(...(data || []).map(d => Math.max(d.onTime || 0, d.fuel || 0, d.crew || 0)));
  const scale = maxValue > 0 ? 100 / maxValue : 1;

  return (
    <div style={{ paddingTop: "24px" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "16px", 
        padding: "0 24px" 
      }}>
        <h3 style={{ 
          fontSize: "14px", 
          fontWeight: "600", 
          color: "var(--gray-900)", 
          display: "flex", 
          alignItems: "center" 
        }}>
          <BarChart size={16} style={{ marginRight: "8px", color: "var(--gray-500)" }} />
          Performance Trends
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ 
              height: "12px", 
              width: "12px", 
              borderRadius: "50%", 
              backgroundColor: "var(--primary)", 
              marginRight: "6px" 
            }}></div>
            <span style={{ fontSize: "12px", color: "var(--gray-600)" }}>On-Time</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ 
              height: "12px", 
              width: "12px", 
              borderRadius: "50%", 
              backgroundColor: "var(--success)", 
              marginRight: "6px" 
            }}></div>
            <span style={{ fontSize: "12px", color: "var(--gray-600)" }}>Fuel</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ 
              height: "12px", 
              width: "12px", 
              borderRadius: "50%", 
              backgroundColor: "var(--secondary)", 
              marginRight: "6px" 
            }}></div>
            <span style={{ fontSize: "12px", color: "var(--gray-600)" }}>Crew</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 24px 24px" }}>
        <div style={{ 
          display: "flex", 
          alignItems: "flex-end", 
          justifyContent: "space-between", 
          height: "160px",
          gap: "8px"
        }}>
          {(data || []).map((day, i) => (
            <div key={i} style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ 
                width: "100%", 
                display: "flex", 
                gap: "2px", 
                marginBottom: "6px" 
              }}>
                <div 
                  style={{ 
                    flex: "1", 
                    backgroundColor: "var(--primary)", 
                    borderTopLeftRadius: "2px", 
                    borderTopRightRadius: "2px",
                    height: `${(day.onTime || 0) * scale}px` 
                  }}
                ></div>
                <div 
                  style={{ 
                    flex: "1", 
                    backgroundColor: "var(--success)", 
                    borderTopLeftRadius: "2px", 
                    borderTopRightRadius: "2px",
                    height: `${(day.fuel || 0) * scale}px` 
                  }}
                ></div>
                <div 
                  style={{ 
                    flex: "1", 
                    backgroundColor: "var(--secondary)", 
                    borderTopLeftRadius: "2px", 
                    borderTopRightRadius: "2px",
                    height: `${(day.crew || 0) * scale}px` 
                  }}
                ></div>
              </div>
              <div style={{ fontSize: "12px", color: "var(--gray-500)" }}>{day.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OperationalMetrics = ({ metrics }) => {
  // Enhanced state for AI visualization
  const [showAIVisualization, setShowAIVisualization] = useState(false);
  const [aiSimulationState, setAiSimulationState] = useState('idle'); // idle, running, complete
  const [aiInsights, setAiInsights] = useState([]);
  const [completedOptimizations, setCompletedOptimizations] = useState([]);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState(null);
  
  // AI Simulation effect
  useEffect(() => {
    if (aiSimulationState === 'running') {
      // Simulate AI processing
      const insightData = [
        { id: 1, title: 'Crew Schedule Optimization', description: 'Analyzing patterns in crew fatigue and aircraft turnaround times' },
        { id: 2, title: 'Weather Pattern Analysis', description: 'Detecting weather anomalies affecting flight paths' },
        { id: 3, title: 'Maintenance Prediction', description: 'Predicting optimal maintenance scheduling to minimize disruptions' },
      ];
      
      const optimizations = [
        { id: 1, title: 'Crew Schedule Optimization', value: '+4.2%', impact: 'HIGH', category: 'Crew' },
        { id: 2, title: 'Fuel Route Optimization', value: '+3.7%', impact: 'HIGH', category: 'Fuel' },
        { id: 3, title: 'Maintenance Schedule Refinement', value: '+2.1%', impact: 'MEDIUM', category: 'Maintenance' },
      ];

      // Show insights with delays
      let currentInsights = [];
      const insightTimers = insightData.map((insight, index) => {
        return setTimeout(() => {
          currentInsights = [...currentInsights, insight];
          setAiInsights([...currentInsights]);
          
          // Update progress
          setOptimizationProgress(((index + 1) / insightData.length) * 50);
        }, 800 * (index + 1));
      });
      
      // After insights, show optimizations
      const completionTimer = setTimeout(() => {
        let currentOptimizations = [];
        
        const optimizationTimers = optimizations.map((opt, index) => {
          return setTimeout(() => {
            currentOptimizations = [...currentOptimizations, opt];
            setCompletedOptimizations([...currentOptimizations]);
            
            // Update progress from 50% to 100%
            setOptimizationProgress(50 + ((index + 1) / optimizations.length) * 50);
            
            // When complete, update state
            if (index === optimizations.length - 1) {
              setTimeout(() => {
                setAiSimulationState('complete');
              }, 1000);
            }
          }, 1000 * (index + 1));
        });
        
        return () => optimizationTimers.forEach(timer => clearTimeout(timer));
      }, 3000);
      
      return () => {
        insightTimers.forEach(timer => clearTimeout(timer));
        clearTimeout(completionTimer);
      };
    }
  }, [aiSimulationState]);
  
  // AI Visualization component
  const AIVisualization = () => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
      if (!canvasRef.current || aiSimulationState !== 'running') return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      
      // Create particles for visualization
      const particles = [];
      const connections = [];
      const nodeSize = 4;
      const numParticles = 40;
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          color: i < numParticles * 0.7 ? 
                 'rgba(79, 70, 229, 0.6)' : 
                 'rgba(16, 185, 129, 0.8)'
        });
      }
      
      // Animation function
      const animate = () => {
        if (!canvasRef.current || aiSimulationState !== 'running') return;
        
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw connections
        connections.length = 0;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 80) {
              connections.push({
                from: i,
                to: j,
                opacity: 1 - distance / 80
              });
            }
          }
        }
        
        // Draw connections
        for (const connection of connections) {
          const p1 = particles[connection.from];
          const p2 = particles[connection.to];
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(79, 70, 229, ${connection.opacity * 0.2})`;
          ctx.lineWidth = connection.opacity * 1.5;
          ctx.stroke();
        }
        
        // Update and draw particles
        for (const particle of particles) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Bounce off edges
          if (particle.x < 0 || particle.x > width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > height) particle.vy *= -1;
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, nodeSize, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        }
        
        requestAnimationFrame(animate);
      };
      
      // Start animation
      animate();
      
    }, [canvasRef, aiSimulationState]);
    
    return (
      <div style={{ 
        backgroundColor: 'rgba(244, 247, 252, 0.8)', 
        borderRadius: '8px', 
        marginTop: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ 
          backgroundColor: '#4F46E5', 
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Brain size={20} color="white" />
            <span style={{ color: 'white', marginLeft: '12px', fontWeight: '600' }}>
              AI Performance Optimization Simulation
            </span>
          </div>
          <div>
            {aiSimulationState === 'idle' && (
              <button 
                onClick={() => setAiSimulationState('running')}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Play size={14} style={{ marginRight: '6px' }} />
                Run Simulation
              </button>
            )}
            {aiSimulationState === 'running' && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                padding: '6px 12px',
                borderRadius: '4px',
              }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  marginRight: '8px',
                  animation: 'pulse 1.5s infinite'
                }}></div>
                <span style={{ color: 'white', fontSize: '14px' }}>
                  Processing... {Math.round(optimizationProgress)}%
                </span>
              </div>
            )}
            {aiSimulationState === 'complete' && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                padding: '6px 12px',
                borderRadius: '4px',
              }}>
                <CheckCircle size={14} color="white" style={{ marginRight: '6px' }} />
                <span style={{ color: 'white', fontSize: '14px' }}>
                  Optimization Complete
                </span>
              </div>
            )}
          </div>
        </div>
        
        <div style={{ 
          padding: '20px', 
          display: 'flex',
          minHeight: '220px'
        }}>
          {/* Visualization area */}
          <div style={{ flex: '1', position: 'relative' }}>
            {aiSimulationState === 'running' && (
              <canvas 
                ref={canvasRef} 
                width={400} 
                height={180}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0
                }}
              />
            )}
            
            {/* Idle state */}
            {aiSimulationState === 'idle' && (
              <div style={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center'
              }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(79, 70, 229, 0.1)',
                  marginBottom: '16px'
                }}>
                  <Brain size={24} style={{ color: '#4F46E5' }} />
                </div>
                <h3 style={{ 
                  fontSize: '16px', 
                  marginBottom: '8px',
                  textAlign: 'center'
                }}>
                  AI Performance Simulation
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: 'rgba(107, 114, 128, 1)',
                  textAlign: 'center',
                  maxWidth: '300px'
                }}>
                  Run the simulation to see optimization insights
                </p>
              </div>
            )}
            
            {/* Completed state */}
            {aiSimulationState === 'complete' && (
              <div style={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{ 
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'conic-gradient(#4F46E5 0%, #4F46E5 40%, #10B981 40%, #10B981 70%, #F59E0B 70%, #F59E0B 100%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '15px',
                  position: 'relative',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
                }}>
                  <div style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4F46E5' }}>+15%</div>
                    <div style={{ fontSize: '10px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Gain</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '12px',
                  maxWidth: '100%',
                  margin: '0 auto'
                }}>
                  {/* Crew Gain */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px 15px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(79, 70, 229, 0.2)',
                    animation: 'fadeInScale 0.5s ease forwards',
                    animationDelay: '0.1s',
                    opacity: 0,
                    transform: 'scale(0.9)'
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#4F46E5',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: '6px'
                    }}>
                      <Users size={12} color="white" />
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#4F46E5' }}>+4.2%</div>
                    <div style={{ fontSize: '12px', color: '#6B7280', textAlign: 'center' }}>Crew Efficiency</div>
                  </div>

                  {/* Fuel Gain */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px 15px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    animation: 'fadeInScale 0.5s ease forwards',
                    animationDelay: '0.3s',
                    opacity: 0,
                    transform: 'scale(0.9)'
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: '6px'
                    }}>
                      <Gauge size={12} color="white" />
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#10B981' }}>+3.7%</div>
                    <div style={{ fontSize: '12px', color: '#6B7280', textAlign: 'center' }}>Fuel Savings</div>
                  </div>

                  {/* Maintenance Gain */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px 15px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    animation: 'fadeInScale 0.5s ease forwards',
                    animationDelay: '0.5s',
                    opacity: 0,
                    transform: 'scale(0.9)'
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#F59E0B',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: '6px'
                    }}>
                      <Wrench size={12} color="white" />
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#F59E0B' }}>+2.1%</div>
                    <div style={{ fontSize: '12px', color: '#6B7280', textAlign: 'center' }}>Maintenance</div>
                  </div>

                  {/* On-Time Gain */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px 15px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    animation: 'fadeInScale 0.5s ease forwards',
                    animationDelay: '0.7s',
                    opacity: 0,
                    transform: 'scale(0.9)'
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#6366F1',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: '6px'
                    }}>
                      <Clock size={12} color="white" />
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#6366F1' }}>+5.0%</div>
                    <div style={{ fontSize: '12px', color: '#6B7280', textAlign: 'center' }}>On-Time Perf.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Insights panel */}
          <div style={{ 
            flex: '1',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                <Brain size={16} style={{ marginRight: '8px', color: '#4F46E5' }} />
                AI Processing Activities
              </h4>
              <div style={{ 
                maxHeight: '140px', 
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {aiInsights.map(insight => (
                  <div 
                    key={insight.id}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: 'white',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                      borderLeft: '4px solid #4F46E5',
                      animation: 'fadeIn 0.5s ease-out'
                    }}
                  >
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>{insight.title}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(107, 114, 128, 1)' }}>{insight.description}</div>
                  </div>
                ))}
                {aiInsights.length === 0 && aiSimulationState === 'idle' && (
                  <div style={{ color: 'rgba(107, 114, 128, 1)', fontSize: '14px', padding: '8px 0' }}>
                    Click "Run Simulation" to start AI optimization
                  </div>
                )}
              </div>
            </div>
            
            {completedOptimizations.length > 0 && (
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                  <Layers size={16} style={{ marginRight: '8px', color: '#10B981' }} />
                  Optimization Results
                </h4>
                <div style={{ 
                  maxHeight: '140px', 
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {completedOptimizations.map(opt => (
                    <div 
                      key={opt.id}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        fontSize: '14px',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                        borderLeft: '4px solid #10B981',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '500' }}>{opt.title}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(107, 114, 128, 1)' }}>Impact: {opt.impact}</div>
                      </div>
                      <div style={{ 
                        color: '#10B981', 
                        fontWeight: '600',
                        fontSize: '16px'
                      }}>
                        {opt.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {aiSimulationState === 'complete' && (
          <div style={{
            padding: '12px 20px',
            backgroundColor: '#F3FAFA',
            borderTop: '1px solid rgba(0, 0, 0, 0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Activity size={16} style={{ color: '#10B981', marginRight: '8px' }} />
              <span style={{ fontWeight: '500', fontSize: '14px' }}>Performance Improvement: </span>
              <span style={{ color: '#10B981', fontWeight: '600', marginLeft: '4px' }}>+15.0%</span>
            </div>
            <button
              onClick={() => {
                setAiSimulationState('idle');
                setAiInsights([]);
                setCompletedOptimizations([]);
                setOptimizationProgress(0);
              }}
              style={{
                backgroundColor: '#4F46E5',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              Reset Simulation
            </button>
          </div>
        )}
      </div>
    );
  };

  // Main return of OperationalMetrics component
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Operational Performance</h2>
        <button
          onClick={() => setShowAIVisualization(!showAIVisualization)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#4F46E5",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.2s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#4338CA"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4F46E5"}
        >
          <Brain size={16} />
          <span>{showAIVisualization ? "Hide AI Analysis" : "Show AI Analysis"}</span>
        </button>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
        <MetricCard 
          title="On-Time Performance" 
          value={metrics?.onTimePerformance || 85}
          icon={Gauge}
          trend={2.3}
          color="blue"
        />
        <MetricCard 
          title="Fuel Efficiency" 
          value={metrics?.fuelEfficiency || 78}
          icon={Gauge}
          trend={1.6}
          color="emerald"
        />
        <MetricCard 
          title="Crew Utilization" 
          value={metrics?.crewUtilization || 82}
          icon={Users}
          trend={0.5}
          color="indigo"
        />
        <MetricCard 
          title="Load Factor" 
          value={metrics?.loadFactor || 75}
          icon={Calendar}
          trend={-0.8}
          color="amber"
        />
      </div>

      <SimpleBarChart data={metrics?.dailyMetrics || []} />
      
      {showAIVisualization && <AIVisualization />}
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.8) translate(0, 0); }
          to { opacity: 1; transform: scale(1) translate(0, 0); }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 300; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

export default OperationalMetrics; 
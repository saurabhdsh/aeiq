import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gauge, Bell, PlaneTakeoff, Brain, Menu, X, BarChart2, LogOut, 
  Cpu, Search, Moon, Sun, ChevronDown, ArrowUpRight, ArrowDownRight, Clock, Activity, CheckCircle, Users, Wrench, Fuel, Info, Package, AlertTriangle
} from "lucide-react";
import AlertsPanel from "./components/dashboard/AlertsPanel";
import FlightsTable from "./components/dashboard/FlightsTable";
import ScenarioSimulator from "./components/dashboard/ScenarioSimulator";
import OperationalMetrics from "./components/dashboard/OperationalMetrics";
import ResourcePlanning from "./components/dashboard/ResourcePlanning";
import LoginScreen from "./components/auth/LoginScreen";
import ReactChatBot from "./components/aiBot/ReactChatBot";
import { alerts, flights, scenarios, operationalMetrics } from "./data/mockData";

function AirlineDecisionDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState(alerts);
  const [resolvedAlerts, setResolvedAlerts] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for user preference on dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab("dashboard");
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const handleAcknowledge = (id) => {
    const alertToResolve = activeAlerts.find(alert => alert.id === id);
    setResolvedAlerts([...resolvedAlerts, alertToResolve]);
    setActiveAlerts(activeAlerts.filter(alert => alert.id !== id));
  };

  const handleReset = () => {
    setActiveAlerts(alerts);
    setResolvedAlerts([]);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Dashboard Summary Cards 
  const DashboardSummary = () => {
    return (
      <div className="grid grid-cols-4">
        <div className="summary-card">
          <div className="icon-circle icon-blue">
            <Clock size={20} />
          </div>
          <div className="summary-content">
            <h3>On-Time Performance</h3>
            <div className="summary-value">{operationalMetrics.onTimePerformance}%</div>
            <div className="trend trend-up">
              <ArrowUpRight size={16} />
              <span>+2.1% from yesterday</span>
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="icon-circle icon-indigo">
            <PlaneTakeoff size={20} />
          </div>
          <div className="summary-content">
            <h3>Active Flights</h3>
            <div className="summary-value">24</div>
            <div className="trend trend-up">
              <ArrowUpRight size={16} />
              <span>+3 from yesterday</span>
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="icon-circle icon-amber">
            <Bell size={20} />
          </div>
          <div className="summary-content">
            <h3>Active Alerts</h3>
            <div className="summary-value">{activeAlerts.length}</div>
            <div className="trend trend-down">
              <ArrowDownRight size={16} />
              <span>-2 from yesterday</span>
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="icon-circle icon-emerald">
            <Cpu size={20} />
          </div>
          <div className="summary-content">
            <h3>AI Predictions</h3>
            <div className="summary-value">96%</div>
            <div className="trend trend-up">
              <ArrowUpRight size={16} />
              <span>+1.5% accuracy</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <div className="grid grid-cols-4">
              <div className="summary-card">
                <div className="icon-circle icon-blue">
                  <Clock size={20} />
                </div>
                <div className="summary-content">
                  <h3>On-Time Performance</h3>
                  <div className="summary-value">{operationalMetrics.onTimePerformance}%</div>
                  <div className="trend trend-up">
                    <ArrowUpRight size={16} />
                    <span>+2.1% from yesterday</span>
                  </div>
                </div>
              </div>

              <div className="summary-card">
                <div className="icon-circle icon-indigo">
                  <PlaneTakeoff size={20} />
                </div>
                <div className="summary-content">
                  <h3>Active Flights</h3>
                  <div className="summary-value">24</div>
                  <div className="trend trend-up">
                    <ArrowUpRight size={16} />
                    <span>+3 from yesterday</span>
                  </div>
                </div>
              </div>

              <div className="summary-card">
                <div className="icon-circle icon-amber">
                  <Bell size={20} />
                </div>
                <div className="summary-content">
                  <h3>Active Alerts</h3>
                  <div className="summary-value">{activeAlerts.length}</div>
                  <div className="trend trend-down">
                    <ArrowDownRight size={16} />
                    <span>-2 from yesterday</span>
                  </div>
                </div>
              </div>

              <div className="summary-card">
                <div className="icon-circle icon-emerald">
                  <Cpu size={20} />
                </div>
                <div className="summary-content">
                  <h3>AI Predictions</h3>
                  <div className="summary-value">96%</div>
                  <div className="trend trend-up">
                    <ArrowUpRight size={16} />
                    <span>+1.5% accuracy</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">
                  <Bell size={18} />
                  Active Alerts
                </h2>
                <button className="link-btn">
                  View All <ChevronDown size={14} />
                </button>
              </div>
              <AlertsPanel 
                alerts={activeAlerts}
                onAcknowledge={handleAcknowledge}
                onReset={handleReset}
              />
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">
                  <PlaneTakeoff size={18} />
                  Flight Operations
                </h2>
                <button className="link-btn">
                  View All <ChevronDown size={14} />
                </button>
              </div>
              <FlightsTable flights={flights} />
            </div>
          </>
        );
      case "flights":
        return (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <PlaneTakeoff size={18} />
                Flight Operations
              </h2>
            </div>
            <FlightsTable flights={flights} />
          </div>
        );
      case "resources":
        return <ResourcePlanning />;
      case "performance":
        return (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <Activity size={18} />
                Operational Performance
              </h2>
            </div>
            <OperationalMetrics metrics={operationalMetrics} />
          </div>
        );
      default:
        return null;
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Gauge },
    { id: "flights", label: "Flights", icon: PlaneTakeoff },
    { id: "resources", label: "Resource Planning", icon: Users },
    { id: "performance", label: "Performance", icon: Activity }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="modern-app-container">
      {/* Top Navigation Bar */}
      <header className="top-navigation">
        <div className="logo-section">
          <div className="logo-badge animated-logo">
            <PlaneTakeoff size={20} />
          </div>
          <h1 className="logo-text">AeroIQ AI</h1>
        </div>
        
        <nav className="main-navigation">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                className={`nav-tab ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.id === "dashboard" && isActive && (
                  <span className="nav-indicator"></span>
                )}
              </button>
            );
          })}
        </nav>
        
        <div className="action-section">
          <div className="search-wrapper">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>
          
          <button className="notification-button">
            <Bell size={20} />
            {activeAlerts.length > 0 && (
              <span className="notification-badge">{activeAlerts.length}</span>
            )}
          </button>
          
          <button onClick={handleReset} className="reset-button">
            Reset Demo
          </button>
          
          <div className="user-profile" onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <img 
              src="https://ui-avatars.com/api/?name=Pilot+User&background=0D8ABC&color=fff" 
              alt="User" 
              className="user-avatar"
            />
          </div>
        </div>
        
        {/* Mobile Menu Button - only visible on small screens */}
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-navigation ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <div className="logo-badge animated-logo">
            <PlaneTakeoff size={20} />
          </div>
          <h1 className="logo-text">AeroIQ AI</h1>
          <button className="close-menu-button" onClick={toggleMobileMenu}>
            <X size={24} />
          </button>
        </div>
        
        <div className="mobile-nav-content">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  toggleMobileMenu();
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="mobile-nav-footer">
            <button className="mobile-action-button">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <main className="content-area">
        <div className="page-header">
          <h1 className="page-title">{navItems.find(item => item.id === activeTab)?.label}</h1>
          <p className="current-date">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        
        <div className="page-content">
          {renderContent()}
        </div>
      </main>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-overlay ${mobileMenuOpen ? 'visible' : ''}`} 
        onClick={toggleMobileMenu}
      ></div>

      {/* AI Chatbot that floats over all pages */}
      <ReactChatBot />
    </div>
  );
}

export default AirlineDecisionDashboard;

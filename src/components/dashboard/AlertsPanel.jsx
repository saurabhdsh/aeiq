import React from "react";
import { Bell, AlertTriangle, Info, Check } from "lucide-react";

const AlertsPanel = ({ alerts, onAcknowledge }) => {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="card-body text-center">
        <Bell size={24} className="mx-auto mb-2" style={{ color: "var(--gray-300)" }} />
        <p style={{ color: "var(--gray-500)" }}>No active alerts at this time.</p>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "error":
        return <AlertTriangle size={16} style={{ color: "var(--danger)" }} />;
      case "warning":
        return <AlertTriangle size={16} style={{ color: "var(--warning)" }} />;
      case "info":
        return <Info size={16} style={{ color: "var(--primary)" }} />;
      case "success":
        return <Check size={16} style={{ color: "var(--success)" }} />;
      default:
        return <Info size={16} style={{ color: "var(--gray-500)" }} />;
    }
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
    <div>
      {alerts.map((alert) => (
        <div key={alert.id} className="alert">
          <div className="alert-header">
            <div className="alert-type">
              {getStatusIcon(alert.status)} {alert.type}
            </div>
            <div className="alert-meta">
              <span className={getImpactBadgeClass(alert.impact)}>
                {alert.impact}
              </span>
              <span className="alert-time">{alert.time}</span>
            </div>
          </div>
          <p className="alert-message">
            {alert.message}
          </p>
          <div className="alert-actions">
            {alert.actions && alert.actions.map((action, index) => (
              <button
                key={index}
                className="action-btn"
              >
                {action}
              </button>
            ))}
            <button 
              onClick={() => onAcknowledge(alert.id)}
              className="action-btn acknowledge-btn"
            >
              Acknowledge
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertsPanel; 
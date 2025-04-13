import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement 
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Users, 
  PlaneTakeoff, 
  Wrench, 
  Brain, 
  Activity, 
  ChevronDown,
  ChevronRight,
  Calendar,
  Clock3,
  Plane,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
  AlertTriangle
} from 'lucide-react';
import CrewManagementSystem from '../CrewManagementSystem/CrewManagementSystem';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ResourcePlanning = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [resourceMetrics, setResourceMetrics] = useState({
    crewUtilization: 75,
    aircraftUtilization: 82,
    groundStaffUtilization: 68,
    maintenanceEfficiency: 88
  });

  // Simulated AI-generated suggestions
  useEffect(() => {
    const suggestions = [
      {
        type: 'optimization',
        title: 'Crew Scheduling Optimization',
        description: 'AI suggests reallocating 3 crew members to reduce layover times by 15%',
        impact: 'High',
        priority: 'Urgent',
        icon: Users
      },
      {
        type: 'prediction',
        title: 'Maintenance Prediction',
        description: 'Predictive maintenance suggests servicing 2 aircraft next week',
        impact: 'Medium',
        priority: 'Important',
        icon: Wrench
      },
      {
        type: 'efficiency',
        title: 'Ground Staff Allocation',
        description: 'AI recommends adjusting ground staff shifts for peak hours',
        impact: 'Medium',
        priority: 'Important',
        icon: Clock
      }
    ];
    setAiSuggestions(suggestions);
  }, []);

  const resourceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Crew Utilization',
        data: [70, 75, 80, 78, 82, 75, 70],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4
      },
      {
        label: 'Aircraft Utilization',
        data: [75, 78, 82, 80, 85, 80, 75],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4
      }
    ]
  };

  const distributionData = {
    labels: ['Crew', 'Aircraft', 'Ground Staff', 'Maintenance'],
    datasets: [{
      data: [30, 25, 25, 20],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ]
    }]
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Resource Metrics Grid */}
        <div className="grid grid-cols-4">
          <div className="summary-card">
            <div className="icon-circle icon-blue">
              <Users size={20} />
            </div>
            <div className="summary-content">
              <h3>Crew Utilization</h3>
              <div className="summary-value">{resourceMetrics.crewUtilization}%</div>
              <div className="trend trend-up">
                <Activity size={16} />
                <span>+2.1% from yesterday</span>
              </div>
            </div>
          </div>

          <div className="summary-card">
            <div className="icon-circle icon-indigo">
              <PlaneTakeoff size={20} />
            </div>
            <div className="summary-content">
              <h3>Aircraft Utilization</h3>
              <div className="summary-value">{resourceMetrics.aircraftUtilization}%</div>
              <div className="trend trend-up">
                <Activity size={16} />
                <span>+1.5% from yesterday</span>
              </div>
            </div>
          </div>

          <div className="summary-card">
            <div className="icon-circle icon-amber">
              <Users size={20} />
            </div>
            <div className="summary-content">
              <h3>Ground Staff</h3>
              <div className="summary-value">{resourceMetrics.groundStaffUtilization}%</div>
              <div className="trend trend-down">
                <Activity size={16} />
                <span>-0.8% from yesterday</span>
              </div>
            </div>
          </div>

          <div className="summary-card">
            <div className="icon-circle icon-emerald">
              <Wrench size={20} />
            </div>
            <div className="summary-content">
              <h3>Maintenance</h3>
              <div className="summary-value">{resourceMetrics.maintenanceEfficiency}%</div>
              <div className="trend trend-up">
                <Activity size={16} />
                <span>+1.2% from yesterday</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              AI Insights
            </h2>
          </div>
          <AlertsPanel alerts={aiSuggestions} />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <Activity size={18} />
                Resource Utilization
              </h2>
            </div>
            <div className="p-4">
              <div className="h-[250px]">
                <Line data={resourceData} options={{ 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    }
                  }
                }} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <PlaneTakeoff size={18} />
                Resource Distribution
              </h2>
            </div>
            <div className="p-4">
              <div className="h-[250px]">
                <Doughnut data={distributionData} options={{ 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    }
                  }
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Crew Management System */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              <Users size={18} />
              Crew Management System
            </h2>
          </div>
          <div className="p-4">
            <CrewManagementSystem />
          </div>
        </div>
      </div>
    </div>
  );
};

const AlertsPanel = ({ alerts }) => {
  const [expandedAlert, setExpandedAlert] = useState(null);

  if (!alerts || alerts.length === 0) {
    return (
      <div className="card-body text-center">
        <Brain size={24} className="mx-auto mb-2" style={{ color: "var(--gray-300)" }} />
        <p style={{ color: "var(--gray-500)" }}>No AI insights available at this time.</p>
      </div>
    );
  }

  const getStatusIcon = (type) => {
    switch (type) {
      case 'optimization':
        return <Users size={16} style={{ color: "var(--primary)" }} />;
      case 'prediction':
        return <Wrench size={16} style={{ color: "var(--warning)" }} />;
      case 'efficiency':
        return <Clock size={16} style={{ color: "var(--success)" }} />;
      default:
        return <Brain size={16} style={{ color: "var(--gray-500)" }} />;
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

  const getDetailedContent = (alert) => {
    switch (alert.type) {
      case 'optimization':
        return (
          <div className="alert-details bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
            <div className="details-section">
              <h4 className="details-title text-lg font-semibold text-blue-900 flex items-center gap-2">
                <Calendar className="text-blue-600" size={18} />
                Current Crew Distribution
              </h4>
              <div className="details-stats">
                <div className="stat-item bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                  <Calendar size={16} className="text-blue-500" />
                  <span className="font-medium">Morning Shift: <span className="text-blue-600">45</span> crew members</span>
                </div>
                <div className="stat-item bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                  <Clock3 size={16} className="text-blue-500" />
                  <span className="font-medium">Evening Shift: <span className="text-blue-600">38</span> crew members</span>
                </div>
                <div className="stat-item bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                  <Plane size={16} className="text-blue-500" />
                  <span className="font-medium">On Layover: <span className="text-blue-600">12</span> crew members</span>
                </div>
              </div>
            </div>
            <div className="details-section mt-6">
              <h4 className="details-title text-lg font-semibold text-blue-900 flex items-center gap-2">
                <Brain className="text-blue-600" size={18} />
                AI Recommendations
              </h4>
              <div className="recommendations space-y-3">
                <div className="recommendation bg-white p-4 rounded-lg shadow-sm border border-green-100">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-1" />
                  <span className="text-gray-700">Reassign <span className="font-semibold text-green-600">2 crew members</span> from morning to evening shift</span>
                </div>
                <div className="recommendation bg-white p-4 rounded-lg shadow-sm border border-green-100">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-1" />
                  <span className="text-gray-700">Reduce layover duration by <span className="font-semibold text-green-600">6 hours</span> for select routes</span>
                </div>
                <div className="recommendation bg-white p-4 rounded-lg shadow-sm border border-amber-100">
                  <AlertCircle size={16} className="text-amber-500 shrink-0 mt-1" />
                  <span className="text-gray-700">Consider hiring <span className="font-semibold text-amber-600">3 additional crew members</span> for peak season</span>
                </div>
              </div>
            </div>
            <div className="details-section mt-6">
              <h4 className="details-title text-lg font-semibold text-blue-900 flex items-center gap-2">
                <Activity className="text-blue-600" size={18} />
                Expected Impact
              </h4>
              <div className="impact-metrics">
                <div className="metric bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
                  <DollarSign size={16} className="text-emerald-500" />
                  <div className="flex flex-col">
                    <span className="text-emerald-600 font-bold">$45,000</span>
                    <span className="text-sm text-gray-600">Monthly Savings</span>
                  </div>
                </div>
                <div className="metric bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                  <Clock size={16} className="text-blue-500" />
                  <div className="flex flex-col">
                    <span className="text-blue-600 font-bold">15%</span>
                    <span className="text-sm text-gray-600">Idle Time Reduction</span>
                  </div>
                </div>
                <div className="metric bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                  <Users size={16} className="text-indigo-500" />
                  <div className="flex flex-col">
                    <span className="text-indigo-600 font-bold">12%</span>
                    <span className="text-sm text-gray-600">Satisfaction Increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'prediction':
        return (
          <div className="alert-details bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg">
            <div className="details-section">
              <h4 className="details-title text-lg font-semibold text-amber-900 flex items-center gap-2">
                <Wrench className="text-amber-600" size={18} />
                Maintenance Analysis
              </h4>
              <div className="details-stats">
                <div className="stat-item bg-white p-4 rounded-lg shadow-sm border border-amber-100">
                  <Plane size={16} className="text-amber-500" />
                  <span className="font-medium">Aircraft Affected: <span className="text-amber-600">A320 (2), B737 (1)</span></span>
                </div>
                <div className="stat-item bg-white p-4 rounded-lg shadow-sm border border-amber-100">
                  <Calendar size={16} className="text-amber-500" />
                  <span className="font-medium">Timeline: <span className="text-amber-600">Next 7-10 days</span></span>
                </div>
                <div className="stat-item bg-white p-4 rounded-lg shadow-sm border border-amber-100">
                  <Clock3 size={16} className="text-amber-500" />
                  <span className="font-medium">Downtime: <span className="text-amber-600">48-72 hours</span></span>
                </div>
              </div>
            </div>
            <div className="details-section mt-6">
              <h4 className="details-title text-lg font-semibold text-amber-900 flex items-center gap-2">
                <Activity className="text-amber-600" size={18} />
                Component Analysis
              </h4>
              <div className="recommendations space-y-3">
                <div className="recommendation bg-white p-4 rounded-lg shadow-sm border border-red-100">
                  <XCircle size={16} className="text-red-500 shrink-0 mt-1" />
                  <span className="text-gray-700">Engine 2 showing <span className="font-semibold text-red-600">early signs of performance degradation</span></span>
                </div>
                <div className="recommendation bg-white p-4 rounded-lg shadow-sm border border-amber-100">
                  <AlertCircle size={16} className="text-amber-500 shrink-0 mt-1" />
                  <span className="text-gray-700">Landing gear requires <span className="font-semibold text-amber-600">preventive maintenance</span></span>
                </div>
                <div className="recommendation bg-white p-4 rounded-lg shadow-sm border border-green-100">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-1" />
                  <span className="text-gray-700">Avionics systems <span className="font-semibold text-green-600">operating normally</span></span>
                </div>
              </div>
            </div>
            <div className="details-section mt-6">
              <h4 className="details-title text-lg font-semibold text-amber-900 flex items-center gap-2">
                <AlertTriangle className="text-amber-600" size={18} />
                Risk Assessment
              </h4>
              <div className="impact-metrics">
                <div className="metric bg-white p-4 rounded-lg shadow-sm border border-red-100">
                  <DollarSign size={16} className="text-red-500" />
                  <div className="flex flex-col">
                    <span className="text-red-600 font-bold">$120,000</span>
                    <span className="text-sm text-gray-600">Potential Cost</span>
                  </div>
                </div>
                <div className="metric bg-white p-4 rounded-lg shadow-sm border border-amber-100">
                  <Clock size={16} className="text-amber-500" />
                  <div className="flex flex-col">
                    <span className="text-amber-600 font-bold">3 Flights</span>
                    <span className="text-sm text-gray-600">Schedule Impact</span>
                  </div>
                </div>
                <div className="metric bg-white p-4 rounded-lg shadow-sm border border-green-100">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <div className="flex flex-col">
                    <span className="text-green-600 font-bold">Minimal</span>
                    <span className="text-sm text-gray-600">Safety Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'efficiency':
        return (
          <div className="alert-details bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-lg">
            <div className="details-section">
              <h4 className="details-title text-lg font-semibold text-emerald-900 flex items-center gap-2">
                <Users className="text-emerald-600" size={18} />
                Ground Staff Analysis
              </h4>
              <div className="details-stats">
                <div className="stat-item bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
                  <Users size={16} className="text-emerald-500" />
                  <span className="font-medium">Total Staff: <span className="text-emerald-600">120</span> members</span>
                </div>
                <div className="stat-item bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
                  <Clock3 size={16} className="text-emerald-500" />
                  <span className="font-medium">Peak Hours: <span className="text-emerald-600">06:00-10:00, 16:00-20:00</span></span>
                </div>
                <div className="stat-item bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
                  <Activity size={16} className="text-emerald-500" />
                  <span className="font-medium">Utilization: <span className="text-emerald-600">68%</span></span>
                </div>
              </div>
            </div>
            <div className="details-section mt-6">
              <h4 className="details-title text-lg font-semibold text-emerald-900 flex items-center gap-2">
                <Brain className="text-emerald-600" size={18} />
                Optimization Suggestions
              </h4>
              <div className="recommendations space-y-3">
                <div className="recommendation bg-white p-4 rounded-lg shadow-sm border border-green-100">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-1" />
                  <span className="text-gray-700">Increase staff by <span className="font-semibold text-green-600">30%</span> during peak hours</span>
                </div>
                <div className="recommendation bg-white p-4 rounded-lg shadow-sm border border-green-100">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-1" />
                  <span className="text-gray-700">Implement <span className="font-semibold text-green-600">flexible shift scheduling</span></span>
                </div>
                <div className="recommendation bg-white p-4 rounded-lg shadow-sm border border-amber-100">
                  <AlertCircle size={16} className="text-amber-500 shrink-0 mt-1" />
                  <span className="text-gray-700">Cross-train staff for <span className="font-semibold text-amber-600">multiple roles</span></span>
                </div>
              </div>
            </div>
            <div className="details-section mt-6">
              <h4 className="details-title text-lg font-semibold text-emerald-900 flex items-center gap-2">
                <Activity className="text-emerald-600" size={18} />
                Expected Outcomes
              </h4>
              <div className="impact-metrics">
                <div className="metric bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
                  <Clock size={16} className="text-emerald-500" />
                  <div className="flex flex-col">
                    <span className="text-emerald-600 font-bold">25%</span>
                    <span className="text-sm text-gray-600">Turnaround Reduction</span>
                  </div>
                </div>
                <div className="metric bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                  <Users size={16} className="text-blue-500" />
                  <div className="flex flex-col">
                    <span className="text-blue-600 font-bold">85%</span>
                    <span className="text-sm text-gray-600">Staff Utilization</span>
                  </div>
                </div>
                <div className="metric bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                  <DollarSign size={16} className="text-indigo-500" />
                  <div className="flex flex-col">
                    <span className="text-indigo-600 font-bold">$28,000</span>
                    <span className="text-sm text-gray-600">Monthly Savings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {alerts.map((alert) => (
        <div key={alert.type} className="alert">
          <div className="alert-header">
            <div className="alert-type">
              {getStatusIcon(alert.type)} {alert.type}
            </div>
            <div className="alert-meta">
              <span className={getImpactBadgeClass(alert.impact)}>
                {alert.impact}
              </span>
              <span className={`impact-badge ${
                alert.priority === 'Urgent' ? 'impact-high' : 'impact-medium'
              }`}>
                {alert.priority}
              </span>
            </div>
          </div>
          <p className="alert-message">
            {alert.description}
          </p>
          <div className="alert-actions">
            <button 
              className="action-btn text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
              onClick={() => setExpandedAlert(expandedAlert === alert.type ? null : alert.type)}
            >
              {expandedAlert === alert.type ? 'Hide Details' : 'View Details'}
              {expandedAlert === alert.type ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            <button className="action-btn acknowledge-btn">
              Dismiss
            </button>
          </div>
          {expandedAlert === alert.type && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 border-t border-gray-100 pt-4"
            >
              {getDetailedContent(alert)}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

// Add these styles to your CSS
const styles = `
.alert-details {
  @apply space-y-6;
}

.details-section {
  @apply space-y-3;
}

.details-title {
  @apply text-sm font-medium text-gray-900;
}

.details-stats {
  @apply grid grid-cols-1 md:grid-cols-3 gap-4;
}

.stat-item {
  @apply flex items-center gap-2 text-sm text-gray-600;
}

.recommendations {
  @apply space-y-2;
}

.recommendation {
  @apply flex items-start gap-2 text-sm text-gray-600;
}

.impact-metrics {
  @apply grid grid-cols-1 md:grid-cols-3 gap-4;
}

.metric {
  @apply flex items-center gap-2 text-sm font-medium;
}

.action-btn {
  @apply flex items-center gap-1;
}
`;

export default ResourcePlanning; 
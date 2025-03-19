import React from 'react';
import { LineChart, BarChart2, Percent, DollarSign, Clock, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Gauge, Calendar, BarChart } from 'lucide-react';

const MetricCard = ({ title, value, target, icon, description, trend = 0, suffix = '%' }) => {
  const Icon = icon;
  const isPositive = trend >= 0;
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <div className="flex items-baseline mt-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">{suffix}</span>
          </div>
          
          {target && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Target: {target}{suffix}</span>
                <span className={`text-xs flex items-center ${
                  value >= target 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-amber-600 dark:text-amber-400'
                }`}>
                  {value >= target ? (
                    <>
                      <ArrowUpRight className="w-3 h-3 mr-0.5" />
                      {((value - target) / target * 100).toFixed(1)}%
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="w-3 h-3 mr-0.5" />
                      {((target - value) / target * 100).toFixed(1)}%
                    </>
                  )}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${value >= target ? 'bg-green-500' : 'bg-amber-500'}`}
                  style={{ width: `${Math.min(100, (value / target) * 100)}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {trend !== 0 && (
            <div className="flex items-center mt-2">
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 text-green-500 dark:text-green-400" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
              )}
              <span className={`text-xs ml-1 ${
                isPositive 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {Math.abs(trend)}% from previous period
              </span>
            </div>
          )}
        </div>
        
        <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30">
          <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
        </div>
      </div>
    </div>
  );
};

const FinancialMetric = ({ title, actual, target, color }) => {
  const percentage = Math.min(100, Math.round((actual / target) * 100));
  const diff = ((actual - target) / target * 100).toFixed(1);
  const isPositive = actual >= target;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
          <span className={`ml-2 text-xs flex items-center ${
            isPositive 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {isPositive ? (
              <>
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
                {diff}%
              </>
            ) : (
              <>
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
                {Math.abs(diff)}%
              </>
            )}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-900 dark:text-white">${actual.toLocaleString()}</span>
          <span className="mx-1 text-xs text-gray-500 dark:text-gray-400">of</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">${target.toLocaleString()}</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const OperationalMetrics = ({ metrics }) => {
  // Trend indicator component
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

  // Metric Card Component
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

  // Simple bar chart
  const SimpleBarChart = ({ data }) => {
    const maxValue = Math.max(...data.map(d => Math.max(d.onTime, d.fuel, d.crew)));
    const scale = 100 / maxValue;

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
            {data.map((day, i) => (
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
                      height: `${day.onTime * scale}px` 
                    }}
                  ></div>
                  <div 
                    style={{ 
                      flex: "1", 
                      backgroundColor: "var(--success)", 
                      borderTopLeftRadius: "2px", 
                      borderTopRightRadius: "2px",
                      height: `${day.fuel * scale}px` 
                    }}
                  ></div>
                  <div 
                    style={{ 
                      flex: "1", 
                      backgroundColor: "var(--secondary)", 
                      borderTopLeftRadius: "2px", 
                      borderTopRightRadius: "2px",
                      height: `${day.crew * scale}px` 
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

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
        <MetricCard 
          title="On-Time Performance" 
          value={metrics.onTimePerformance}
          icon={Gauge}
          trend={2.3}
          color="blue"
        />
        <MetricCard 
          title="Fuel Efficiency" 
          value={metrics.fuelEfficiency}
          icon={Gauge}
          trend={1.6}
          color="emerald"
        />
        <MetricCard 
          title="Crew Utilization" 
          value={metrics.crewUtilization}
          icon={Users}
          trend={0.5}
          color="indigo"
        />
        <MetricCard 
          title="Load Factor" 
          value={metrics.loadFactor}
          icon={Calendar}
          trend={-0.8}
          color="amber"
        />
      </div>

      <SimpleBarChart data={metrics.dailyMetrics} />
    </div>
  );
};

export default OperationalMetrics; 
// Mock data for airline dashboard

export const alerts = [
  {
    id: 1,
    status: 'error',
    type: 'Weather Alert',
    message: 'Severe thunderstorms approaching DFW, potential delays for flights AA1234, AA5678',
    impact: 'High',
    time: '10 mins ago',
    actions: ['Reroute', 'Delay', 'Cancel']
  },
  {
    id: 2,
    status: 'warning',
    type: 'Maintenance Alert',
    message: 'Routine maintenance check overdue for aircraft N12345 by 2 days',
    impact: 'Medium',
    time: '32 mins ago',
    actions: ['Schedule', 'Defer', 'Replace']
  },
  {
    id: 3,
    status: 'error',
    type: 'Crew Alert',
    message: 'Flight crew approaching duty time limits for flight UA789',
    impact: 'High',
    time: '1 hour ago',
    actions: ['Reassign', 'Adjust Schedule']
  },
  {
    id: 4,
    status: 'warning',
    type: 'Fuel Optimization',
    message: 'Fuel consumption for route LAX-JFK 12% above optimal',
    impact: 'Medium',
    time: '3 hours ago',
    actions: ['Adjust', 'Analyze', 'Monitor']
  },
  {
    id: 5,
    status: 'info',
    type: 'Passenger Alert',
    message: 'VIP passenger on flight DL456 requires special assistance',
    impact: 'Low',
    time: '4 hours ago',
    actions: ['Notify Crew', 'Update']
  }
];

export const flights = [
  {
    id: 'AA1234',
    origin: 'JFK',
    originFull: 'John F. Kennedy International',
    destination: 'LAX',
    destinationFull: 'Los Angeles International',
    scheduledDeparture: '08:30 AM',
    scheduledArrival: '11:45 AM',
    status: 'On Time',
    aircraft: 'Boeing 787',
    gate: 'B12',
    risk: 'Low',
    distance: '2,475 NM',
    registration: 'N123AA'
  },
  {
    id: 'UA789',
    origin: 'ORD',
    originFull: "Chicago O'Hare International",
    destination: 'SFO',
    destinationFull: 'San Francisco International',
    scheduledDeparture: '09:15 AM',
    scheduledArrival: '12:05 PM',
    status: 'Delayed',
    aircraft: 'Airbus A320',
    gate: 'C04',
    risk: 'High',
    distance: '1,846 NM',
    registration: 'N456UA'
  },
  {
    id: 'DL456',
    origin: 'ATL',
    originFull: 'Hartsfield-Jackson Atlanta',
    destination: 'MIA',
    destinationFull: 'Miami International',
    scheduledDeparture: '10:00 AM',
    scheduledArrival: '11:50 AM',
    status: 'On Time',
    aircraft: 'Boeing 737',
    gate: 'D22',
    risk: 'Low',
    distance: '594 NM',
    registration: 'N789DL'
  },
  {
    id: 'AA5678',
    origin: 'DFW',
    originFull: 'Dallas/Fort Worth International',
    destination: 'LGA',
    destinationFull: 'LaGuardia Airport',
    scheduledDeparture: '11:20 AM',
    scheduledArrival: '03:35 PM',
    status: 'Warning',
    aircraft: 'Boeing 777',
    gate: 'A08',
    risk: 'Medium',
    distance: '1,389 NM',
    registration: 'N321AA'
  },
  {
    id: 'WN392',
    origin: 'MDW',
    originFull: 'Chicago Midway International',
    destination: 'PHX',
    destinationFull: 'Phoenix Sky Harbor',
    scheduledDeparture: '12:45 PM',
    scheduledArrival: '03:30 PM',
    status: 'On Time',
    aircraft: 'Boeing 737',
    gate: 'B04',
    risk: 'Low',
    distance: '1,445 NM',
    registration: 'N567WN'
  },
  {
    id: 'B6801',
    origin: 'BOS',
    originFull: 'Boston Logan International',
    destination: 'LAX',
    destinationFull: 'Los Angeles International',
    scheduledDeparture: '02:15 PM',
    scheduledArrival: '06:00 PM',
    status: 'On Time',
    aircraft: 'Airbus A321',
    gate: 'C12',
    risk: 'Low',
    distance: '2,611 NM',
    registration: 'N234JB'
  }
];

export const scenarios = [
  {
    id: 1,
    name: 'Weather Diversion',
    description: 'Simulates emergency diversion due to severe weather at destination',
    variables: ['Wind Speed', 'Visibility', 'Ceiling'],
    impact: 'High',
    lastRun: '2023-03-15'
  },
  {
    id: 2,
    name: 'Fuel Optimization',
    description: 'Optimize fuel load based on weather, payload, and route',
    variables: ['Route', 'Payload', 'Weather', 'Fuel Price'],
    impact: 'Medium',
    lastRun: '2023-03-18'
  },
  {
    id: 3,
    name: 'Crew Scheduling',
    description: 'Optimize crew scheduling to minimize costs while maintaining compliance',
    variables: ['Duty Hours', 'Rest Requirements', 'Base Location'],
    impact: 'Medium',
    lastRun: '2023-03-17'
  },
  {
    id: 4,
    name: 'Maintenance Impact',
    description: 'Assess impact of unscheduled maintenance on daily operations',
    variables: ['Aircraft Type', 'Maintenance Duration', 'Spare Availability'],
    impact: 'High',
    lastRun: '2023-03-16'
  }
];

export const operationalMetrics = {
  onTimePerformance: 87.5,
  fuelEfficiency: 92.3,
  crewUtilization: 84.1,
  customerSatisfaction: 79.8,
  maintenanceCompliance: 98.2,
  fleetUtilization: 76.4,
  loadFactor: 83.9,
  costIndex: 78.5,
  dailyMetrics: [
    { date: '03/14', onTime: 85.2, fuel: 90.1, crew: 82.5 },
    { date: '03/15', onTime: 83.7, fuel: 91.0, crew: 81.9 },
    { date: '03/16', onTime: 86.3, fuel: 91.8, crew: 83.4 },
    { date: '03/17', onTime: 84.9, fuel: 92.0, crew: 83.7 },
    { date: '03/18', onTime: 85.8, fuel: 91.5, crew: 84.0 },
    { date: '03/19', onTime: 87.5, fuel: 92.3, crew: 84.1 }
  ]
}; 
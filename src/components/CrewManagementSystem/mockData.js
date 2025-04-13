export const mockCrewData = [
  {
    id: 1,
    name: 'John Smith',
    role: 'Pilot',
    experience: '15 years',
    status: 'Available'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Co-Pilot',
    experience: '8 years',
    status: 'Available'
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Flight Attendant',
    experience: '5 years',
    status: 'Available'
  }
];

export const mockMissionData = [
  {
    id: 1,
    name: 'Flight AA123',
    type: 'Domestic',
    duration: '3 hours',
    complexity: 'Medium'
  },
  {
    id: 2,
    name: 'Flight BA456',
    type: 'International',
    duration: '8 hours',
    complexity: 'High'
  },
  {
    id: 3,
    name: 'Flight DL789',
    type: 'Domestic',
    duration: '2 hours',
    complexity: 'Low'
  }
];

export const mockAIService = {
  predictFatigue: (crewId) => {
    return {
      score: 0.75,
      level: 'medium',
      factors: ['Recent long-haul flights', 'Short rest periods']
    };
  },

  findBestMatches: (missionId) => {
    return [
      {
        id: 1,
        name: 'John Smith',
        match_score: 0.95,
        years_experience: 15,
        flight_hours: 12000
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        match_score: 0.88,
        years_experience: 8,
        flight_hours: 6000
      },
      {
        id: 3,
        name: 'Michael Brown',
        match_score: 0.82,
        years_experience: 5,
        flight_hours: 3000
      }
    ];
  },

  calculateRisk: (crewId) => {
    return {
      score: 0.65,
      level: 'medium',
      factors: ['Weather conditions', 'Aircraft maintenance', 'Crew fatigue']
    };
  },

  generateSchedule: () => {
    // Generate a week's worth of schedule data
    const today = new Date();
    const schedule = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      schedule.push({
        date: date.toISOString().split('T')[0],
        assignments: [
          {
            id: 1,
            mission_type: 'Flight AA123',
            crew_name: 'John Smith',
            start_time: '08:00',
            end_time: '11:00',
            status: 'Scheduled'
          },
          {
            id: 2,
            mission_type: 'Flight BA456',
            crew_name: 'Sarah Johnson',
            start_time: '14:00',
            end_time: '22:00',
            status: 'Scheduled'
          },
          {
            id: 3,
            mission_type: 'Flight DL789',
            crew_name: 'Michael Brown',
            start_time: '10:00',
            end_time: '12:00',
            status: 'Scheduled'
          }
        ]
      });
    }
    
    return schedule;
  }
}; 
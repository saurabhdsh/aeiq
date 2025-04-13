from typing import List, Dict, Any
from ortools.sat.python import cp_model
from datetime import datetime, timedelta
import numpy as np

class ScheduleOptimization:
    def __init__(self):
        self.model = cp_model.CpModel()
        self.solver = cp_model.CpSolver()
        
    def create_schedule(self, 
                       crew_data: List[Dict[str, Any]], 
                       mission_data: List[Dict[str, Any]], 
                       constraints: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Create optimized crew schedule based on constraints"""
        # Initialize variables
        num_crew = len(crew_data)
        num_missions = len(mission_data)
        num_days = constraints['schedule_days']
        
        # Create decision variables
        assignments = {}
        for c in range(num_crew):
            for m in range(num_missions):
                for d in range(num_days):
                    assignments[(c, m, d)] = self.model.NewBoolVar(f'crew_{c}_mission_{m}_day_{d}')
        
        # Add constraints
        self._add_constraints(assignments, crew_data, mission_data, constraints)
        
        # Set objective
        self._set_objective(assignments, crew_data, mission_data)
        
        # Solve
        status = self.solver.Solve(self.model)
        
        if status == cp_model.OPTIMAL or status == cp_model.FEASIBLE:
            return self._extract_solution(assignments, crew_data, mission_data, num_days)
        else:
            raise ValueError("No feasible solution found")
    
    def _add_constraints(self, 
                        assignments: Dict[tuple, Any], 
                        crew_data: List[Dict[str, Any]], 
                        mission_data: List[Dict[str, Any]], 
                        constraints: Dict[str, Any]) -> None:
        """Add constraints to the optimization model"""
        num_crew = len(crew_data)
        num_missions = len(mission_data)
        num_days = constraints['schedule_days']
        
        # Each mission must be assigned to exactly one crew member per day
        for m in range(num_missions):
            for d in range(num_days):
                self.model.Add(
                    sum(assignments[(c, m, d)] for c in range(num_crew)) == 1
                )
        
        # Each crew member can work at most one mission per day
        for c in range(num_crew):
            for d in range(num_days):
                self.model.Add(
                    sum(assignments[(c, m, d)] for m in range(num_missions)) <= 1
                )
        
        # Maximum consecutive working days
        max_consecutive_days = constraints.get('max_consecutive_days', 5)
        for c in range(num_crew):
            for d in range(num_days - max_consecutive_days):
                self.model.Add(
                    sum(assignments[(c, m, d + i)] for m in range(num_missions) for i in range(max_consecutive_days + 1)) <= max_consecutive_days
                )
        
        # Minimum rest period between missions
        min_rest_days = constraints.get('min_rest_days', 1)
        for c in range(num_crew):
            for d in range(num_days - min_rest_days):
                for m1 in range(num_missions):
                    for m2 in range(num_missions):
                        if m1 != m2:
                            self.model.Add(
                                assignments[(c, m1, d)] + assignments[(c, m2, d + min_rest_days)] <= 1
                            )
    
    def _set_objective(self, 
                      assignments: Dict[tuple, Any], 
                      crew_data: List[Dict[str, Any]], 
                      mission_data: List[Dict[str, Any]]) -> None:
        """Set optimization objective"""
        # Maximize crew preference satisfaction
        preference_score = 0
        for c in range(len(crew_data)):
            for m in range(len(mission_data)):
                for d in range(len(assignments) // (len(crew_data) * len(mission_data))):
                    if crew_data[c]['preferred_mission_types'] == mission_data[m]['type']:
                        preference_score += assignments[(c, m, d)]
        
        self.model.Maximize(preference_score)
    
    def _extract_solution(self, 
                         assignments: Dict[tuple, Any], 
                         crew_data: List[Dict[str, Any]], 
                         mission_data: List[Dict[str, Any]], 
                         num_days: int) -> List[Dict[str, Any]]:
        """Extract solution from the solver"""
        schedule = []
        base_date = datetime.now()
        
        for d in range(num_days):
            day_schedule = {
                'date': (base_date + timedelta(days=d)).strftime('%Y-%m-%d'),
                'assignments': []
            }
            
            for c in range(len(crew_data)):
                for m in range(len(mission_data)):
                    if self.solver.Value(assignments[(c, m, d)]) == 1:
                        day_schedule['assignments'].append({
                            'crew_id': crew_data[c]['id'],
                            'crew_name': crew_data[c]['name'],
                            'mission_id': mission_data[m]['id'],
                            'mission_type': mission_data[m]['type'],
                            'start_time': mission_data[m]['start_time'],
                            'end_time': mission_data[m]['end_time']
                        })
            
            schedule.append(day_schedule)
        
        return schedule
    
    def _generate_sample_data(self) -> tuple:
        """Generate sample data for testing"""
        crew_data = [
            {
                'id': 'C001',
                'name': 'John Doe',
                'preferred_mission_types': ['short_haul', 'domestic'],
                'max_consecutive_days': 5,
                'min_rest_days': 1
            },
            {
                'id': 'C002',
                'name': 'Jane Smith',
                'preferred_mission_types': ['long_haul', 'international'],
                'max_consecutive_days': 4,
                'min_rest_days': 2
            },
            {
                'id': 'C003',
                'name': 'Mike Johnson',
                'preferred_mission_types': ['short_haul'],
                'max_consecutive_days': 6,
                'min_rest_days': 1
            }
        ]
        
        mission_data = [
            {
                'id': 'M001',
                'type': 'short_haul',
                'start_time': '08:00',
                'end_time': '12:00'
            },
            {
                'id': 'M002',
                'type': 'long_haul',
                'start_time': '14:00',
                'end_time': '22:00'
            },
            {
                'id': 'M003',
                'type': 'domestic',
                'start_time': '10:00',
                'end_time': '14:00'
            }
        ]
        
        constraints = {
            'schedule_days': 7,
            'max_consecutive_days': 5,
            'min_rest_days': 1
        }
        
        return crew_data, mission_data, constraints 
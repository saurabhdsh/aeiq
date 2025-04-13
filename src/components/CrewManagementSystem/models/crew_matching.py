import numpy as np
from typing import List, Dict, Any
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
import pandas as pd

class CrewMissionMatching:
    def __init__(self):
        self.scaler = StandardScaler()
        self.preprocessor = None
        self.crew_features = None
        
    def preprocess_features(self, crew_data: List[Dict[str, Any]], mission_data: Dict[str, Any]) -> tuple:
        """Preprocess crew and mission features for matching"""
        # Define numerical and categorical features
        numerical_features = [
            'years_experience',
            'flight_hours',
            'training_score'
        ]
        
        categorical_features = [
            'certifications',
            'aircraft_types',
            'mission_preferences'
        ]
        
        # Create preprocessor
        self.preprocessor = ColumnTransformer(
            transformers=[
                ('num', self.scaler, numerical_features),
                ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
            ]
        )
        
        # Prepare crew data
        crew_df = pd.DataFrame(crew_data)
        crew_features = self.preprocessor.fit_transform(crew_df)
        
        # Prepare mission data
        mission_df = pd.DataFrame([mission_data])
        mission_features = self.preprocessor.transform(mission_df)
        
        return crew_features, mission_features
    
    def calculate_similarity(self, crew_features: np.ndarray, mission_features: np.ndarray) -> np.ndarray:
        """Calculate similarity scores between crew and mission"""
        return cosine_similarity(crew_features, mission_features).flatten()
    
    def rank_crew(self, crew_data: List[Dict[str, Any]], mission_data: Dict[str, Any], top_n: int = 3) -> List[Dict[str, Any]]:
        """Rank crew members based on mission requirements"""
        # Preprocess features
        crew_features, mission_features = self.preprocess_features(crew_data, mission_data)
        
        # Calculate similarity scores
        similarity_scores = self.calculate_similarity(crew_features, mission_features)
        
        # Combine scores with crew data
        ranked_crew = []
        for i, score in enumerate(similarity_scores):
            crew_member = crew_data[i].copy()
            crew_member['match_score'] = float(score)
            ranked_crew.append(crew_member)
        
        # Sort by match score
        ranked_crew.sort(key=lambda x: x['match_score'], reverse=True)
        
        return ranked_crew[:top_n]
    
    def _generate_sample_data(self) -> tuple:
        """Generate sample data for testing"""
        crew_data = [
            {
                'id': 'C001',
                'name': 'John Doe',
                'years_experience': 5,
                'flight_hours': 2500,
                'training_score': 0.85,
                'certifications': ['ATP', 'Type Rating A320'],
                'aircraft_types': ['A320', 'B737'],
                'mission_preferences': ['short_haul', 'domestic']
            },
            {
                'id': 'C002',
                'name': 'Jane Smith',
                'years_experience': 8,
                'flight_hours': 4000,
                'training_score': 0.92,
                'certifications': ['ATP', 'Type Rating B777'],
                'aircraft_types': ['B777', 'A350'],
                'mission_preferences': ['long_haul', 'international']
            },
            {
                'id': 'C003',
                'name': 'Mike Johnson',
                'years_experience': 3,
                'flight_hours': 1500,
                'training_score': 0.78,
                'certifications': ['CPL', 'Type Rating A320'],
                'aircraft_types': ['A320'],
                'mission_preferences': ['short_haul']
            }
        ]
        
        mission_data = {
            'id': 'M001',
            'type': 'long_haul',
            'aircraft_type': 'B777',
            'duration_hours': 12,
            'required_certifications': ['ATP', 'Type Rating B777'],
            'preferred_experience': 5,
            'preferred_flight_hours': 3000
        }
        
        return crew_data, mission_data 
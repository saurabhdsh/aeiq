import numpy as np
import pandas as pd
from typing import List, Dict, Any
from datetime import datetime, timedelta
from sklearn.preprocessing import StandardScaler, LabelEncoder
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.utils import to_categorical

class FatiguePredictionModel:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        self.sequence_length = 24  # 24 hours of data for prediction
        
    def create_model(self, input_shape: tuple, num_classes: int) -> Sequential:
        """Create LSTM model for fatigue prediction"""
        model = Sequential([
            LSTM(64, input_shape=input_shape, return_sequences=True),
            Dropout(0.2),
            LSTM(32),
            Dropout(0.2),
            Dense(16, activation='relu'),
            Dense(num_classes, activation='softmax')
        ])
        model.compile(
            optimizer='adam',
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        return model
    
    def preprocess_data(self, data: List[Dict[str, Any]]) -> tuple:
        """Preprocess input data for model training/prediction"""
        # Convert to DataFrame
        df = pd.DataFrame(data)
        
        # Feature engineering
        df['hour_of_day'] = pd.to_datetime(df['timestamp']).dt.hour
        df['day_of_week'] = pd.to_datetime(df['timestamp']).dt.dayofweek
        df['is_night'] = (df['hour_of_day'] >= 22) | (df['hour_of_day'] <= 5)
        
        # Select features
        features = [
            'duty_hours',
            'rest_periods',
            'mission_duration',
            'hour_of_day',
            'day_of_week',
            'is_night'
        ]
        
        # Scale features
        X = self.scaler.fit_transform(df[features])
        
        # Create sequences
        X_sequences = []
        for i in range(len(X) - self.sequence_length + 1):
            X_sequences.append(X[i:i + self.sequence_length])
        
        return np.array(X_sequences)
    
    def predict_fatigue(self, data: List[Dict[str, Any]]) -> Dict[str, float]:
        """Predict fatigue level for given data"""
        if self.model is None:
            # Initialize model with sample data
            sample_data = self._generate_sample_data()
            X = self.preprocess_data(sample_data)
            self.model = self.create_model(
                input_shape=(X.shape[1], X.shape[2]),
                num_classes=3
            )
        
        # Preprocess input data
        X = self.preprocess_data(data)
        
        # Make prediction
        prediction = self.model.predict(X)
        
        # Convert prediction to fatigue levels
        fatigue_levels = ['low', 'medium', 'high']
        probabilities = prediction[0]
        
        return {
            level: float(prob)
            for level, prob in zip(fatigue_levels, probabilities)
        }
    
    def _generate_sample_data(self) -> List[Dict[str, Any]]:
        """Generate sample data for model initialization"""
        base_time = datetime.now()
        data = []
        
        for i in range(48):  # 48 hours of sample data
            timestamp = base_time - timedelta(hours=i)
            data.append({
                'timestamp': timestamp.isoformat(),
                'duty_hours': np.random.uniform(0, 12),
                'rest_periods': np.random.uniform(4, 12),
                'mission_duration': np.random.uniform(1, 8),
                'mission_type': np.random.choice(['short_haul', 'long_haul', 'cargo']),
                'health_status': np.random.choice(['good', 'fair', 'poor'])
            })
        
        return data 
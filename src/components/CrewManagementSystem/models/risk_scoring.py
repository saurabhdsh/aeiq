import numpy as np
import pandas as pd
from typing import List, Dict, Any
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
import xgboost as xgb
from xgboost import plot_importance
import matplotlib.pyplot as plt

class CrewRiskScoring:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.label_encoders = {}
        
    def preprocess_data(self, data: List[Dict[str, Any]]) -> tuple:
        """Preprocess input data for model training/prediction"""
        # Convert to DataFrame
        df = pd.DataFrame(data)
        
        # Define features
        numerical_features = [
            'incident_count',
            'training_score',
            'health_score',
            'workload_score',
            'fatigue_score'
        ]
        
        categorical_features = [
            'certification_status',
            'medical_status',
            'training_status'
        ]
        
        # Scale numerical features
        X_num = self.scaler.fit_transform(df[numerical_features])
        
        # Encode categorical features
        X_cat = np.zeros((len(df), len(categorical_features)))
        for i, feature in enumerate(categorical_features):
            if feature not in self.label_encoders:
                self.label_encoders[feature] = LabelEncoder()
            X_cat[:, i] = self.label_encoders[feature].fit_transform(df[feature])
        
        # Combine features
        X = np.hstack([X_num, X_cat])
        
        return X
    
    def train_model(self, data: List[Dict[str, Any]], labels: List[int]) -> None:
        """Train XGBoost model for risk prediction"""
        # Preprocess data
        X = self.preprocess_data(data)
        y = np.array(labels)
        
        # Split data
        X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Create and train model
        self.model = xgb.XGBClassifier(
            objective='binary:logistic',
            eval_metric='logloss',
            max_depth=6,
            learning_rate=0.1,
            n_estimators=100
        )
        
        self.model.fit(
            X_train, y_train,
            eval_set=[(X_val, y_val)],
            early_stopping_rounds=10,
            verbose=False
        )
    
    def predict_risk(self, data: List[Dict[str, Any]]) -> List[Dict[str, float]]:
        """Predict risk scores for given data"""
        if self.model is None:
            # Initialize model with sample data
            sample_data, sample_labels = self._generate_sample_data()
            self.train_model(sample_data, sample_labels)
        
        # Preprocess input data
        X = self.preprocess_data(data)
        
        # Make predictions
        risk_scores = self.model.predict_proba(X)[:, 1]
        
        # Combine predictions with input data
        results = []
        for i, score in enumerate(risk_scores):
            result = data[i].copy()
            result['risk_score'] = float(score)
            result['risk_level'] = 'high' if score > 0.7 else 'medium' if score > 0.3 else 'low'
            results.append(result)
        
        return results
    
    def plot_feature_importance(self) -> None:
        """Plot feature importance for the trained model"""
        if self.model is None:
            raise ValueError("Model not trained yet")
        
        plt.figure(figsize=(10, 6))
        plot_importance(self.model)
        plt.title('Feature Importance')
        plt.show()
    
    def _generate_sample_data(self) -> tuple:
        """Generate sample data for model initialization"""
        data = []
        labels = []
        
        for i in range(100):
            data.append({
                'incident_count': np.random.randint(0, 5),
                'training_score': np.random.uniform(0.5, 1.0),
                'health_score': np.random.uniform(0.6, 1.0),
                'workload_score': np.random.uniform(0.3, 1.0),
                'fatigue_score': np.random.uniform(0.2, 1.0),
                'certification_status': np.random.choice(['current', 'expired', 'pending']),
                'medical_status': np.random.choice(['valid', 'expired', 'pending']),
                'training_status': np.random.choice(['current', 'overdue', 'scheduled'])
            })
            
            # Generate labels based on risk factors
            risk_factors = [
                data[-1]['incident_count'] > 2,
                data[-1]['training_score'] < 0.7,
                data[-1]['health_score'] < 0.8,
                data[-1]['workload_score'] > 0.9,
                data[-1]['fatigue_score'] > 0.8
            ]
            labels.append(1 if sum(risk_factors) >= 3 else 0)
        
        return data, labels 
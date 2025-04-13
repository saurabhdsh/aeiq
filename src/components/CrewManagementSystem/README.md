# AI-Based Crew Management System

This system provides intelligent solutions for airline crew management using machine learning and optimization techniques.

## Components

### 1. Crew Fatigue Prediction
- Uses LSTM neural network for time series classification
- Input features: historical duty hours, rest periods, mission types, health logs
- Output: fatigue level (low, medium, high) with probabilities
- Model file: `models/fatigue_prediction.py`

### 2. Optimal Crew-Mission Matching
- Content-based recommendation system
- Input: crew certifications, mission requirements, aircraft type, preferences
- Output: ranked list of best-fit crew for missions
- Model file: `models/crew_matching.py`

### 3. Crew Risk Scoring
- XGBoost-based binary classification
- Input: historical incidents, health data, training status, workload
- Output: risk level (0-1) and categorical risk assessment
- Model file: `models/risk_scoring.py`

### 4. Schedule Optimization
- Constraint-based optimization using Google OR-Tools
- Input: crew availability, regulatory constraints, mission timeline
- Output: optimized crew assignment schedule
- Model file: `models/schedule_optimization.py`

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Install Node.js dependencies:
```bash
npm install
```

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Access the crew management system through the Resource Planning page.

## Data Schema

### Crew Data
```python
{
    "id": str,
    "name": str,
    "years_experience": int,
    "flight_hours": int,
    "training_score": float,
    "certifications": List[str],
    "aircraft_types": List[str],
    "mission_preferences": List[str],
    "health_status": str,
    "current_workload": float
}
```

### Mission Data
```python
{
    "id": str,
    "type": str,
    "aircraft_type": str,
    "duration_hours": float,
    "required_certifications": List[str],
    "preferred_experience": int,
    "preferred_flight_hours": int,
    "start_time": str,
    "end_time": str
}
```

## API Endpoints

- `POST /api/crew/fatigue-prediction` - Predict crew fatigue levels
- `POST /api/crew/matching` - Get optimal crew-mission matches
- `POST /api/crew/risk-scoring` - Calculate crew risk scores
- `POST /api/crew/schedule` - Generate optimized crew schedule

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
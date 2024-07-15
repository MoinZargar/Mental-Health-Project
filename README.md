# Mental Health Assessment using Natural Language Processing

## Project Overview
This project aims to assess users' mental health by analyzing chat messages and facial expressions. The system includes secure user authentication, standardized testing, personalized chat rooms, sentiment analysis, and facial emotion recognition. The frontend is built using React, and the backend is developed with Flask and MySQL.

## Features

1. **User Authentication and Testing:**
   - Developed robust signup and login mechanisms ensuring secure access.
   - Conducted standardized PHQ tests for depression, anxiety, schizophrenia, and bipolar disorder to provide initial assessments.

2. **Personalized Live Chat Rooms:**
   - Directed users to tailored chat rooms based on assessment results.
   - Fostered supportive interactions among individuals facing similar mental health challenges.

3. **Sentiment Analysis Integration:**
   - Implemented a deep learning model to analyze chat messages, categorizing sentiments into six types.
   - Stored data for comprehensive insights into user emotions and trends.

4. **Facial Sentiment Analysis:**
   - Engineered a deep learning model to interpret users' facial expressions during interactive sessions.
   - Accurately classified emotions across seven categories.
   - Visualized results on a user-friendly dashboard for immediate feedback.

## Technologies Used

- **Frontend:** React
- **Backend:** Flask
- **Database:** MySQL
- **Deep Learning Models:** Deep learning for sentiment analysis and facial emotion recognition

## Installation and Setup

### Prerequisites

- Node.js and npm
- Python 3
- MySQL

### Frontend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/MoinZargar/Mental-Health-Project.git
   cd frontend

2. Install dependencies:
 npm install I
3. Start the React development server:
 npm start

### Backend Setup

1. Navigate to the backend directory:
  cd ../backend


2. Create a virtual environment and activate it:
  python -m venv venv
  venv\Scripts\activate
3. Install dependencies:
   pip install -r requirements.txt
4. Set up the MySQL database:
5.Run the Flask development server:
   python app.py
   




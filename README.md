# Mental Health Assessment using NLP
https://github.com/user-attachments/assets/bc34f9b7-b9a2-4e0f-9fcc-dbbb01da49d4

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
   - Implemented a deep learning model LSTM RNN to analyze chat messages, categorizing sentiments into six types.
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
   ```bash
   git clone https://github.com/MoinZargar/Mental-Health-Project.git
   cd frontend

2. Install dependencies:
    ```bash
    npm install I
    
4. Start the React development server:
    ```bash
    npm run dev

### Backend Setup

1. Navigate to the backend directory:
    ```bash
     cd ../backend


2. Create a virtual environment and activate it:
    ```bash
     python -m venv venv
     venv\Scripts\activate
    
3. Install dependencies:
    ```bash
      pip install -r requirements.txt

4.Run the Flask development server:
    ```bash
      python app.py

   




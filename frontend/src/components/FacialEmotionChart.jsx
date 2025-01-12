import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FacialEmotionChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Facial Emotion Analysis',
        font: {
          size: 17,
        },
      },
    },
  };

  const labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise'];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Percentage',
        data,
        backgroundColor: 'rgba(153, 102, 255, 0.5)', 
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <div className="h-64 md:h-96"><Bar options={options} data={chartData} /></div>;
};

export default FacialEmotionChart;

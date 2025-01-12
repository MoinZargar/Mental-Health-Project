import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SentimentChart = (sentimentData) => {
  const { data } = sentimentData;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sentiment and Facial Emotion Analysis from Chatrooms',
        font: {
          size: 17,
        },
      },
    },
  };

  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Percentage',
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.5)', 
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-64 md:h-96">
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default SentimentChart;

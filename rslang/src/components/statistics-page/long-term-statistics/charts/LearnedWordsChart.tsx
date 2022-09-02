import React from 'react';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
 } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const LearnedWordsChart = () => {

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Количество изученных слов за весь период обучения по дням',
        font: {
          size: 24
        }
      },
    },
  };

  const labels = ['1 сентября', '2 сентября', '3 сентября', '4 сентября', '5 сентября', '6 сентября'];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Изученных слов',
        data: [10, 20, 35, 40, 50, 70],
        backgroundColor: '#FE595D',
      }
    ],
  };

  return (
    <Line 
      width={ 500 }
      height={ 400 }
      options={options} 
      data={data} 
    />
  )
}

export default LearnedWordsChart;
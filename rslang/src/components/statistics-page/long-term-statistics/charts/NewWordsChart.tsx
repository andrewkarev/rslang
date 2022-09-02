import React from 'react';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
 } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const NewWordsChart = () => {

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Количество новых слов за каждый день изучения',
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
        label: 'Новых слов',
        data: [10, 20, 15, 30, 50, 40],
        backgroundColor: '#F8B81F',
      }
    ],
  };

  return (
    <Bar 
      options={options} 
      data={data} 
      width={500}
      height={400}
    />
  )
}

export default NewWordsChart;
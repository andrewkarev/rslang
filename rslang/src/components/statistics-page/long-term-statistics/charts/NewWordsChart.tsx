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
import IStatistics from '../../../../types/services-interfaces/IStatistics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  stats: IStatistics | null;
}

const NewWordsChart: React.FC<Props> = ({ stats }) => {

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
    scales: {
      xAxis: {
        ticks: {
          display: false
        }
      }
    }
  };

  const dates: string[] = [];
  const newWords: string[] = [];

  if (stats) {
    Object.entries(stats.optional)
      .sort(([key1, value1], [key2, value2]) => Number(key1) - Number(key2))
      .forEach(([key, value]) => {
        const date = new Date(Number(key));

        const day = '0' + date.getDate();
        const month = "0" + (date.getMonth() + 1);
        const year = date.getFullYear();

        const formattedTime = `${day.slice(-2) }.${month.slice(-2)}.${year}`;
        
        dates.push(formattedTime);
        newWords.push(String(value.newWords));
      });
  }

  const labels = dates;

  const data = {
    labels,
    datasets: [
      {
        label: 'Новых слов',
        data: newWords,
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
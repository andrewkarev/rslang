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
import IStatistics from '../../../../types/services-interfaces/IStatistics';

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

type Props = {
  stats: IStatistics | null;
}

const LearnedWordsChart: React.FC<Props> = ({ stats }) => {

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
    scales: {
      xAxis: {
        ticks: {
          display: false
        }
      }
    }
  };

  const dates: string[] = [];
  const leanedWords: string[] = [];

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
        leanedWords.push(String(value.learnedWords));
      });
  }

  const labels = dates;

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Изученных слов',
        data: leanedWords,
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
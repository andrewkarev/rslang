import React from 'react';
import { Line } from 'react-chartjs-2';
import IStatistics from '../../../../types/services-interfaces/IStatistics';
import { formatDate } from '../../../../services/get-current-date';
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
  const dates: string[] = [];
  const learnedWords: string[] = [];
  let currentDayAllLearnedWords = 0;
  let maxLearnedWords = 0;

  if (stats) {
    Object.entries(stats.optional)
      .sort(([key1, value1], [key2, value2]) => Number(key1) - Number(key2))
      .forEach(([key, value]) => {
        const formattedDate = formatDate(Number(key));
        dates.push(formattedDate);

        currentDayAllLearnedWords += value.learnedWords;
        learnedWords.push(String(currentDayAllLearnedWords));

        if (currentDayAllLearnedWords > maxLearnedWords) maxLearnedWords = currentDayAllLearnedWords;
      });
  }

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
      },
      yAxis: {
        min: 0,
        max: maxLearnedWords < 10 ? 10 : Math.ceil(maxLearnedWords / 10) * 10,
      }
    }
  };

  const data = {
    labels: dates,
    datasets: [
      {
        fill: true,
        label: 'Изученных слов',
        data: learnedWords,
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
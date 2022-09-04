import IStatisticsValue from './IStatisticsValue';

interface IStatistics {
  optional: {
    [date: string]: IStatisticsValue
  }
};

export default IStatistics;

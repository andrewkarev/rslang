interface IStatisticsValue {
  allAnswers: number,
  rightAnswers: number,
  learnedWords: number,
  newWords: number,
  games: {
    sprint: {
      newWords: number,
      rightAnswers: number,
      longestStreak: number,
      allAnswers: number,
    },
    audioCall: {
      newWords: number,
      rightAnswers: number,
      longestStreak: number,
      allAnswers: number,
    },
  },
};

export default IStatisticsValue;
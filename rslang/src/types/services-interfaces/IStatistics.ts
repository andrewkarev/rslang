interface IStatistics {
  optional: {
    [date: string]: {
      allAnswers: number,
      rightAnswers: number,
      learnedWords: number,
      newWords: number,
      games: {
        sprint: {
          allAnswers: number,
          newWords: number,
          rightAnswers: number,
          longestStreak: number,
        },
        audioCall: {
          allAnswers: number,
          newWords: number,
          rightAnswers: number,
          longestStreak: number,
        },
      },
    },
  }
};

export default IStatistics;

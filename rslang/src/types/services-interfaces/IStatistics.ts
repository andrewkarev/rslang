interface IStatistics {
  optional: {
    [date: string]: {
      allAnswers: number,
      rightAnswers: number,
      learnedWords: number,
      newWords: number,
      games: {
        sprint: {
          newWords: number,
          rightAnswers: number,
          longestStreak: number,
        },
        audioCall: {
          newWords: number,
          rightAnswers: number,
          longestStreak: number,
        },
      },
    },
  }
};

export default IStatistics;

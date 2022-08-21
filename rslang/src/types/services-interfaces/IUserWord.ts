interface IUserWord {
  id?: string,
  wordId?: string,
  optional: {
    isNew: boolean,
    isDifficult: boolean,
    isLearned: boolean,
    correctAnswersStreak: number,
    games: {
      sprint: {
        answersAtAll: number,
        correctAnswers: number
      },
      audioCall: {
        answersAtAll: number,
        correctAnswers: number
      },
    }
  },
};

export default IUserWord;

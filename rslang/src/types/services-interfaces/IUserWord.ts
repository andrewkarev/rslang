// 'id' and 'wordId' fields are used only for response description and shouldn't be used on request sending
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

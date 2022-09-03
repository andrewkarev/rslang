import { learnWordAPI } from '..';
import IWord from '../types/services-interfaces/IWord';

const updateUsersWords = async (gameName: string, word: {
  word: IWord;
  isCorrect: boolean;
}) => {
  const userId = localStorage.getItem('id');
  const isSprintGame = gameName === 'Спринт';
  const isAudioCallGame = gameName === 'Аудио-вызов';

  if (!userId) return;

  const wordId = word.word.id;
  const isCorrect = word.isCorrect;

  try {
    const userWord = await learnWordAPI.getUserWord(userId, wordId);

    if (!userWord) return;

    const currentStreak = Number(isCorrect) && userWord.optional.correctAnswersStreak++;
    const wordLearnedStatus = isCorrect && userWord.optional.isLearned;
    const isLearned = wordLearnedStatus || currentStreak >= 3;
    const isDifficult = isLearned ? !isLearned : userWord.optional.isDifficult;
    const sprintAnswers = (userWord.optional.games.sprint.answersAtAll
      + Number(isSprintGame));
    const sprintCorrectAnswers = (userWord.optional.games.sprint.correctAnswers
      + Number(isCorrect && isSprintGame));
    const audioCallAnswers = (userWord.optional.games.audioCall.answersAtAll
      + Number(isAudioCallGame));
    const audioCallCorrectAnswers = (userWord.optional.games.audioCall.correctAnswers
      + Number(isCorrect && isAudioCallGame));

    const body = {
      optional: {
        isNew: false,
        isDifficult: isDifficult,
        isLearned: isLearned,
        correctAnswersStreak: currentStreak,
        games: {
          sprint: {
            answersAtAll: sprintAnswers,
            correctAnswers: sprintCorrectAnswers,
          },
          audioCall: {
            answersAtAll: audioCallAnswers,
            correctAnswers: audioCallCorrectAnswers,
          },
        }
      },
    };

    learnWordAPI.updateUserWord(userId, wordId, body);
  } catch (error) {
    if (!(error instanceof Error)) return;

    if (error.message === '404') {
      console.error('User\'s word not found.');

      const body = {
        optional: {
          isNew: true,
          isDifficult: false,
          isLearned: false,
          correctAnswersStreak: Number(isCorrect),
          games: {
            sprint: {
              answersAtAll: Number(isSprintGame) && 1,
              correctAnswers: Number(isSprintGame) && Number(isCorrect),
            },
            audioCall: {
              answersAtAll: Number(isAudioCallGame) && 1,
              correctAnswers: Number(isAudioCallGame) && Number(isCorrect),
            },
          }
        },
      }

      learnWordAPI.createUserWord(userId, wordId, body);
    }
  }
};

export default updateUsersWords;

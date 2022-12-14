import React, { MouseEvent, useContext } from 'react';
import styles from './selected-card.module.css';
import audio from './../../../assets/icons/audio.png';
import IWord from '../../../types/services-interfaces/IWord';
import { AuthorisationContext } from '../../../context/AuthorisationContext';
import { learnWordAPI } from '../../..';
import IUserWord from '../../../types/services-interfaces/IUserWord';
import getCurrentDate from '../../../services/get-current-date';

type Props = {
  currentWord: IWord;
  userWord?: IUserWord;
  currentStatus: {currentLevel: number, currentCard: number, currentPage: number};
  audioPlayer: HTMLAudioElement;
  setCurrentUserWord: (userWord: IUserWord) => void;
  setCurrentStatus: (status: {currentLevel: number, currentCard: number, currentPage: number}) => void;
}

const SelectedCard: React.FC<Props> = ({ 
  currentWord, 
  userWord, 
  currentStatus, 
  audioPlayer, 
  setCurrentUserWord,
  setCurrentStatus 
}) => {
  const ROOT_URL = 'https://rslangappteam102.herokuapp.com/';

  const { isAuthorised } = useContext(AuthorisationContext);
  
  const handlerAudioBtnClick = (...args: (string | MouseEvent)[]) => {
    const audioUrls = args.slice(0, args.length - 1);
    let start = 0;
    
    audioPlayer.pause();
    audioPlayer.src = `${ROOT_URL}${audioUrls[start++]}`; 
    
    const canplay = () => {
      audioPlayer.play();
      audioPlayer.removeEventListener('canplay', canplay);
    }
    
    audioPlayer.addEventListener('canplay', canplay); 

    const startPlaying = () => {
      if (start < audioUrls.length) {
        audioPlayer.pause();
        audioPlayer.src = `${ROOT_URL}${audioUrls[start++]}`;
               
        audioPlayer.addEventListener('canplay', canplay); 
      } else {
        audioPlayer.removeEventListener('ended', startPlaying);
      }
    }

    audioPlayer.addEventListener('ended', startPlaying);
  }

  const updateDatabaseData = async (userId: string, word: IUserWord) => {
    if (!userWord) {
      await learnWordAPI.createUserWord(
        userId, 
        currentWord.id, 
        word
      );
    } else {
      await learnWordAPI.updateUserWord(
        userId, 
        currentWord.id, 
        word
      );
    }
    
    setCurrentUserWord({id: userId, wordId: currentWord.id, ...word});

    if (currentStatus.currentLevel === 6) {
      setCurrentStatus({...currentStatus, currentCard: 0 });
    }
  }

  const handlerComplicatedBtnClick = async () => {
    const userId = localStorage.getItem('id');

    let word: IUserWord;

    if (userId) {
      if (userWord) {
        word = {
          optional: {
            ...userWord.optional, 
            ...userWord.optional.games.audioCall,
            ...userWord.optional.games.sprint
          }
        };

        word.optional.isDifficult = true;
      } else {
        
        word = {
          optional: {
            isNew: true, 
            isDifficult: true, 
            isLearned: false, 
            correctAnswersStreak: 0,
            games: {
              sprint: {
                answersAtAll: 0,
                correctAnswers: 0
              },
              audioCall: {
                answersAtAll: 0,
                correctAnswers: 0
              },
            }
          }
        }
      
      }
      await updateDatabaseData(userId, word);
    }
  }

  const updateStatistics = async (action: 'add' | 'remove', userId: string) => {
    const key = getCurrentDate();

    const newBody = {
      [key]: {
        allAnswers: 0,
        rightAnswers: 0,
        learnedWords: action === 'add' ? 1 : 0,
        newWords: 0,
        games: {
          sprint: {
            newWords: 0,
            rightAnswers: 0,
            longestStreak: 0,
            allAnswers: 0,
          },
          audioCall: {
            newWords: 0,
            rightAnswers: 0,
            longestStreak: 0,
            allAnswers: 0,
          },
        },
      },
    }

    try {
      const userStatistics = await learnWordAPI.getStatistics(userId);
      if (!userStatistics) return;

      let body;

      if (key in userStatistics.optional) {
        const stats = userStatistics.optional[key];
        
        body = {
          optional: {
            ...userStatistics.optional,
            [key]: {
              allAnswers: stats.allAnswers,
              rightAnswers: stats.rightAnswers,
              learnedWords: action === 'add' ? stats.learnedWords + 1 : stats.learnedWords - 1,
              newWords: stats.newWords,
              games: {
                sprint: {
                  newWords: stats.games.sprint.newWords,
                  rightAnswers: stats.games.sprint.rightAnswers,
                  longestStreak: stats.games.sprint.longestStreak,
                  allAnswers: stats.games.sprint.allAnswers,
                },
                audioCall: {
                  newWords: stats.games.audioCall.newWords,
                  rightAnswers: stats.games.audioCall.rightAnswers,
                  longestStreak: stats.games.audioCall.longestStreak,
                  allAnswers: stats.games.audioCall.allAnswers,
                },
              },
            },
          }
        };
      } else {
        body = {
          optional: {
            ...userStatistics.optional,
            ...newBody,
          }
        };
      }

      learnWordAPI.updateStatistics(userId, body);
    } catch (error) {
      
      if (!(error instanceof Error)) return;

      if (error.message === '404') {
        console.error('User\'s statistics not found.');

        const body = {
          optional: {
            ...newBody,
          }
        };

        learnWordAPI.updateStatistics(userId, body);
      }
    }
  }

  const handlerLearnedBtnClick = async () => {
    const userId = localStorage.getItem('id');
    if (!userId) return;    

    updateStatistics('add', userId);

    let word: IUserWord;

    if (userWord) {
      word = {
        optional: {
          ...userWord.optional, 
          ...userWord.optional.games.audioCall,
          ...userWord.optional.games.sprint
        }
      };
      
      word.optional.isDifficult = false;
      word.optional.isLearned = true;
    } else {

      word = {
        optional: {
          isNew: true, 
          isDifficult: false, 
          isLearned: true, 
          correctAnswersStreak: 0,
          games: {
            sprint: {
              answersAtAll: 0,
              correctAnswers: 0
            },
            audioCall: {
              answersAtAll: 0,
              correctAnswers: 0
            },
          }
        }
      }

    }

    updateDatabaseData(userId, word);
    
  }

  const handlerRemoveFromLearnedBtnClick = async () => {
    const userId = localStorage.getItem('id');
    if (!userId) return;    

    updateStatistics('remove', userId);

    let word: IUserWord;

    if (userWord) {
      word = {
        optional: { 
          ...userWord.optional, 
          ...userWord.optional.games.audioCall,
          ...userWord.optional.games.sprint
        }
      };
      
      word.optional.isDifficult = false;
      word.optional.isLearned = false;
      word.optional.correctAnswersStreak = 0;

      updateDatabaseData(userId, word);
    } 
   
  }

  const handlerRemoveFromComplecatedBtnClick = async () => {
    const userId = localStorage.getItem('id');
    let word: IUserWord;

    if (userId) {
      
      if (userWord) {
        word = {
          optional: { 
            ...userWord.optional, 
            ...userWord.optional.games.audioCall,
            ...userWord.optional.games.sprint
          }
        };
        
        word.optional.isDifficult = false;
        word.optional.isLearned = false;

        updateDatabaseData(userId, word);
      } 
    }
  }
  
  return (
    <div className={ styles['selected-card'] }>
      <img className={ styles['selected-card-image'] } 
        src={ currentWord ? `${ ROOT_URL }${ currentWord.image }` : '' } 
        alt="selected card img"
      />
      <div className={ styles['word-wrapper'] }>
        <h2 className={ styles['word'] }>
          {currentWord ? currentWord.word : '' }
        </h2>
        <p className={ styles['translation'] }>
          { currentWord ? currentWord.wordTranslate : '' }
        </p>

        <div className={ styles['reading'] }>
          <p className={ styles['transcription'] }>
            { currentWord ? currentWord.transcription : '' }
          </p>
          <button 
            className={ 'btn ' + styles['round-btn'] } 
            onClick={ currentWord ? handlerAudioBtnClick.bind(
              null, 
              currentWord.audio, 
              currentWord.audioMeaning, 
              currentWord.audioExample
            ) : undefined }
          >
            <img src={ audio } alt="word audio btn" />
          </button>
        </div>
        { 
          isAuthorised &&
          <div className={ styles['btns'] }>
            { 
              !userWord?.optional.isDifficult && !userWord?.optional.isLearned &&
              <>
                <button 
                  className={ `btn ${styles['rounded-word-btn'] }` }
                  onClick={ handlerComplicatedBtnClick }
                >
                  ?? ??????????????
                </button>
                <div className={ styles['btn-separator'] }></div>
              </>
            }
            {
              userWord?.optional.isDifficult && currentStatus.currentLevel === 6 &&
              <button 
                className={ `btn ${styles['rounded-word-btn'] }` }
                onClick={ handlerRemoveFromComplecatedBtnClick }
              >
                ?????????????? ???? ??????????????
              </button>
            }
            {
              !userWord?.optional.isLearned &&
              <button 
                className={ `btn ${styles['rounded-word-btn'] }` }
                onClick={ handlerLearnedBtnClick }
              >
                ?? ????????????????????
              </button>
            } 
            {
              userWord?.optional.isLearned &&
              <button 
                className={ `btn ${styles['rounded-word-btn'] }` }
                onClick={ handlerRemoveFromLearnedBtnClick }
              >
                ?????????????? ???? ??????????????????
              </button>
            } 
          </div>
          
        }

        <div className={ styles['meaning'] }>
          <h3 className={ styles['title'] }>????????????????</h3>
          <p 
            className={ styles['meaning-sentence'] } 
            dangerouslySetInnerHTML={{__html: currentWord ? currentWord.textMeaning : ''}}
          >
          </p>
          <p className={ styles['meaning-translation'] }>
            { currentWord ? currentWord.textMeaningTranslate : '' }
          </p>
        </div>

        <div className={ styles['example'] }>
          <h3 className={ styles['title'] }>????????????</h3>
          <p 
            className={ styles['example-sentence'] }
            dangerouslySetInnerHTML={{__html: currentWord ? currentWord.textExample : ''}}
          >
          </p>
          <p className={ styles['example-translation'] }>
            { currentWord ? currentWord.textExampleTranslate : '' }
          </p>
        </div>
        
        {
          isAuthorised &&
            <div className={ styles['in-games'] }>
              <h3 className={ styles['title'] }>?????????????????????? ?? ??????????</h3>
              <div className={ styles['results'] }>
                <div className={ styles['game'] }>
                  <h4 className={ styles['game-name'] }>????????????</h4>
                  <p className={ styles['result'] }>
                    { 
                      userWord 
                        ? `${userWord.optional.games.sprint.correctAnswers} ???? ${userWord.optional.games.sprint.answersAtAll}` 
                        : '0 ???? 0' 
                    }
                  </p>
                </div>
                <div className={ styles['game'] }>
                  <h4 className={ styles['game-name'] }>??????????-??????????</h4>
                  <p className={ styles['result'] }>
                    { 
                      userWord 
                        ? `${userWord.optional.games.audioCall.correctAnswers} ???? ${userWord.optional.games.audioCall.answersAtAll}` 
                        : '0 ???? 0' 
                    }
                  </p>
                </div>
              </div>
            </div>
        }
      </div>
      
    </div>
  )
}

export default SelectedCard;
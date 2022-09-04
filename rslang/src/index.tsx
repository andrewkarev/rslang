import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthorisationState } from './context/AuthorisationContext';
import LearnWordsApi from './services/learn-words-api';
import { Console } from 'console';

const learnWordAPI = new LearnWordsApi();
const date = new Date();
date.setHours(0, 0, 0, 0);
// learnWordAPI.updateStatistics(
//   '6307b3693799c6001637383d', {
//     optional: {
//       [String(date)]: {
//         allAnswers: 20,
//         rightAnswers: 18,
//         learnedWords: 18,
//         newWords: 16,
//         games: {
//           sprint: {
//             allAnswers: 12,
//             newWords: 10,
//             rightAnswers: 10,
//             longestStreak: 8,
//           },
//           audioCall: {
//             allAnswers: 9,
//             newWords: 6,
//             rightAnswers: 8,
//             longestStreak: 7,
//           },
//         }
//       }
//     }
//   }
// );


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <>
    <BrowserRouter>
      <AuthorisationState>
        <App />
      </AuthorisationState>
    </BrowserRouter>
  </>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export { learnWordAPI };

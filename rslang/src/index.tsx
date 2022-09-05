import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthorisationState } from './context/AuthorisationContext';
import LearnWordsApi from './services/learn-words-api';

const learnWordAPI = new LearnWordsApi();

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

reportWebVitals();

export { learnWordAPI };

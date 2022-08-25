import React, { useContext } from 'react';
import { AuthorisationContext } from '../../../context/AuthorisationContext';

interface RegistrationBtnProps {
  handler: () => void;
}

const RegistrationBtn: React.FunctionComponent<RegistrationBtnProps> = ({ handler }) => {
  const { isAuthorised, changeAuthorisationStatus } = useContext(AuthorisationContext)

  const logOut = () => {
    const localStorageItems = ['id', 'name', 'refreshToken', 'token'];
    changeAuthorisationStatus();
    localStorageItems.forEach((item) => localStorage.removeItem(item));
  }

  return (
    <button
      className="button"
      type="button"
      onClick={isAuthorised ? logOut : handler}>
      {isAuthorised ? 'Выйти' : 'Войти'}
    </button>
  );
};

export default RegistrationBtn;

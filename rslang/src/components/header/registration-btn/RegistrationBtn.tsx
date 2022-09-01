import React, { useContext } from 'react';
import { AuthorisationContext } from '../../../context/AuthorisationContext';
import styles from '../../../components/header/header.module.css'

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
      className={ styles['button']}
      type="button"
      onClick={isAuthorised ? logOut : handler}>
      <span className={ styles['button-title']}>
        {isAuthorised ? 'Выйти' : 'Войти'}
      </span>
    </button>
  );
};

export default RegistrationBtn;

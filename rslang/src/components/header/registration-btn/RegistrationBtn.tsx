import React, { useContext } from 'react';
import { AuthorisationContext } from '../../../context/AuthorisationContext';
import styles from '../../../components/header/header.module.css'

interface RegistrationBtnProps {
  toggleModalVisability: () => void;
  isHeaderButton: boolean,
}

const RegistrationBtn: React.FunctionComponent<RegistrationBtnProps> = ({
  toggleModalVisability,
  isHeaderButton, }) => {
  const { isAuthorised, changeAuthorisationStatus } = useContext(AuthorisationContext)

  const logOut = () => {
    changeAuthorisationStatus();
    localStorage.clear();
  }

  const signInText = isHeaderButton ? 'Войти' : 'Зарегистрироваться';

  return (
    <button
      className={styles['button']}
      type="button"
      onClick={isAuthorised ? logOut : toggleModalVisability}>
      <span className={styles['button-title']}>
        {isAuthorised ? 'Выйти' : signInText}
      </span>
    </button>
  );
};

export default RegistrationBtn;

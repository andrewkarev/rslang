import React, { useState } from 'react';
import AuthorizationElement from './authorisation-elements/AuthorizationElement';
import styles from './authorisation-form.module.css';

interface AuthorisationFormProps {
  toggleModalVisability: () => void,
}

const AuthorisationForm: React.FunctionComponent<AuthorisationFormProps> = (props) => {
  const [isRegistrationPage, setIsRegistrationPage] = useState(false);

  const changeFormType = () => {
    setIsRegistrationPage(!isRegistrationPage);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['form-wrapper']}>
        <div className={styles['wrapper']}>
          <AuthorizationElement
            changeFormType={changeFormType}
            isRegistrationPage={isRegistrationPage}
          />
          <button
            className={styles['close-form-btn']}
            type="button"
            onClick={props.toggleModalVisability}
          >
            <div className={`${styles['close-btn-line']} ${styles['close-btn-line-1']}`}></div>
            <div className={`${styles['close-btn-line']} ${styles['close-btn-line-2']}`}></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorisationForm;
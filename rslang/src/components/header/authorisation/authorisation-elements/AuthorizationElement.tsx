import React from 'react';
import styles from './authorisation-elements.module.css';
import Form from './form/Form'

interface AuthorizationElementProps {
  changeFormType: () => void,
  isRegistrationPage: boolean,
}

const AuthorizationElement: React.FunctionComponent<AuthorizationElementProps> = (props) => {
  const authorisationElementQuestion =
    <>
      Ёще не с нами?<br />
      Самое время
    </>

  return (
    <>
      <h2 className={styles.title}>
        {props.isRegistrationPage ? 'Вы ещё не с нами?' : 'Уже опробовали свои силы?'}
      </h2>
      <h3 className={styles.subtitle}>
        {props.isRegistrationPage ? 'Присоединяйтесь!' : 'Не стоит останавливаться!'}
      </h3>
      <Form isRegistrationPage={props.isRegistrationPage} />
      <h3 className={styles.subtitle}>
        {props.isRegistrationPage ? 'Уже с нами?' : authorisationElementQuestion}
        &nbsp;
        <span
          className={styles['registration-link']}
          onClick={props.changeFormType}
        >
          {props.isRegistrationPage ? 'Входите' : 'присоединиться'}
          <span className={styles['registration-line']}></span>
        </span>
        &nbsp;{props.isRegistrationPage ? '.' : '!'}
      </h3>
    </>
  );
};

export default AuthorizationElement;
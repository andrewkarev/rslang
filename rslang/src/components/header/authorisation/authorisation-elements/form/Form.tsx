import React from 'react';
import styles from './form.module.css';

interface FormProps {
  isRegistrationPage: boolean,
}

const Form: React.FunctionComponent<FormProps> = (props) => {
  const userNameInput = <input
    className={styles.input}
    type="username"
    id="username"
    name="username"
    required
    placeholder="name*"
  // value={}
  // onChange={}
  />

  const passwordConfirmation = <input
    className={styles.input}
    type="password"
    id="password-confirmation"
    name="password"
    required
    minLength={8}
    maxLength={20}
    placeholder="подтвердите пароль*"
  // value={}
  // onChange={}
  />

  return (
    <>
      <form onSubmit={() => console.log('submit')}>
        {props.isRegistrationPage && userNameInput}
        <input
          className={styles.input}
          type="email"
          id="email"
          name="email"
          required
          placeholder="email*"
        // value={}
        // onChange={}
        />
        <input
          className={styles.input}
          type="password"
          id="password"
          name="password"
          required
          minLength={8}
          maxLength={20}
          placeholder="пароль*"
        // value={}
        // onChange={}
        />
        {props.isRegistrationPage && passwordConfirmation}
        <button
          className={styles['form-btn']}
          type="submit">
          {props.isRegistrationPage ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>
    </>
  );
};

export default Form;
import React, { useContext, useState } from 'react';
import { learWordAPI } from '../../../../..';
import { AuthorisationContext } from '../../../../../context/AuthorisationContext';
import styles from './form.module.css';
import WarningMessage from './warning-message/WarningMessage';

interface FormProps {
  isRegistrationPage: boolean,
  toggleModalVisability: () => void,
};

const Form: React.FunctionComponent<FormProps> = (props) => {
  const { changeAuthorisationStatus } = useContext(AuthorisationContext);
  const [warningMessage, setWarningMessage] = useState('');
  const [isWarningMessageShown, setIsWarningMessageShown] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const changeWarningMessageVisability = () => {
    setIsWarningMessageShown(!isWarningMessageShown);
  };


  const handleInputChange = (e: React.SyntheticEvent) => {
    const target = e.target;

    if (!(target instanceof HTMLInputElement)) return;

    const name = target.name;
    const value = target.value;
    const state = { ...inputValue, ...{ [name]: value } };
    setInputValue(state);
  };

  const validateEmail = (email: string) => {
    /* Regular expression for email validation was taken from
        https://regexr.com/3e48o */
    const EMAIL_REGEXP = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return EMAIL_REGEXP.test(email);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const email = inputValue.email;
    const password = inputValue.password;

    if (!validateEmail(email)) {
      setWarningMessage('Имейл должен быть валидныи, например: exampleuser@mail.com .');
      changeWarningMessageVisability();
      return;
    }

    try {
      if (props.isRegistrationPage) {
        const name = inputValue.name;
        const passwordConfirmation = inputValue.passwordConfirmation;

        if (passwordConfirmation !== password) {
          setWarningMessage('Значения в полях "пароль" и "подтвердите пароль" должны совпадать.');
          changeWarningMessageVisability();
          return;
        }

        await learWordAPI.createUser({ name, email, password });
      }

      await learWordAPI.signIn({ email, password });
    } catch (error) {
      if (!(error instanceof Error)) return;

      if (error.message === '417') {
        console.error('A user with the same name already exists.');
        setWarningMessage('Упс, ученик с таким же имейл уже проходит у нас обучение.');
        changeWarningMessageVisability();
        return;
      }

      if (error.message.match(/(403|404)/)) {
        console.error('Wrong password or email.');
        setWarningMessage('Хм, проверьте, правильные ли данные вы указали при входе.');
        changeWarningMessageVisability();
        return;
      }
    }

    changeAuthorisationStatus();
    props.toggleModalVisability();
  };

  const userNameInput = <input
    className={styles.input}
    type="name"
    id="name"
    name="name"
    required
    placeholder="name*"
    value={inputValue.name}
    onChange={handleInputChange}
  />;

  const passwordConfirmation = <input
    className={styles.input}
    type="password"
    id="password-confirmation"
    name="passwordConfirmation"
    required
    minLength={8}
    maxLength={20}
    placeholder="подтвердите пароль*"
    value={inputValue.passwordConfirmation}
    onChange={handleInputChange}
  />;

  return (
    <>
      <form onSubmit={handleSubmit}>
        {props.isRegistrationPage && userNameInput}
        <input
          className={styles.input}
          type="email"
          id="email"
          name="email"
          required
          placeholder="email*"
          value={inputValue.email}
          onChange={handleInputChange}
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
          value={inputValue.password}
          onChange={handleInputChange}
        />
        {props.isRegistrationPage && passwordConfirmation}
        <button
          className={styles['form-btn']}
          type="submit">
          {props.isRegistrationPage ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>
      {isWarningMessageShown && <WarningMessage
        message={warningMessage}
        handler={changeWarningMessageVisability}
      />}
    </>
  );
};

export default Form;
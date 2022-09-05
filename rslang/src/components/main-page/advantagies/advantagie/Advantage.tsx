import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { AuthorisationContext } from '../../../../context/AuthorisationContext';
import styles from './advantage.module.css';

type Props = {
  toggleModalVisability: () => void;
  name: string,
  description: string,
  image: string,
  url?: string,
};

const Advantagie = (props: Props) => {
  const { isAuthorised } = useContext(AuthorisationContext);

  const advantageElement = (
    <>
      <img className={styles['img']} src={props.image} alt="adventagie img" />
      <h3 className={styles['title']}>{props.name}</h3>
      <div className={styles['description']}>{props.description}</div>
    </>
  );

  return (
    props.url
      ? <NavLink to={`${props.url}`}>
        <div className={styles['advantagie']}>
          {advantageElement}
        </div>
      </NavLink>
      : <div
        className={styles['advantage-registration']}
        onClick={() => {
          isAuthorised
            ? console.log('Already registred')
            : props.toggleModalVisability();
        }}
      >
        {advantageElement}
        {isAuthorised && <span className={styles['tooltiptext']}>
          Здорово, что вы уже с нами !
        </span>}
      </div>
  );
}

export default Advantagie;
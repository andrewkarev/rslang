import React from 'react';
import styles from './adventagie.module.css';

type Props = {
  name: string,
  description: string,
  image: string
};

const Adventagie = (props: Props) => {
  return (
    <div className={ styles['adventagie'] }>
      <img className={ styles['adventagie-img'] } src={ props.image } alt="adventagie img" />
      <h3 className={ styles['adventagie-title'] }>{ props.name }</h3>
      <div className={ styles['adventagie-description'] }>{ props.description }</div>      
    </div>
  );
}

export default Adventagie;
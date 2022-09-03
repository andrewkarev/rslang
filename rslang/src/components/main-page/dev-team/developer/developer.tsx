import React from 'react';
import styles from './developer.module.css';

type Props = {
  avatar: string,
  name: string,
  link: string,
  github: string,
  description: string,  
};

const Developer = (props: Props) => {
  return (
    <div className={ styles['card'] }>
      <img className={ styles['avatar'] } src={ props.avatar } alt="avatar img" />
      <div className={ styles['name-and-link']}>
        <h3 className={ styles['name'] }>{ props.name }</h3>
        <a className={ styles['link']} href={ props.link }>
          <img className={ styles['github'] } src={ props.github } alt="github img" />
        </a>
      </div>
      <p className={ styles['description'] }>{ props.description }</p>      
      </div>
  );
}

export default Developer;
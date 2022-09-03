import React from 'react';
import { NavLink } from "react-router-dom";
import styles from './advantagie.module.css';

type Props = {
  name: string,
  description: string,
  image: string,
  url?: string,
};

const Advantagie = (props: Props) => {
  return (
    <div className={ styles['advantagie'] }>
      <NavLink to={`${props.url}`}>
      <img className={ styles['img'] } src={ props.image } alt="adventagie img" />
      <h3 className={ styles['title'] }>{ props.name }</h3>
      <div className={ styles['description'] }>{ props.description }</div>
      </NavLink>      
    </div>
  );
}

export default Advantagie;
import React from 'react';
import styles from './advantagies.module.css';
import advantagiesData from '../../../data/advantagies-data'
import Advantagie from './advantagie/Advantagie';

const Advantagies = () => {

  const advantagiesElement = advantagiesData.map((adventagie) => {
    return (
      <Advantagie image={ adventagie.image } name={ adventagie.name } description={ adventagie.description } url={ adventagie.url} />
    )
  });

  return (
    <section className={ styles['advantagies']}>
      <div className={ styles['wrapper']}>
        <h2 className={ styles['title']}>Используйте все преимущества приложения</h2>
          <div className={ styles['content']}>
            { advantagiesElement }
          </div>        
      </div>
    </section>
  );
}

export default Advantagies;
import React from 'react';
import styles from './advantagies.module.css';
import advantagiesData from '../../../data/advantagies-data'
import Advantagie from './advantagie/Advantagie';

interface AdvantagiesProps {
  toggleModalVisability: () => void;
}

const Advantagies: React.FC<AdvantagiesProps> = ({ toggleModalVisability }) => {

  const advantagiesElement = advantagiesData.map((adventagie) => {
    return (
      <Advantagie
        toggleModalVisability={toggleModalVisability}
        image={adventagie.image}
        name={adventagie.name}
        description={adventagie.description}
        key={adventagie.name}
        url={adventagie.url}
      />
    )
  });

  return (
    <section className={styles['advantagies']}>
      <div className={styles['wrapper']}>
        <h2 className={styles['title']}>Используйте все преимущества приложения</h2>
        <div className={styles['content']}>
          {advantagiesElement}
        </div>
      </div>
    </section>
  );
}

export default Advantagies;
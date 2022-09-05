import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './advantagies.module.css';
import advantagiesData from '../../../data/advantagies-data'
import Advantagie from './advantagie/Advantagie';

interface AdvantagiesProps {
  toggleModalVisability: () => void;
}

const Advantagies: React.FC<AdvantagiesProps> = ({ toggleModalVisability }) => {
  const { ref: advantageousRef, inView: isAdvantageousVisible } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });


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
    <section
      className={styles['advantagies']}
      ref={advantageousRef}>
      <div className={`${styles['wrapper']} ${isAdvantageousVisible ? styles['animate'] : ''}`}>
        <h2 className={styles['title']}>Используйте все преимущества приложения</h2>
        <div className={styles['content']}>
          {advantagiesElement}
        </div>
      </div>
    </section>
  );
}

export default Advantagies;
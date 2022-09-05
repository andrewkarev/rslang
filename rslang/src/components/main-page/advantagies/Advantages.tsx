import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './advantages.module.css';
import advantagiesData from '../../../data/advantagies-data'
import Advantage from './advantagie/Advantage';

interface AdvantagiesProps {
  toggleModalVisability: () => void;
}

const Advantages: React.FC<AdvantagiesProps> = ({ toggleModalVisability }) => {
  const { ref: advantagesRef, inView: isAdvantagesVisible } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });


  const advantagiesElement = advantagiesData.map((adventagie) => {
    return (
      <Advantage
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
      ref={advantagesRef}>
      <div className={`${styles['wrapper']} ${isAdvantagesVisible ? styles['animate'] : ''}`}>
        <h2 className={styles['title']}>Используйте все преимущества приложения</h2>
        <div className={styles['content']}>
          {advantagiesElement}
        </div>
      </div>
    </section>
  );
}

export default Advantages;
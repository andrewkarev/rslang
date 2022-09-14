import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './advantages.module.css';
import advantagesData from '../../../data/advantages-data'
import Advantage from './advantage/Advantage';

interface AdvantagiesProps {
  toggleModalVisability: () => void;
}

const Advantages: React.FC<AdvantagiesProps> = ({ toggleModalVisability }) => {
  const { ref: advantagesRef, inView: isAdvantagesVisible } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });


  const advantagiesElement = advantagesData.map((adventage) => {
    return (
      <Advantage
        toggleModalVisability={toggleModalVisability}
        image={adventage.image}
        name={adventage.name}
        description={adventage.description}
        key={adventage.name}
        url={adventage.url}
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
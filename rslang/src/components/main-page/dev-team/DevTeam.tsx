import React from 'react';
import styles from './dev-team.module.css';
import devTeamData from '../../../data/devTeam-data'
import Developer from './developer/Developer';

const DevTeam = () => {
  
  const cardElements = devTeamData.map((developer) => {
    return (
      <Developer avatar={ developer.avatar } name={ developer.name } link = { developer.link } github = { developer.github } description={ developer.description } />
    )
  });

  return (
    <section className={ styles['dev-team']}>
      <div className={ styles['wrapper']}>
        <h2 className={ styles['title']}>Познакомьтесь с нашей командой</h2>
        <div className={ styles['content']}>
          { cardElements }
        </div>        
      </div>
      <div className={ styles['wave'] }>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 280">
          <path fill="#F8B81F" fill-opacity="1" d="M0,160L60,176C120,192,240,224,360,234.7C480,245,600,235,720,213.3C840,192,960,160,1080,154.7C1200,149,1320,171,1380,181.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}

export default DevTeam;
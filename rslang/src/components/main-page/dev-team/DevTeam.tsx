import React from 'react';
import styles from './dev-team.module.css';
import devTeamData from '../../../data/devTeam-data';
import Developer from './developer/Developer'

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
        <svg id="wave"  viewBox="0 0 1440 100" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(248, 184, 31, 1)" offset="0%"></stop><stop stop-color="rgba(248, 184, 31, 1)" offset="100%"></stop></linearGradient></defs><path  fill="url(#sw-gradient-0)" d="M0,40L24,43.3C48,47,96,53,144,53.3C192,53,240,47,288,40C336,33,384,27,432,20C480,13,528,7,576,10C624,13,672,27,720,31.7C768,37,816,33,864,26.7C912,20,960,10,1008,6.7C1056,3,1104,7,1152,11.7C1200,17,1248,23,1296,36.7C1344,50,1392,70,1440,65C1488,60,1536,30,1584,16.7C1632,3,1680,7,1728,10C1776,13,1824,17,1872,20C1920,23,1968,27,2016,30C2064,33,2112,37,2160,31.7C2208,27,2256,13,2304,15C2352,17,2400,33,2448,48.3C2496,63,2544,77,2592,75C2640,73,2688,57,2736,53.3C2784,50,2832,60,2880,56.7C2928,53,2976,37,3024,28.3C3072,20,3120,20,3168,20C3216,20,3264,20,3312,16.7C3360,13,3408,7,3432,3.3L3456,0L3456,100L3432,100C3408,100,3360,100,3312,100C3264,100,3216,100,3168,100C3120,100,3072,100,3024,100C2976,100,2928,100,2880,100C2832,100,2784,100,2736,100C2688,100,2640,100,2592,100C2544,100,2496,100,2448,100C2400,100,2352,100,2304,100C2256,100,2208,100,2160,100C2112,100,2064,100,2016,100C1968,100,1920,100,1872,100C1824,100,1776,100,1728,100C1680,100,1632,100,1584,100C1536,100,1488,100,1440,100C1392,100,1344,100,1296,100C1248,100,1200,100,1152,100C1104,100,1056,100,1008,100C960,100,912,100,864,100C816,100,768,100,720,100C672,100,624,100,576,100C528,100,480,100,432,100C384,100,336,100,288,100C240,100,192,100,144,100C96,100,48,100,24,100L0,100Z"></path></svg>
        <div className={ styles['bg']}></div>
      </div>
    </section>
  );
}

export default DevTeam;
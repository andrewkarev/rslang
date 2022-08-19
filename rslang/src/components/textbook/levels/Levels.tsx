import React from 'react';
import './levels.css';

const Levels = () => {
  const levelsData = [
    { name: 'Beginner', shortName: 'A1' },
    { name: 'Elementary', shortName: 'A2' },
    { name: 'Intermediate', shortName: 'B1' },
    { name: 'Upper-Intermediate', shortName: 'B2' },
    { name: 'Advanced', shortName: 'C1' },
    { name: 'Proficiency', shortName: 'C2' },
  ];

  const levelsElements = levelsData.map((level) => {
    return (
      <div className="level" key={ level.name }>
        <div className="level-name">{ level.name }</div>
        <div className="level-shortname">{ level.shortName }</div>
        <div className="arrow"></div>
      </div>
    );
  })

  return (
    <div className="levels">
      { levelsElements }
    </div>
  );
}
 
export default Levels;
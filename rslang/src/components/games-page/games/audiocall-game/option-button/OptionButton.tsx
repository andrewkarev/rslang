import React from 'react';
import styles from './option-button.module.css';

interface OptionButtonProps {
  isOptionLightned: ('base' | 'right' | 'wrong')[],
  handleOptionButtonEvent: (optionIndex: number) => void,
  translation: string,
  index: number,
}

const OptionButton: React.FC<OptionButtonProps> = ({
  isOptionLightned,
  handleOptionButtonEvent,
  translation,
  index
}) => {
  const ORDER_CORRECTION = 1;

  return (
    <button
      className={styles[`${isOptionLightned[index] === 'right'
        ? 'option-btn-right'
        : isOptionLightned[index] === 'wrong'
          ? 'option-btn-wrong'
          : 'option-btn'}`
      ]}
      type="button"
      onClick={() => handleOptionButtonEvent(index)}
    >
      {`${index + ORDER_CORRECTION} ${translation}`}
    </button>
  );
}

export default OptionButton;
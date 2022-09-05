import styles from './scroll.module.css';

const Scroll = () => {
  return (
    <button className={styles['scrollTo']}
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }}
    >
      Вверх
    </button>
  );
}

export default Scroll;
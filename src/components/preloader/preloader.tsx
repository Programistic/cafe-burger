import styles from './preloader.module.css';

function Preloader() {
  return (
    <div className={styles.preloader}>
      <div className={styles.preloaderContainer}>
        <span className={styles.preloaderRound}></span>
      </div>
    </div>
  );
}

export default Preloader;

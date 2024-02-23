import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgBox}>
        <img src="/loading.gif" alt="Loading" />
        <span>LOADING</span>
      </div>
    </div>
  );
};

export default Loading;

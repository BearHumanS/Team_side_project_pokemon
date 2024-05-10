import Image from 'next/image';
import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgBox}>
        <div className={styles.img}>
          <Image
            src="/loading.gif"
            alt="Loading"
            width={100}
            height={180}
            unoptimized={true}
            priority
          />
        </div>
        <span>LOADING</span>
      </div>
    </div>
  );
};

export default Loading;

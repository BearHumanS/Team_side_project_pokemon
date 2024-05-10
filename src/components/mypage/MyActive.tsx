import LikedPosts from './LikedPosts';
import MyLikedPokemon from './MyLikedPokemon';
import MyPosts from './MyPosts';
import styles from './Mypage.module.scss';
const MyActive = () => {
  return (
    <>
      <div className={styles.myactive__total__container}>
        <div className={styles.myactive__left__container}>
          <div className={styles.myactive__posts}>
            <MyPosts />
          </div>
          <div className={styles.myactive__posts__favorite}>
            <LikedPosts />
          </div>
        </div>
        <MyLikedPokemon />
      </div>
    </>
  );
};

export default MyActive;

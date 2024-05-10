'use client';

import Introduce from '@/components/mypage/Introduce';
import MyActive from '@/components/mypage/MyActive';
import Mycard from '@/components/mypage/Mycard';
import styles from './Mypage.module.scss';

const Mypage = () => {
  return (
    <div className={styles.mypage}>
      <Introduce />
      <Mycard />
      <MyActive />
    </div>
  );
};

export default Mypage;

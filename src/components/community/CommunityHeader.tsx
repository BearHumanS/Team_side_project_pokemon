import { useState } from 'react';
import styles from './CommunityHeader.module.scss';

const CommunityHeader = () => {
  const [currentTeb, setCurrentTab] = useState(0);

  const CategoryList = [
    '자유게시판',
    '공지사항',
    '질문/답변',
    'Tip',
    '거래게시판',
    '자랑하기',
  ];

  function setTabHandler(i: number) {
    setCurrentTab(i);
  }

  return (
    <div className={styles.CommunityHeader}>
      {CategoryList.map((item, index) => (
        <div
          className={
            index === currentTeb
              ? `${styles.CategoryButton} ${styles.Select}`
              : styles.CategoryButton
          }
          onClick={() => {
            setTabHandler(index);
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default CommunityHeader;

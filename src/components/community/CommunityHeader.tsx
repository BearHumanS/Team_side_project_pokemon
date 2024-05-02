// 사용되지 않는 컴포넌트?

/* import { useState } from 'react';
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
    <div className={styles.communityHeader}>
      {CategoryList.map((item, index) => (
        <div
          className={
            index === currentTeb
              ? `${styles.categoryButton} ${styles.select}`
              : styles.categoryButton
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
 */

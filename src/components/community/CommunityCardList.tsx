'use client';

import { Pagination } from 'antd';
import Search from 'antd/es/input/Search';
import { useState, useEffect } from 'react';
import useUserStore from '@/store/useUsersStore';
import CommunityCardItem from './CommunityCardItem';
import styles from './CommunityCardList.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, ButtonCircle } from '../button/Button';
import useCommunityDataList from '@/hook/useCommunityDataList';

interface CommunityData {
  id: string;
  title: string;
  category: string;
}

const DEFAULT_ITEMS_PER_PAGE = 8;
const DEFAULT_PLACEHOLDER_TEXT = '글 제목으로 검색해주세요.';
const DEFAULT_BUTTON_TEXT = '글쓰기';

const CommunityCardList = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [communityList, setCommunityList] = useState<CommunityData[]>([]);
  const [filteredItems, setFilteredItems] = useState<CommunityData[]>([]);
  const { user } = useUserStore();
  const router = useRouter();

  // 파이어스토어 데이터 가져오기
  const { dataList } = useCommunityDataList(`/community`);

  useEffect(() => {
    setCommunityList(dataList);
    setFilteredItems(dataList);
  }, [dataList]);

  const generateCategoryList = () => [
    '전체',
    '공지사항',
    '자유게시판',
    '질문/답변',
    '팁/정보',
    '거래게시판',
    '자랑하기',
  ];

  const categoryList = generateCategoryList();

  const setTabHandler = (index: number) => {
    setCurrentTab(index);
    const selectedCategory = categoryList[index];
    let filteredData;

    if (selectedCategory === '전체') {
      filteredData = communityList;
    } else {
      filteredData = communityList.filter(
        (item) => item.category === selectedCategory,
      );
    }

    setFilteredItems(filteredData);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    let filteredData;

    if (categoryList[currentTab] === '전체') {
      // 카테고리가 '전체'일 경우 모든 카테고리를 대상으로 검색
      filteredData = communityList.filter((item) => item.title.includes(value));
    } else {
      // 아닐 경우 '카테고리'와 '제목'을 기반으로 필터링
      filteredData = communityList.filter(
        (item) =>
          item.category === categoryList[currentTab] &&
          item.title.includes(value),
      );
    }

    setFilteredItems(filteredData);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * DEFAULT_ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - DEFAULT_ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleLoginAlert = () => {
    alert('로그인이 필요합니다.');
    router.push('/community');
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.CommunityHeader}>
        {categoryList.map((item, index) => (
          <div
            key={index}
            className={`${styles.CategoryButton} ${
              index === currentTab ? styles.Select : ''
            }`}
            onClick={() => setTabHandler(index)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className={styles.searchBoxTop}>
        <Search
          placeholder={DEFAULT_PLACEHOLDER_TEXT}
          allowClear
          height={34}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
          style={{ width: '100%' }}
        />
      </div>
      <div className={styles.container}>
        {currentItems.map((item) => (
          <CommunityCardItem key={item.id} data={item} />
        ))}
      </div>
      <div className={styles.searchWritingBox}>
        <div className={styles.searchBoxBottom}>
          <Search
            placeholder={DEFAULT_PLACEHOLDER_TEXT}
            allowClear
            height={34}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
            style={{ width: 304 }}
          />
        </div>
        {!user?.uid ? (
          <div onClick={() => handleLoginAlert()}>
            <Button data={DEFAULT_BUTTON_TEXT} />
          </div>
        ) : (
          <Link href="/community/add">
            <Button data={DEFAULT_BUTTON_TEXT} />
          </Link>
        )}
      </div>
      <div className={styles.pagination}>
        <Pagination
          defaultCurrent={currentPage}
          total={filteredItems.length}
          pageSize={DEFAULT_ITEMS_PER_PAGE}
          onChange={handlePageChange}
          hideOnSinglePage={true}
        />
      </div>
      <div className={styles.buttonCircle}>
        <Link href="/community/add">
          <ButtonCircle />
        </Link>
      </div>
    </div>
  );
};

export default CommunityCardList;

import { Pagination } from 'antd';
import Search from 'antd/es/input/Search';
import { Button } from '../button/Button';
import { useState, useEffect } from 'react';
import useUserStore from '@/store/useUsersStore';
import CommunityCardItem from './CommunityCardItem';
import styles from './CommunityCardList.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import useCommunityDataList from '@/hook/useCommunityDataList';

interface CommunityData {
  id: string;
  category: string;
  title: string;
}

const CommunityCardList = () => {
  const itemsPerPage = 8;
  const [currentTab, setCurrentTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [communityList, setCommunityList] = useState<CommunityData[]>([]);
  const [filteredItems, setFilteredItems] = useState<CommunityData[]>([]);
  const { user } = useUserStore();
  const navigate = useNavigate();

  // 파이어스토어 데이터 가져오기
  const { dataList } = useCommunityDataList(`/community`);

  useEffect(() => {
    setCommunityList(dataList);
    setFilteredItems(dataList);
  }, [dataList]);

  const CategoryList = [
    '전체',
    '자유게시판',
    '공지사항',
    '질문/답변',
    '팁/정보',
    '거래게시판',
    '자랑하기',
  ];

  const setTabHandler = (index: number) => {
    setCurrentTab(index);
    const selectedCategory = CategoryList[index];
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleLoginAlert = () => {
    alert('로그인이 필요합니다.');
    navigate('/community'); // Navigate back to /community
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const filteredData = communityList.filter(
      (item) => item.category === CategoryList[currentTab] && item.title.includes(value)
    );
    setFilteredItems(filteredData);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className={styles.CommunityHeader}>
        {CategoryList.map((item, index) => (
          <div
            key={index}
            className={
              index === currentTab
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
      <div className={styles.container}>
        {currentItems.map((item) => (
          <CommunityCardItem key={item.id} data={item} />
        ))}
      </div>
      <div className={styles.searchWritingBox}>
        <div>
          <Search
            placeholder="글 제목으로 검색해주세요."
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
            <Button data={'글쓰기'} />
          </div>
        ) : (
          <Link to={'/community/add'}>
            <Button data={'글쓰기'} />
          </Link>
        )}
      </div>
      <div className={styles.pagination}>
        <Pagination
          defaultCurrent={currentPage}
          total={filteredItems.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          hideOnSinglePage={true}
        />
      </div>
    </div>
  );
};

export default CommunityCardList;

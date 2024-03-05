import { useParams } from 'react-router-dom';
import styles from './CommunityDetail.module.scss';
import CommunityTextViewer from './CommunityTextViewer';
import useCommunityDataList from '@/hook/useCommunityDataList';
import CommunityComment from '@/components/community/CommunityComment';
import CommunityDetailHeader from '@/components/community/CommunityDetailHeader';

const CommunityDetail = () => {
  const currentUrl = useParams();

  // 게시판 상세 내용 받아오기
  const { dataList } = useCommunityDataList(`/community`);

  interface Props {
    category: string;
    createdAt: string;
    description: string;
    id: string;
    likes: [];
    postImg: string;
    title: string;
    updateAt: string;
    userId: string;
    userImg: string;
    userName: string;
    views: number;
  }

  const value = dataList?.find((item: Props) => item.id === currentUrl.id) || {};

  return (
    <div>
      <div className={styles.container}>
        <CommunityDetailHeader data={value} id={currentUrl} />
        <CommunityTextViewer data={value} />
      </div>
      <CommunityComment id={currentUrl} data={value} />
    </div>
  );
};

export default CommunityDetail;

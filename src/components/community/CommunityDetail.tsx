import { useNavigate, useParams } from 'react-router-dom';
import styles from './CommunityDetail.module.scss';
import CommunityTextViewer from './CommunityTextViewer';
import useCommunityDataList from '@/hook/useCommunityDataList';
import CommunityComment from '@/components/community/CommunityComment';
import CommunityDetailHeader from '@/components/community/CommunityDetailHeader';
import { useEffect } from 'react';
import useUserStore from '@/store/useUsersStore';
import { getAllDocument } from '@/lib/firebaseQuery';

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

const CommunityDetail = () => {
  const currentUrl = useParams();

  const { user } = useUserStore();
  const navigate = useNavigate();

  // 게시판 상세 내용 받아오기
  const { dataList } = useCommunityDataList(`/community`);

  const value =
    dataList?.find((item: Props) => item.id === currentUrl.id) || {};

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const docSnap = await getAllDocument(`/community`);

        const postExists = docSnap.some((doc) => doc.id === currentUrl.id);
        if (!postExists) {
          alert('존재하지 않는 게시물입니다.');
          navigate('/community');
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [currentUrl.id, navigate, user]);

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

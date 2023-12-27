import { useParams } from 'react-router-dom';
import CommunityTextViewer from './CommunityTextViewer';
import useCommunityDataList from '@/hook/useCommunityDataList';
import CommunityComment from '@/components/community/CommunityComment';
import CommunityDetailHeader from '@/components/community/CommunityDetailHeader';

const CommunityDetail = () => {
  const currentUrl = useParams();

  // 게시판 상세 내용 받아오기
  const { dataList } = useCommunityDataList(`/community`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any = dataList?.find((item: any) => item.id === currentUrl.id) || {};

  return (
    <div>
      <CommunityDetailHeader data={value} id={currentUrl} />
      <CommunityTextViewer data={value} />
      <CommunityComment id={currentUrl} />
    </div>
  );
};

export default CommunityDetail;

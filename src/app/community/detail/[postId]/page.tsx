import CommunityLayout from '@/app/community/CommunityLayout';
import CommunityTitle from '@/components/community/CommunityTitle';
import CommunityDetailLayout from '@/components/community/CommunityDetailLayout';
import CommunityDetail from '@/components/community/CommunityDetail';

const DetailPage = () => {
  return (
    <CommunityLayout>
      <CommunityTitle title={'커뮤니티'} />
      <CommunityDetailLayout>
        <CommunityDetail />
      </CommunityDetailLayout>
    </CommunityLayout>
  );
};

export default DetailPage;

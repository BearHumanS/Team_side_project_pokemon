import CommunityCardList from '@/components/community/CommunityCardList';
import CommunityLayout from './CommunityLayout';
import CommunityTitle from '@/components/community/CommunityTitle';

const CommunityPage = () => {
  return (
    <CommunityLayout>
      <CommunityTitle title={'커뮤니티'} />
      <CommunityCardList />
    </CommunityLayout>
  );
};

export default CommunityPage;

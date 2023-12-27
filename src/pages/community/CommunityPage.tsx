import CommunityCardList from '@/components/community/CommunityCardList';
// import CommunityHeader from '@/components/community/CommunityHeader';
import CommunityLayout from './CommunityLayout';
import CommunityTitle from '@/components/community/CommunityTitle';

const CommunityPage = () => {
  return (
    <CommunityLayout>
      <CommunityTitle title={"커뮤니티"} />
      {/* <CommunityHeader /> */}
      <CommunityCardList />
    </CommunityLayout>
  );
};

export default CommunityPage;

import CommunityCardList from '@/components/community/CommunityCardList';
// import CommunityHeader from '@/components/community/CommunityHeader';
import CommunityLayout from './CommunityLayout';
import CommunityTitle from '@/components/community/CommunityTitle';
import Meta from '@/Meta';

const CommunityPage = () => {
  return (
    <CommunityLayout>
      <Meta
        title="PokeHub :: 커뮤니티"
        description="포케허브만의 커뮤니티 공간입니다."
      />
      <CommunityTitle title={'커뮤니티'} />
      {/* <CommunityHeader /> */}
      <CommunityCardList />
    </CommunityLayout>
  );
};

export default CommunityPage;

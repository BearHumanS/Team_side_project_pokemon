import CommunityLayout from '@/app/community/CommunityLayout';
import CommunityTitle from '@/components/community/CommunityTitle';
import CommunityTextAdd from '@/components/community/CommunityTextAdd';
import CommunityDetailLayout from '@/components/community/CommunityDetailLayout';

const PostAddPage = () => {
  return (
    <CommunityLayout>
      <CommunityTitle title={'글 쓰기'} />
      <CommunityDetailLayout>
        <CommunityTextAdd />
      </CommunityDetailLayout>
    </CommunityLayout>
  );
};

export default PostAddPage;

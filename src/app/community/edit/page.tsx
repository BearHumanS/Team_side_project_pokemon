import CommunityLayout from '@/app/community/CommunityLayout';
import CommunityTitle from '@/components/community/CommunityTitle';
import CommunityDetailLayout from '@/components/community/CommunityDetailLayout';
import CommunityEditTextEditor from '@/components/community/CommunityEditTextEditor';

const PostEditPage = () => {
  return (
    <CommunityLayout>
      <CommunityTitle title={'글 수정'} />
      <CommunityDetailLayout>
        <CommunityEditTextEditor />
      </CommunityDetailLayout>
    </CommunityLayout>
  );
};

export default PostEditPage;

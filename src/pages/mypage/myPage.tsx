import Meta from '@/Meta';
import Inner from '@/components/Inner';
import Mypage from '@/components/mypage/Mypage';

const myPage = () => {
  return (
    <section>
      <Inner>
        <Meta
          title="PokeHub :: 마이페이지"
          description="나의 정보를 변경하거나 확인할 수 있습니다."
        />
        <Mypage />
      </Inner>
    </section>
  );
};

export default myPage;

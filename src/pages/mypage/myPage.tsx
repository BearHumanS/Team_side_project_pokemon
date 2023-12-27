import Inner from '@/components/Inner';
import Introduce from '@/components/mypage/Introduce';
import MyActive from '@/components/mypage/MyActive';
import Mycard from '@/components/mypage/Mycard';

const myPage = () => {
  return (
    <>
      <Inner>
        <Introduce />
        <Mycard />
        <MyActive />
      </Inner>
    </>
  );
};

export default myPage;

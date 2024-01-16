import Inner from '@/components/Inner';
import Introduce from '@/components/mypage/Introduce';
import MyActive from '@/components/mypage/MyActive';
import Mycard from '@/components/mypage/Mycard';

const myPage = () => {
  return (
    <section>
      <Inner style={{ marginBottom: '100px' }}>
        <Introduce />
        <Mycard />
        <MyActive />
      </Inner>
    </section>
  );
};

export default myPage;

import Meta from '@/Meta';
import Inner from '@/components/Inner';
import Detail from '@/components/detail/Detail';

const DetailPage = () => {
  return (
    <section>
      <Meta
        title="PokeHub :: 포켓몬 정보"
        description="포켓몬의 상세 정보를 확인할 수 있습니다."
      />
      <Inner>
        <Detail />
      </Inner>
    </section>
  );
};

export default DetailPage;

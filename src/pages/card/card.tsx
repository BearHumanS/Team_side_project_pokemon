import Meta from '@/Meta';
import CardEditPage from '@/components/cardMaker/CardEditPage';

const Card = () => {
  return (
    <section>
      <Meta
        title="PokeHub :: 카드 제작"
        description="나만의 포켓몬 카드를 제작합니다."
      />
      <CardEditPage />
    </section>
  );
};

export default Card;

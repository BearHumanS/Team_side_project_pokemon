import PokemonDex from '@/components/dex/PokemonDex';
import FilterPlates from '@/components/plate/FilterPlates';

const Dex = () => {
  return (
    <section style={{ marginTop: 0 }}>
      <FilterPlates />
      <PokemonDex />
    </section>
  );
};

export default Dex;

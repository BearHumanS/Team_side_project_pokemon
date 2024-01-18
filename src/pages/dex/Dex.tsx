import PokemonDex from '@/components/dex/PokemonDex';
import FilterPlates from '@/components/plate/FilterPlates';

const Dex = () => {
  return (
    <section>
      <FilterPlates />
      <PokemonDex />
    </section>
  );
};

export default Dex;

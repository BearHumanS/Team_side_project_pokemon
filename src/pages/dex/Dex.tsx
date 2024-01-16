import PokemonList from '@/components/list/PokemonList';
import FilterPlates from '@/components/plate/FilterPlates';

const Dex = () => {
  return (
    <section>
      <FilterPlates />
      <PokemonList />
    </section>
  );
};

export default Dex;

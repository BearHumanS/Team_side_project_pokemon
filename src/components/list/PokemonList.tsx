import styles from './PokemonList.module.scss';
import PokemonListElement from './PokemonListElement';
import Inner from '../Inner';
import useFilteredPokemonData from '@/hook/useFilteredPokemonData';
import useVisibleDataByScroll from '@/hook/useVisibleDataByScroll';

const PokemonList = () => {
  const filteredData = useFilteredPokemonData();
  const visibleData = useVisibleDataByScroll(filteredData);

  return (
    <Inner>
      <ul className={styles.pokemon_grid}>
        {visibleData.length
          ? visibleData.map((data) => (
              <PokemonListElement data={data} key={data.name} />
            ))
          : null}
      </ul>
    </Inner>
  );
};

export default PokemonList;

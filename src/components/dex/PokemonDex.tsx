import styles from './PokemonDex.module.scss';
import PokemonDexElement from './PokemonDexElement';
import Inner from '../Inner';
import useFilteredPokemonData from '@/hook/useFilteredPokemonData';
import useVisibleDataByScroll from '@/hook/useVisibleDataByScroll';

const PokemonDex = () => {
  const filteredData = useFilteredPokemonData();
  const visibleData = useVisibleDataByScroll(filteredData);

  return (
    <Inner>
      <ul className={styles.pokemon_grid}>
        {visibleData.length
          ? visibleData.map((data) => (
              <PokemonDexElement data={data} key={data.name} />
            ))
          : null}
      </ul>
    </Inner>
  );
};

export default PokemonDex;

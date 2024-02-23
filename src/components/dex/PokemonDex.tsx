import styles from './PokemonDex.module.scss';
import PokemonDexElement from './PokemonDexElement';
import Inner from '../Inner';
import useFilteredPokemonData from '@/hook/useFilteredPokemonData';
import useVisibleDataByScroll from '@/hook/useVisibleDataByScroll';
import Loading from '../loading/Loading';

const PokemonDex = () => {
  const { filteredData, isLoading } = useFilteredPokemonData();
  const visibleData = useVisibleDataByScroll(filteredData);

  if (isLoading) {
    return <Loading />;
  }

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

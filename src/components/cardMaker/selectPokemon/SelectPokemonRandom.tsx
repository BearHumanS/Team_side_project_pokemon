import { PokemonType } from '@/lib/type';
import { useGetAllPokemon } from '@/query/qeuries';
import { useCallback, useEffect, useState } from 'react';
import SelectPokemonLayout from './SelectPokemonLayout';
import styles from './select.module.scss';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';

const SelectPokemonRandom = () => {
  const { data } = useGetAllPokemon(1017);
  const [randomPokemons, setRandomPokemons] = useState<PokemonType[]>([]);
  const windowWidth = useCalculateInnerWidth();
  let POKEMONS_PER_PAGE = 3;

  if (windowWidth <= 768) {
    POKEMONS_PER_PAGE = 2;
  }

  const getRandomPokemon = useCallback(() => {
    if (data && data.length > 0) {
      const tempArray: PokemonType[] = [];
      const maxIndex = data.length;

      for (let i = 0; i < POKEMONS_PER_PAGE; i++) {
        const randomIndex = Math.floor(Math.random() * maxIndex);
        const randomPokemon = data[randomIndex];
        tempArray.push(randomPokemon);
      }
      setRandomPokemons(tempArray);
    }
  }, [data, POKEMONS_PER_PAGE]);

  useEffect(() => {
    getRandomPokemon();
  }, [getRandomPokemon]);

  return (
    <div className={styles.select_wrapper}>
      <span className={styles.title}>랜덤 포켓몬</span>
      <div className={styles.random_container}>
        <SelectPokemonLayout
          pokemonArray={randomPokemons}
          range={POKEMONS_PER_PAGE}
        />
        <button className={styles.border_button} onClick={getRandomPokemon}>
          랜덤
        </button>
      </div>
    </div>
  );
};

export default SelectPokemonRandom;

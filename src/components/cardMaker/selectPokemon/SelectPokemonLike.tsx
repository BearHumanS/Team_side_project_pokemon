import SelectPokemonLayout from './SelectPokemonLayout';
import styles from './select.module.scss';
import { IoChevronForward } from '@react-icons/all-files/io5/IoChevronForward';
import { IoChevronBack } from '@react-icons/all-files/io5/IoChevronBack';
import useLikedStore from '@/store/useLikedStore';
import { useMemo } from 'react';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';
import useSlide from '@/hook/useSlide';

const SelectPokemonLike = () => {
  const { pokemonData } = useLikedStore();
  const windowWidth = useCalculateInnerWidth();
  let POKEMONS_PER_PAGE = 3;

  if (windowWidth <= 768) {
    POKEMONS_PER_PAGE = 2;
  }

  const { index, prevSlide, nextSlide } = useSlide(
    pokemonData.length,
    POKEMONS_PER_PAGE,
  );

  const likePokemonArray = useMemo(() => {
    const arrayLength = pokemonData.length;
    if (arrayLength <= 2) {
      return [
        ...pokemonData,
        ...Array(POKEMONS_PER_PAGE - arrayLength).fill(null),
      ];
    }

    const selectedPokemon = [
      pokemonData[index % arrayLength],
      pokemonData[(index + 1) % arrayLength],
    ];

    if (POKEMONS_PER_PAGE === 3) {
      selectedPokemon.push(pokemonData[(index + 2) % arrayLength]);
    }

    return selectedPokemon;
  }, [pokemonData, index, POKEMONS_PER_PAGE]);

  return (
    <div className={styles.select_wrapper}>
      <span className={styles.title}>찜한 포켓몬</span>
      <div className={styles.like_container}>
        <button
          className={styles.page_button}
          onClick={prevSlide}
          disabled={pokemonData.length <= 3}
        >
          <IoChevronBack />
        </button>
        <SelectPokemonLayout
          pokemonArray={likePokemonArray}
          range={POKEMONS_PER_PAGE}
        />
        <button
          className={styles.page_button}
          onClick={nextSlide}
          disabled={pokemonData.length <= 3}
        >
          <IoChevronForward />
        </button>
      </div>
    </div>
  );
};

export default SelectPokemonLike;

import CardsRowLayout from './CardsRowLayout';
import styles from './cards.module.scss';
import { IoChevronForward } from '@react-icons/all-files/io5/IoChevronForward';
import { IoChevronBack } from '@react-icons/all-files/io5/IoChevronBack';
import useLikedStore from '@/store/useLikedStore';
import { useState, useMemo, useCallback } from 'react';

const CardsRowLike = () => {
  const { pokemonData } = useLikedStore();
  const [index, setIndex] = useState(0);

  const prevSlide = useCallback(() => {
    if (pokemonData.length <= 3) return;
    setIndex((prevIndex) =>
      prevIndex === 0 ? pokemonData.length - 1 : prevIndex - 1,
    );
  }, [pokemonData.length]);

  const nextSlide = useCallback(() => {
    if (pokemonData.length <= 3) return;
    setIndex((prevIndex) =>
      prevIndex === pokemonData.length - 1 ? 0 : prevIndex + 1,
    );
  }, [pokemonData.length]);

  const likePokemonArray = useMemo(() => {
    const arrayLength = pokemonData.length;
    if (arrayLength <= 2) {
      return [...pokemonData, ...Array(3 - arrayLength).fill(null)];
    }

    const selectedPokemon = [
      pokemonData[index % arrayLength],
      pokemonData[(index + 1) % arrayLength],
      pokemonData[(index + 2) % arrayLength],
    ];

    return selectedPokemon;
  }, [pokemonData, index]);

  return (
    <div className={styles.pokemon_select_wrapper}>
      <span className={styles.title}>내가 찜한 포켓몬</span>
      <div>
        <button
          className={styles.page_button}
          onClick={prevSlide}
          disabled={pokemonData.length <= 3}
        >
          <IoChevronBack />
        </button>
        <CardsRowLayout pokemonArray={likePokemonArray} />
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

export default CardsRowLike;

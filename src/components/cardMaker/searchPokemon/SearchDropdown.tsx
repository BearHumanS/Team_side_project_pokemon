import Image from 'next/image';
import styles from './search.module.scss';
import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';
import { PokemonType } from '@/lib/type';
import { useState } from 'react';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { reverseObject } from '@/lib/util/reverseObject';
import { IoChevronForward } from '@react-icons/all-files/io5/IoChevronForward';
import { IoChevronBack } from '@react-icons/all-files/io5/IoChevronBack';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';

interface SearchDropdownProps {
  searchResults: (PokemonType | undefined)[] | null;
  setIsOpen: (arg: boolean) => void;
}

const SearchDropdown = ({ searchResults, setIsOpen }: SearchDropdownProps) => {
  const { setPokemonData, generateRandomNicknames } =
    useSelectedPokemonForCard();
  const [currentPage, setCurrentPage] = useState(1);
  const windowWidth = useCalculateInnerWidth();
  let POKEMONS_PER_PAGE = 12;

  if (windowWidth < 768) {
    POKEMONS_PER_PAGE = 6;
  }
  const handleClick = (pokemon: PokemonType | null) => {
    generateRandomNicknames();
    setPokemonData(pokemon);
    setIsOpen(false);
  };

  const totalPages = Math.ceil(
    (searchResults?.length ?? 0) / POKEMONS_PER_PAGE,
  );

  const getVisiblePokemons = () => {
    if (!searchResults) return null;

    return searchResults.length > POKEMONS_PER_PAGE
      ? searchResults.slice(
          (currentPage - 1) * POKEMONS_PER_PAGE,
          currentPage * POKEMONS_PER_PAGE,
        )
      : searchResults;
  };

  const renderPaginationNumbers = () => {
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    const renderButton = (pageNumber: number) => (
      <button
        key={pageNumber}
        onClick={() => setCurrentPage(pageNumber)}
        className={`${styles.pagination_button} ${
          currentPage === pageNumber ? styles.action : ''
        }`}
      >
        {pageNumber}
      </button>
    );

    return Array.from({ length: endPage - startPage + 1 }, (_, index) =>
      renderButton(startPage + index),
    );
  };

  const onPrevArrow = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextArrow = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentPagePokemons = getVisiblePokemons();

  return (
    <div className={styles.dropdown_wrapper}>
      <ul className={styles.dropdown_container}>
        {currentPagePokemons?.map((pokemon: PokemonType | undefined) => (
          <li
            className={styles.dropdown_list}
            key={pokemon?.id}
            onClick={() => handleClick(pokemon ? pokemon : null)}
          >
            <div className={styles.img_wrapper}>
              <Image
                src={
                  pokemon?.id !== 1013
                    ? pokemon?.sprites?.other?.['official-artwork']
                        ?.front_default || ''
                    : '/pokemonImg/그우린차.webp'
                }
                alt="포켓몬 이미지"
                width={106}
                height={106}
              />
            </div>
            <span>{pokemon && reverseObject(POKEMON_NAME)[pokemon.name]}</span>
          </li>
        ))}
        {!searchResults && <span>포켓몬을 찾지 못했습니다.</span>}
      </ul>
      {totalPages > 1 && (
        <div className={styles.pagination_wrapper}>
          <button
            onClick={onPrevArrow}
            disabled={currentPage === 1}
            className={styles.arrow_button}
          >
            <IoChevronBack />
          </button>
          {renderPaginationNumbers()}
          <button
            onClick={onNextArrow}
            disabled={currentPage === totalPages}
            className={styles.arrow_button}
          >
            <IoChevronForward />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;

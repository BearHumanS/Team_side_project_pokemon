import { PokemonType } from '@/lib/type';
import styles from './cards.module.scss';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { reverseObject } from '@/lib/util/reverseObject';
import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';
import { useCallback } from 'react';

interface CardsRowLayoutProps {
  pokemonArray: (PokemonType | null)[];
}

const CardsRowLayout = ({ pokemonArray }: CardsRowLayoutProps) => {
  const { setPokemonData } = useSelectedPokemonForCard();

  const handlePokemonSelection = useCallback(
    (pokemon: PokemonType | null) => {
      pokemon && setPokemonData(pokemon);
    },
    [setPokemonData],
  );

  return (
    <div className={styles.cards__row_cards}>
      {pokemonArray.map((pokemonData, index) => (
        <div
          key={pokemonData ? pokemonData.id : index}
          className={styles.cards__row_cards__column}
        >
          <div className={styles.cards__row_cards__card}>
            {pokemonData ? (
              <img
                src={
                  pokemonData.id !== 1013
                    ? pokemonData.sprites?.other?.['official-artwork']
                        ?.front_default
                    : '/pokemonImg/그우린차.webp'
                }
                alt="포켓몬 이미지"
              />
            ) : null}
          </div>
          <span>
            {pokemonData ? reverseObject(POKEMON_NAME)[pokemonData.name] : ''}
          </span>
          {pokemonData ? (
            <button
              className={styles.border_button}
              onClick={() => handlePokemonSelection(pokemonData)}
            >
              포켓몬 사용
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default CardsRowLayout;

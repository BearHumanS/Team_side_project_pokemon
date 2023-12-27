import { PokemonType } from '@/lib/type';
import styles from './cards.module.scss';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { reverseObject } from '@/lib/util/reverseObject';
import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';
import { useCallback } from 'react';

interface CardsRowLayoutProps {
  pokemonArray: PokemonType[];
}

const CardsRowLayout = ({ pokemonArray }: CardsRowLayoutProps) => {
  const { setPokemonData } = useSelectedPokemonForCard();

  const handlePokemonSelection = useCallback(
    (pokemon: PokemonType) => {
      setPokemonData(pokemon);
    },
    [setPokemonData],
  );

  return (
    <div className={styles.cards__row_cards}>
      {pokemonArray.map((pokemonData) =>
        pokemonData ? (
          <div key={pokemonData.id} className={styles.cards__row_cards__column}>
            <div className={styles.cards__row_cards__card}>
              <img
                src={
                  pokemonData.sprites?.other?.['official-artwork']
                    ?.front_default
                }
                alt="포켓몬 이미지"
              />
            </div>
            <span>{reverseObject(POKEMON_NAME)[pokemonData.name]}</span>
            <button
              className={styles.border_button}
              onClick={() => handlePokemonSelection(pokemonData)}
            >
              포켓몬 사용
            </button>
          </div>
        ) : null,
      )}
    </div>
  );
};

export default CardsRowLayout;

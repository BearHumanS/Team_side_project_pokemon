import { PokemonType } from '@/lib/type';
import styles from './select.module.scss';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { reverseObject } from '@/lib/util/reverseObject';
import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';
import { useCallback } from 'react';

interface SelectPokemonLayoutProps {
  pokemonArray: (PokemonType | null)[];
}

const SelectPokemonLayout = ({ pokemonArray }: SelectPokemonLayoutProps) => {
  const { setPokemonData, generateRandomNicknames } =
    useSelectedPokemonForCard();

  const handlePokemonSelection = useCallback(
    (pokemon: PokemonType | null) => {
      generateRandomNicknames();
      pokemon && setPokemonData(pokemon);
    },
    [setPokemonData, generateRandomNicknames],
  );

  return (
    <div className={styles.layout_wrapper}>
      {pokemonArray.map((pokemonData, index) => (
        <div
          key={pokemonData ? pokemonData.id : index}
          className={styles.layout_container}
        >
          <div className={styles.image}>
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

export default SelectPokemonLayout;

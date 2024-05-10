import Image from 'next/image';
import { PokemonType } from '@/lib/type';
import styles from './select.module.scss';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { reverseObject } from '@/lib/util/reverseObject';
import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';
import { useCallback } from 'react';

interface SelectPokemonLayoutProps {
  pokemonArray: (PokemonType | null)[];
  range: number;
}

const SelectPokemonLayout = ({
  pokemonArray,
  range,
}: SelectPokemonLayoutProps) => {
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
      {Array.from({ length: range }, (_, index) => (
        <div
          key={pokemonArray[index] ? pokemonArray[index]?.id : index}
          className={styles.layout_container}
        >
          <div className={styles.image}>
            {pokemonArray[index] ? (
              <Image
                src={
                  pokemonArray[index]?.id !== 1013
                    ? pokemonArray[index]?.sprites?.other?.['official-artwork']
                        ?.front_default || ''
                    : '/pokemonImg/그우린차.webp'
                }
                alt="포켓몬 이미지"
                width={100}
                height={100}
              />
            ) : null}
          </div>
          <span>
            {pokemonArray[index]
              ? reverseObject(POKEMON_NAME)[pokemonArray[index]!.name]
              : ''}
          </span>
          <button
            disabled={!pokemonArray[index]}
            className={styles.border_button}
            onClick={() => handlePokemonSelection(pokemonArray[index])}
          >
            포켓몬 사용
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectPokemonLayout;

import Image from 'next/image';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { reverseObject } from '@/lib/util/reverseObject';
import { memo } from 'react';
import styles from './Mypage.module.scss';
import { FiPlus } from '@react-icons/all-files/fi/FiPlus';
import { PokemonType } from '@/lib/type';

interface RenderPokemonProps {
  pokemon: PokemonType;
  onCancelLiked: (pokemonId: string | number) => void;
  onMoveToPokemonDetail: (pokemonId: string | number) => void;
}

// eslint-disable-next-line react/display-name
const RenderPokemon = memo(
  ({ pokemon, onCancelLiked, onMoveToPokemonDetail }: RenderPokemonProps) => {
    return (
      <div key={pokemon.id} className={styles.myactive__liked__pokemon__box}>
        <div className={styles.myactive__liked__pokemon}>
          <button
            className={styles.myactive__liked__cancel}
            onClick={() => onCancelLiked(pokemon.id)}
          >
            <FiPlus size={14} />
          </button>
          <Image
            src={
              pokemon.sprites.other?.['official-artwork'].front_default ||
              '/pokemonImg/그우린차.webp'
            }
            alt="찜한 포켓몬"
            width={100}
            height={100}
            onClick={() => onMoveToPokemonDetail(pokemon.id)}
          />
        </div>
        <span>{reverseObject(POKEMON_NAME)[pokemon.name]}</span>
      </div>
    );
  },
);

export default RenderPokemon;

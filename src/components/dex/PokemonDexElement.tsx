import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './PokemonDex.module.scss';
import { reverseObject } from '@/lib/util/reverseObject';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { POKEMON_TYPES } from '@/lib/constants';
import Plate from '../plate/Plate';
import { PokemonType, TypesType } from '@/lib/type';
import PokemonDexElementLayout from './PokemonDexElementLayout';

interface PokemonDexElementProp {
  data: PokemonType;
}

const PokemonDexElement = ({ data }: PokemonDexElementProp) => {
  const router = useRouter();
  return (
    <PokemonDexElementLayout
      data={data}
      onClick={() => {
        router.push(`/pokemon/${data.id}`);
      }}
      className={styles.padding_bottom_35px}
    >
      <Image
        className={styles.pokemon_image}
        src={
          data.id !== 1013
            ? data.sprites?.other?.['official-artwork']?.front_default || ''
            : '/pokemonImg/그우린차.webp'
        }
        alt="포켓몬 이미지"
        width={141}
        height={141}
      />
      <span className={styles.pokemon_name}>
        {reverseObject(POKEMON_NAME)[data.name]}
      </span>
      <div className={styles.pokemon_type}>
        {data.types.map((typeData: TypesType) => (
          <Plate
            key={typeData.type.name}
            pokemonTypeProp={POKEMON_TYPES[typeData.type.name]}
          />
        ))}
      </div>
    </PokemonDexElementLayout>
  );
};

export default PokemonDexElement;

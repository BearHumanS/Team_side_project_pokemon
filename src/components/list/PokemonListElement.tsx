import { useNavigate } from 'react-router-dom';
import styles from './PokemonList.module.scss';
import { reverseObject } from '@/lib/util/reverseObject';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { POKEMON_TYPES } from '@/lib/constants';
import Plate from '../plate/Plate';
import { PokemonType, TypesType } from '@/lib/type';
import PokemonListElementLayout from './PokemonListElementLayout';

interface PokemonListElementProp {
  data: PokemonType;
}

const PokemonListElement = ({ data }: PokemonListElementProp) => {
  const navigate = useNavigate();
  return (
    <PokemonListElementLayout
      data={data}
      onClick={() => {
        navigate(`/pokemon/${data.id}`);
      }}
      className={styles.padding_bottom_35px}
    >
      <img
        loading="lazy"
        className={styles.pokemon_image}
        src={data.sprites?.other?.['official-artwork']?.front_default}
        alt="포켓몬 이미지"
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
    </PokemonListElementLayout>
  );
};

export default PokemonListElement;

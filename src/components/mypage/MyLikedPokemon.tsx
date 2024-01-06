import { arrayRemove } from 'firebase/firestore';
import styles from './Mypage.module.scss';
import useUserStore from '@/store/useUsersStore';
import { useNavigate } from 'react-router-dom';
import useLikedStore from '@/store/useLikedStore';
import RenderPokemon from './RenderPokemon';
import { updateDocument } from '@/lib/firebaseQuery';

const MyLikedPokemon = () => {
  const { user } = useUserStore();
  const { pokemonData } = useLikedStore();

  const navigate = useNavigate();

  const onCancelLiked = async (pokemonId: string | number) => {
    if (user?.uid) {
      await updateDocument(`/likes/${user.uid}`, {
        pokemons: arrayRemove(pokemonId),
      });
    }
  };

  const onMoveToPokemonDetail = (pokemonId: string | number) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  return (
    <>
      <div className={styles.myactive__right__container}>
        <div className={styles.myactive__liked__title}>
          <span>찜한 포켓몬</span>
        </div>
        <div className={styles.myactive__liked__box}>
          {pokemonData.map((pokemon) => (
            <RenderPokemon
              key={pokemon.id}
              pokemon={pokemon}
              onCancelLiked={onCancelLiked}
              onMoveToPokemonDetail={onMoveToPokemonDetail}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyLikedPokemon;

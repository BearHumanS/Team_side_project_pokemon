import { useEffect, useState } from 'react';
import styles from './Detail.module.scss';
import { FaRegHeart } from '@react-icons/all-files/fa/FaRegHeart';
import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import useUserStore from '@/store/useUsersStore';
import { getDocument, setDocument } from '@/lib/firebaseQuery';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';

interface LikePokemonProps {
  pokemonId: string | number;
  isLoading: boolean;
}

const LikePokemon = ({ pokemonId, isLoading }: LikePokemonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [animate, setAnimate] = useState(false);

  const { user } = useUserStore();
  const windowWidth = useCalculateInnerWidth();

  const fetchLikeState = async () => {
    if (!user?.uid) return;

    try {
      const docSanp = await getDocument(`/likes/${user.uid}`);

      if (docSanp) {
        const likes = docSanp.data().pokemons || [];
        setIsLiked(likes.includes(pokemonId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onToggleLike = async () => {
    if (!user?.uid) {
      return alert('로그인이 필요합니다.');
    }
    setAnimate(true);
    try {
      const docSnap = await getDocument(`/likes/${user.uid}`);
      let likes = [];

      setTimeout(() => setAnimate(false), 1000);

      if (docSnap) {
        likes = docSnap.data().pokemons || [];
        if (likes.includes(pokemonId)) {
          likes = likes.filter((id: string) => id !== pokemonId);
        } else {
          likes.push(pokemonId);
        }
      } else {
        likes = [pokemonId];
      }

      await setDocument(`/likes/${user.uid}`, {
        uid: user.uid,
        pokemons: likes,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLiked((prev) => !prev);
    }
  };

  useEffect(() => {
    fetchLikeState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonId, user?.uid]);

  return (
    <div
      className={`${styles.stats__like__box} ${
        windowWidth <= 768 ? styles.mobile : ''
      }`}
    >
      <button
        className={`${styles.stats__like} ${
          !user ? styles.disabledButton : ''
        }`}
        onClick={onToggleLike}
        disabled={isLoading}
      >
        {isLiked ? (
          <FaHeart
            size={18}
            color="#FF5050"
            className={`${styles.stats__like__animate} ${
              animate ? styles.animateHeart : ''
            }`}
          />
        ) : (
          <FaRegHeart
            size={18}
            color={isLoading || !user ? '#999' : '#FF5050'}
          />
        )}
        <span className={`${!user ? styles.disabledText : ''}`}>찜하기</span>
      </button>
    </div>
  );
};

export default LikePokemon;

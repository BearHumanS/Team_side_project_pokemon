import { arrayRemove } from 'firebase/firestore';
import styles from './Mypage.module.scss';
import useUserStore from '@/store/useUsersStore';
import { useRouter } from 'next/navigation';
import useLikedStore from '@/store/useLikedStore';
import RenderPokemon from './RenderPokemon';
import { updateDocument } from '@/lib/firebaseQuery';
import { Pagination } from 'antd';
import { useState } from 'react';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';

const MyLikedPokemon = () => {
  const { user } = useUserStore();
  const { pokemonData } = useLikedStore();
  const [currentPage, setCurrentPage] = useState(1);
  const windowWidth = useCalculateInnerWidth();
  const itemsPerPage = windowWidth <= 768 ? 6 : 12;

  const router = useRouter();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pokemonData.slice(indexOfFirstItem, indexOfLastItem);

  const onCancelLiked = async (pokemonId: string | number) => {
    if (user?.uid) {
      await updateDocument(`/likes/${user.uid}`, {
        pokemons: arrayRemove(pokemonId),
      });

      const newTotal = pokemonData.length - 1;
      const maxPage = Math.ceil(newTotal / itemsPerPage);
      if (currentPage > maxPage) {
        setCurrentPage(maxPage > 0 ? maxPage : 1);
      }
    }
  };

  const onMoveToPokemonDetail = (pokemonId: string | number) => {
    router.push(`/pokemon/${pokemonId}`);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className={styles.myactive__right__container}>
        <div className={styles.myactive__liked__title}>
          <span>찜한 포켓몬</span>
        </div>
        {pokemonData.length === 0 ? (
          <>
            <div className={styles.myactive__liked__box__none}>
              찜한 포켓몬이 없습니다.
            </div>
          </>
        ) : (
          <>
            <div className={styles.myactive__liked__box}>
              {currentItems.map((pokemon) => (
                <RenderPokemon
                  key={pokemon.id}
                  pokemon={pokemon}
                  onCancelLiked={onCancelLiked}
                  onMoveToPokemonDetail={onMoveToPokemonDetail}
                />
              ))}
            </div>
          </>
        )}

        <div className={styles.pagination}>
          <Pagination
            defaultCurrent={currentPage}
            total={pokemonData.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            hideOnSinglePage={true}
          />
        </div>
      </div>
    </>
  );
};

export default MyLikedPokemon;

import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';
import CardsRowLike from '@/components/cardEdit/CardsRowLike';
import CardsRowRandom from '@/components/cardEdit/CardsRowRandom';
import styles from './cards.module.scss';
import PokemonCard from '../card/PokemonCard';
import CardEditor from './CardEditor';
import Inner from '../Inner';
import { addDocument, getCountDocument } from '@/lib/firebaseQuery';
import useUserStore from '@/store/useUsersStore';
import { MouseEvent } from 'react';
import { filteredPokemonData } from '@/lib/type';
import { useGetAllPokemon } from '@/query/qeuries';
import PokemonSearch from './PokemonSearch';
import { useEffect } from 'react'; // 추가

const CardPage = () => {
  const { user } = useUserStore();
  const {
    pokemonData,
    pokemonNickName1,
    pokemonNickName2,
    setPokemonData,
    pokemonName,
  } = useSelectedPokemonForCard();
  const { data } = useGetAllPokemon(1017);
  const filteredPokemonData = {} as filteredPokemonData;

  useEffect(() => {
    if (!pokemonData && data) {
      const dittoData = data[131];
      setPokemonData(dittoData);
    }
  }, [pokemonData, data, setPokemonData]);

  if (pokemonData) {
    const { id, stats, types, name, sprites } = pokemonData;

    filteredPokemonData['id'] = id;
    filteredPokemonData['stats'] = stats;
    filteredPokemonData['types'] = types;
    filteredPokemonData['name'] = name;
    filteredPokemonData['sprites'] =
      sprites.other?.['official-artwork'].front_default;
  }

  const onSave = async (event: MouseEvent) => {
    event.preventDefault();
    if (user) {
      const count = await getCountDocument(`cards/${user.uid}/pokemonCards`);

      if (count > 5) {
        console.log('카드 개수가 6개를 초과하여 추가할 수 없습니다.');
        return;
      }

      await addDocument(`cards/${user.uid}/pokemonCards`, {
        pokemonCardData: [
          filteredPokemonData,
          pokemonNickName1,
          pokemonNickName2,
          pokemonName,
        ],
        createdAt: new Date().toISOString(),
        uid: user.uid,
      });
    }
  };

  return (
    <Inner>
      <div className={styles.card_page_wrapper}>
        <PokemonSearch />
        <div className={styles.product_card_wrapper}>
          <span className={styles.title}>카드 제작</span>
          <div className={styles.product_card_container_decoration__top}></div>
          <div className={styles.product_card_container}>
            <PokemonCard pokemonCardData={filteredPokemonData} />
            <CardEditor />
          </div>
          <div
            className={styles.product_card_container_decoration__bottom}
          ></div>
        </div>
        <div className={styles.select_wrapper}>
          <CardsRowLike />
          <CardsRowRandom />
        </div>
      </div>
      <button onClick={onSave}>저장하기</button>
    </Inner>
  );
};

export default CardPage;

import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';
import SelectPokemonLike from '@/components/cardMaker/selectPokemon/SelectPokemonLike';
import SelectPokemonRandom from '@/components/cardMaker/selectPokemon/SelectPokemonRandom';
import styles from './cardEditPage.module.scss';
import PokemonCard from '../card/PokemonCard';
import CardEditor from './CardEditor';
import Inner from '../Inner';
import { addDocument, getCountDocument } from '@/lib/firebaseQuery';
import useUserStore from '@/store/useUsersStore';
import { MouseEvent } from 'react';
import { filteredPokemonData } from '@/lib/type';
import { useGetAllPokemon } from '@/query/qeuries';
import SearchPokemon from './searchPokemon/SearchPokemon';
import { useEffect } from 'react';

const CardEditPage = () => {
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

  const pokemonNickName = {
    pokemonNickName1,
    pokemonNickName2,
    pokemonName,
  };

  return (
    <Inner>
      <div className={styles.wrapper}>
        <SearchPokemon />
        <div className={styles.card_wrapper}>
          <span className={styles.title}>카드 제작</span>
          <div className={styles.card_decoration}>
            <div className={styles.card_container}>
              <PokemonCard
                pokemonCardData={filteredPokemonData}
                pokemonNickName={pokemonNickName}
              />
              <CardEditor />
            </div>
          </div>
        </div>
        <div className={styles.select_wrapper}>
          <SelectPokemonLike />
          <SelectPokemonRandom />
        </div>
        <button className={styles.save_button} onClick={onSave}>
          저장하기
        </button>
      </div>
    </Inner>
  );
};

export default CardEditPage;

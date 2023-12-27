import {
  POKEMON_NICKNAME1,
  POKEMON_NICKNAME2,
  POKEMON_STATS,
  POKEMON_TYPES,
} from '@/lib/constants';
import styles from './cards.module.scss';
import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';
import StatusBar from '../detail/StatusBar';
import Plate from '../plate/Plate';
import { Stat, TypesType } from '@/lib/type';
import { useEffect } from 'react';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { reverseObject } from '@/lib/util/reverseObject';

const CardEditor = () => {
  const {
    pokemonData,
    pokemonNickName1,
    pokemonNickName2,
    pokemonName,
    setPokemonNickName1,
    setPokemonNickName2,
    setPokemonName,
  } = useSelectedPokemonForCard();

  useEffect(() => {
    pokemonData &&
      setPokemonName(reverseObject(POKEMON_NAME)[pokemonData?.name]);
  }, [pokemonData, setPokemonName]);

  const getRandomNickName = (NickNames: string[], index: number) => {
    const randomIndex = Math.floor(Math.random() * NickNames.length);
    const randomNickName = NickNames[randomIndex];
    index === 1
      ? setPokemonNickName1(randomNickName)
      : setPokemonNickName2(randomNickName);
  };

  const renderStatusBar = (baseStat: Stat, index: number, statName: string) => (
    <li key={index}>
      <span>{statName}</span>
      {pokemonData ? (
        <StatusBar baseStat={baseStat} pokemonTypes={pokemonData?.types} />
      ) : null}
    </li>
  );

  const renderPlate = (pokemonType: TypesType) => (
    <Plate
      key={pokemonType.type.name}
      pokemonTypeProp={POKEMON_TYPES[pokemonType.type.name]}
    />
  );

  return (
    <div className={styles.editor_wrapper}>
      <div className={styles.editor_wrapper__top}>
        <span className={styles.title}>몬스터 이름</span>
        <ul className={styles.pokemon_name_editor}>
          <li>
            <span className={styles.list_name}>별칭 1</span>
            <div>
              <span>{pokemonNickName1}</span>
              <button
                className={styles.border_button}
                onClick={() => {
                  getRandomNickName(POKEMON_NICKNAME1, 1);
                }}
              >
                랜덤
              </button>
            </div>
          </li>
          <li>
            <span className={styles.list_name}>별칭 2</span>
            <div>
              <span>{pokemonNickName2}</span>
              <button
                className={styles.border_button}
                onClick={() => {
                  getRandomNickName(POKEMON_NICKNAME2, 2);
                }}
              >
                랜덤
              </button>
            </div>
          </li>
          <li>
            <span className={styles.list_name}>이름</span>
            <input
              className={styles.name_input}
              type="text"
              value={pokemonName || ''}
              onChange={(event) => {
                setPokemonName(event.target.value);
              }}
            />
          </li>
        </ul>
      </div>
      <div className={styles.editor_wrapper__bottom}>
        <div className={styles.status_title}>
          <span className={styles.title}>스테이터스</span>
          <div>{pokemonData?.types.map(renderPlate)}</div>
        </div>
        <ul className={styles.status_bar_container}>
          {pokemonData &&
            pokemonData.stats.map((stat, index) =>
              renderStatusBar(stat, index, POKEMON_STATS[index]),
            )}
        </ul>
      </div>
    </div>
  );
};

export default CardEditor;

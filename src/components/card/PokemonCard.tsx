import { TypesType, filteredPokemonData } from '@/lib/type';
import styles from './pokemonCard.module.scss';
import Plate from '../plate/Plate';
import { POKEMON_STATS, POKEMON_TYPES } from '@/lib/constants';
import StatusBar from '../detail/StatusBar';
import { useLocation } from 'react-router-dom';

interface PokemonCardProp {
  pokemonCardData: filteredPokemonData;
  pokemonNickName?: {
    pokemonNickName1: string | null;
    pokemonNickName2: string | null;
    pokemonName: string | null;
  };
  isOpen?: boolean;
}

const PokemonCard = ({
  pokemonNickName,
  pokemonCardData: data,
  isOpen,
}: PokemonCardProp) => {
  const location = useLocation();
  const isMyPage = location.pathname.includes('mypage');

  if (!data || Object.keys(data).length === 0) {
    // 임시로 null처리
    // 추후 로딩 ui 등으로 처리하기
    return null;
  }

  const firstType = data?.types?.[0].type.name;

  const setClassName = (mainClassName: string) => {
    const typeClass = firstType ? styles[POKEMON_TYPES[firstType]] : '';
    return isMyPage
      ? isOpen
        ? `${styles[`${mainClassName}__my`]} ${styles.isOpen} ${typeClass}`
        : `${styles[`${mainClassName}__my`]} ${typeClass}`
      : `${styles[mainClassName]} ${typeClass}`;
  };

  const setMyClassName = (className: string) => {
    return isMyPage ? styles[`${className}__my`] : styles[className];
  };

  const renderStatus = () => {
    const statusClassName = setMyClassName('status');
    const columnIndex = [0, 1, 2];

    return columnIndex.map((index) => (
      <div key={index}>
        <div className={statusClassName}>
          <span>{POKEMON_STATS[index]}</span>
          {data ? (
            <StatusBar
              baseStat={data?.stats[index]}
              pokemonTypes={data?.types}
            />
          ) : null}
        </div>
        <div className={statusClassName}>
          <span>{POKEMON_STATS[index + 3]}</span>
          {data ? (
            <StatusBar
              baseStat={data?.stats[index + 3]}
              pokemonTypes={data?.types}
            />
          ) : null}
        </div>
      </div>
    ));
  };

  return (
    <div className={setClassName('wrapper')}>
      <div className={setClassName('pokemon_number')}>{`No.${data?.id}`}</div>
      <div className={styles.white_block}>
        <img
          className={setMyClassName('monster_ball_left')}
          src="/monster-ball1.svg"
          alt=""
        />
        <img
          className={setMyClassName('monster_ball_right')}
          src="/monster-ball2.svg"
          alt=""
        />
        <div className={setClassName('container')}>
          <div className={setMyClassName('container__top')}>
            <div className={setMyClassName('type_containter')}>
              {data?.types.map((pokemonType: TypesType) => (
                <Plate
                  key={pokemonType.type.name}
                  pokemonTypeProp={POKEMON_TYPES[pokemonType.type.name]}
                />
              ))}
            </div>
            <img
              className={setMyClassName('pokemon_image')}
              src={
                data.id !== 1013 ? data.sprites : '/pokemonImg/그우린차.webp'
              }
              alt="포켓몬 이미지"
            />
            <div className={styles.pokemon_intro}>
              <div className={setMyClassName('pokemon_name')}>
                <span className={setMyClassName('text_small')}>
                  {pokemonNickName?.pokemonNickName1}
                </span>
                <span className={setMyClassName('text_small')}>
                  {pokemonNickName?.pokemonNickName2}
                </span>
              </div>
              <span className={setMyClassName('text_large')}>
                {pokemonNickName?.pokemonName}
              </span>
            </div>
          </div>
          <div className={setMyClassName('container__bottom')}>
            {renderStatus()}
            <div>
              <img
                className={setMyClassName('logo')}
                src="/logo-pokehub.png"
                alt="PoketHub"
              />
              <div className={styles.total_stat}>
                <span className={setMyClassName('text_small')}>Total</span>
                <span className={setMyClassName('text_large')}>
                  {data?.stats.reduce(
                    (acc, baseStat) => acc + baseStat.base_stat,
                    0,
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;

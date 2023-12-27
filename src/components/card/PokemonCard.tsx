import { TypesType, filteredPokemonData } from '@/lib/type';
import styles from './pokemonCard.module.scss';
import Plate from '../plate/Plate';
import { POKEMON_STATS, POKEMON_TYPES } from '@/lib/constants';
import StatusBar from '../detail/StatusBar';
import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';
import { useLocation } from 'react-router-dom';

interface PokemonCardProp {
  pokemonCardData: filteredPokemonData;
  pokemonNickName?: {
    pokemonNickName1: string;
    pokemonNickName2: string;
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
  const { pokemonName, pokemonNickName1, pokemonNickName2 } =
    useSelectedPokemonForCard();

  if (!data || Object.keys(data).length === 0) {
    // 임시로 null처리
    // 추후 로딩 ui 등으로 처리하기
    return null;
  }

  const firstType = data?.types?.[0].type.name;

  const setClassName = (mainClassName: string) => {
    const typeClass = firstType ? styles[POKEMON_TYPES[firstType]] : '';
    return isMyPage
      ? `${styles[`${mainClassName}__my`]} ${typeClass}`
      : `${styles[mainClassName]} ${typeClass}`;
  };

  const renderStatus = () => {
    const statusClassName = isMyPage ? styles.status__my : styles.status;
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
    <div
      className={setClassName('wrapper')}
      style={{ transform: isOpen ? 'scale(2.33)' : undefined }}
    >
      <div className={setClassName('pokemon_number')}>{`No.${data?.id}`}</div>
      <div className={styles.white_block}>
        <div className={setClassName('container')}>
          <div className={styles.container__top}>
            <div
              className={
                isMyPage
                  ? `${styles.type_containter__my}`
                  : `${styles.type_containter}`
              }
            >
              {data?.types.map((pokemonType: TypesType) => (
                <Plate
                  key={pokemonType.type.name}
                  pokemonTypeProp={POKEMON_TYPES[pokemonType.type.name]}
                />
              ))}
            </div>
            <img
              className={
                isMyPage
                  ? `${styles.pokemon_image__my}`
                  : `${styles.pokemon_image}`
              }
              src={data.sprites}
              alt="포켓몬 이미지"
            />
            <div className={styles.pokemon_intro}>
              <div
                className={
                  isMyPage
                    ? `${styles.pokemon_name__my}`
                    : `${styles.pokemon_name}`
                }
              >
                <span
                  className={
                    isMyPage
                      ? `${styles.text__small__my}`
                      : `${styles.text__small}`
                  }
                >
                  {pokemonNickName1 || pokemonNickName?.pokemonNickName1}
                </span>
                <span
                  className={
                    isMyPage
                      ? `${styles.text__small__my}`
                      : `${styles.text__small}`
                  }
                >
                  {pokemonNickName2 || pokemonNickName?.pokemonNickName2}
                </span>
              </div>
              <span
                className={
                  isMyPage
                    ? `${styles.text__large__my}`
                    : `${styles.text__large}`
                }
              >
                {pokemonName}
              </span>
            </div>
          </div>
          <div
            className={
              isMyPage
                ? `${styles.container__my__bottom}`
                : `${styles.container__bottom}`
            }
          >
            {renderStatus()}
            <div>
              <img
                className={isMyPage ? `${styles.logo__my}` : `${styles.logo}`}
                src="/src/assets/logo-pokehub.png"
                alt="PoketHub"
              />
              <div className={styles.total_stat}>
                <span
                  className={
                    isMyPage
                      ? `${styles.text__small__my}`
                      : `${styles.text__small}`
                  }
                >
                  Total
                </span>
                <span
                  className={
                    isMyPage
                      ? `${styles.text__large__my}`
                      : `${styles.text__large}`
                  }
                >
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

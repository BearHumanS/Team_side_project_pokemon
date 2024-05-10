import Image from 'next/image';
import { POKEMON_NAME } from '@/lib/pokemonName';
import styles from './Detail.module.scss';
import { FORM_NAMES } from '@/lib/pokemonFormNames';
import { POKEMON_TYPES } from '@/lib/constants';
import DetailImgSkeleton from '../skeleton/DetailImgSkeleton';
import TypeSkeleton from '../skeleton/TypeSkeleton';
import { PokemonInfoExtendsProps } from './PokemonInfo';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';
import LikePokemon from './LikePokemon';

const PokemonImg = ({ pokemonState, isLoading }: PokemonInfoExtendsProps) => {
  const { pokemon, selectedFormName } = pokemonState;
  const pokemonId = pokemon?.id;

  const windowWidth = useCalculateInnerWidth();

  const pokemonOfficialImage =
    pokemon?.sprites.other?.['official-artwork'].front_default;

  const getLocalImagePath = (name: string | undefined) => {
    if (!name) {
      return;
    }
    return `/pokemonImg/${name}.webp`;
  };

  const getKoreanName = (englishName: string | undefined) => {
    return Object.keys(POKEMON_NAME).find(
      (key) => POKEMON_NAME[key] === englishName,
    );
  };

  const getKoreanFormName = (englishName: string | undefined) => {
    return FORM_NAMES[englishName as string];
  };

  const koreanName =
    selectedFormName
      ?.replace('-거다이맥스', '')
      .replace('-무한다이맥스', '')
      .replace('-팔데아', '')
      .replace('-가라르', '')
      .replace('-히스이', '')
      .replace('-알로라', '') ||
    getKoreanName(pokemon?.name) ||
    getKoreanFormName(pokemon?.name);

  const formNameMatch = selectedFormName?.match(
    /-(거다이맥스|무한다이맥스|팔데아|가라르|히스이|알로라)/,
  );
  const someFormName = formNameMatch ? formNameMatch[1] : '';

  return (
    <>
      <div className={styles.detail__center}>
        <div className={styles.detail__nameBox}>
          <div
            className={`${styles.detail__name} ${
              koreanName?.length > 5 ? styles.longName : styles.shortName
            }`}
          >
            {koreanName}
          </div>
        </div>

        <div className={styles.detail__some__form}>{someFormName}</div>
        <div className={styles.detail__img__box}>
          {isLoading ? (
            <DetailImgSkeleton />
          ) : (
            <>
              <Image
                className={styles.official__img}
                src={
                  pokemonOfficialImage
                    ? pokemonOfficialImage
                    : getLocalImagePath(selectedFormName || koreanName) || ''
                }
                alt="Official Artwork"
                width={280}
                height={280}
                priority
              />
            </>
          )}
        </div>
        <div className={styles.detail__type}>
          {isLoading ? (
            <TypeSkeleton />
          ) : (
            <>
              {pokemon?.types.map((typeInfo, index) => {
                const koreanPokemonName = POKEMON_TYPES[typeInfo.type.name];

                return (
                  <div
                    key={index}
                    className={`${styles.detail__plate} ${styles[koreanPokemonName]}`}
                  >
                    <Image
                      src={`/icons/${koreanPokemonName}_on.svg`}
                      alt={`${koreanPokemonName}타입 아이콘`}
                      width={20}
                      height={20}
                    />
                    <div className={styles.plate__name}>
                      {koreanPokemonName}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      {windowWidth <= 768 && (
        <>
          <div className={styles.mobile__detail__container__top}>
            <div className={styles.mobile__detail__nameBox}>
              <div
                className={`${styles.mobile__detail__name} ${
                  koreanName?.length > 5 ? styles.longName : styles.shortName
                }`}
              >
                {koreanName}
              </div>
            </div>
            <div>
              {isLoading ? (
                <DetailImgSkeleton />
              ) : (
                <div className={styles.mobile__official__img}>
                  <Image
                    className={styles.mobile__official__img}
                    src={
                      pokemonOfficialImage
                        ? pokemonOfficialImage
                        : getLocalImagePath(selectedFormName || koreanName) ||
                          ''
                    }
                    alt="Official Artwork"
                    width={204}
                    height={204}
                  />
                </div>
              )}
            </div>
            <LikePokemon pokemonId={pokemonId || ''} isLoading={isLoading} />
          </div>
        </>
      )}
    </>
  );
};

export default PokemonImg;

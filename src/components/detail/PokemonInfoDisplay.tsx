import { useMemo } from 'react';
import InfoSkeleton from '../skeleton/InfoSkeleton';
import { FORM_NAMES } from '@/lib/pokemonFormNames';
import { POKEMON_NAME } from '@/lib/pokemonName';
import styles from './Detail.module.scss';
import { POKEMON_GENUS } from '@/lib/genus';
import { ABILITY_NAMES } from '@/lib/abilityNames';
import { POKEMON_FLAVOR_TEXTS } from '@/lib/flavorText';
import { PokemonInfoExtendsProps } from './PokemonInfo';

const PokemonInfoDisplay = ({
  pokemonState,
  isLoading,
  onFormChange,
}: PokemonInfoExtendsProps) => {
  const { pokemon, selectedFormId, genus, flavorText } = pokemonState;

  const pokemonHeight = useMemo(() => {
    if (pokemon) {
      const feet = Math.floor((pokemon.height * 10) / 2.54 / 12);
      const inches = Math.round(((pokemon.height * 10) / 2.54) % 12);
      return `${(pokemon.height * 0.1).toFixed(1)}m (${feet}"${inches}')`;
    }
    return null;
  }, [pokemon]);

  const pokemonWeight = useMemo(() => {
    if (pokemon) {
      const weightKg = (pokemon.weight * 0.1).toFixed(1);
      const weightLbs = (pokemon.weight * 0.1 * 2.20462).toFixed(1);
      return `${weightKg}kg (${weightLbs}lb)`;
    }
    return null;
  }, [pokemon]);

  const formsData = useMemo(() => {
    const baseName = pokemon?.name.split('-')[0];
    return pokemon?.name
      ? [pokemon.name].concat(
          Object.keys(FORM_NAMES).reduce<string[]>((acc, key) => {
            if (key.startsWith(baseName as string) && key !== pokemon.name) {
              return acc.concat(key);
            }
            return acc;
          }, []),
        )
      : [];
  }, [pokemon]);

  const getKoreanFormName = (englishName: string | undefined) => {
    let koreanName: string | undefined = FORM_NAMES[englishName as string];

    if (!koreanName) {
      koreanName = Object.keys(POKEMON_NAME).find(
        (key) => POKEMON_NAME[key] === englishName,
      );
    }

    return koreanName;
  };

  return (
    <>
      <div className={styles.pokemon__info}>
        <div className={`${styles.pokemon__info__title} ${styles.id}`}>
          ID :&nbsp;
        </div>
        <div className={styles.pokemon__info__data}>
          {isLoading ? <InfoSkeleton /> : <>#{pokemon?.id}</>}
        </div>
      </div>
      <div className={styles.pokemon__info}>
        <div className={styles.pokemon__info__title}>분류 :&nbsp;</div>
        <div className={styles.pokemon__info__data}>
          {isLoading ? (
            <InfoSkeleton />
          ) : (
            <>{(selectedFormId && POKEMON_GENUS[selectedFormId]) || genus}</>
          )}
        </div>
      </div>
      <div className={styles.pokemon__info}>
        <div className={styles.pokemon__info__title}>신장 :&nbsp;</div>
        <div className={styles.pokemon__info__data}>
          {isLoading ? <InfoSkeleton /> : <>{pokemonHeight}</>}
        </div>
      </div>
      <div className={styles.pokemon__info}>
        <div className={styles.pokemon__info__title}>무게 :&nbsp;</div>
        <div className={styles.pokemon__info__data}>
          {isLoading ? <InfoSkeleton /> : <>{pokemonWeight}</>}
        </div>
      </div>
      <div className={styles.pokemon__info}>
        <div className={styles.pokemon__info__title}>특성 :&nbsp;</div>
        <div className={styles.pokemon__info__data}>
          {isLoading ? (
            <InfoSkeleton />
          ) : (
            <>
              {pokemon?.abilities.map((abilityInfo, index) => (
                <div
                  key={index}
                  className={`${styles.detail__plate} ${
                    styles[ABILITY_NAMES[abilityInfo.ability.name]]
                  }`}
                >
                  {ABILITY_NAMES[abilityInfo.ability.name]}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className={styles.pokemon__info}>
        <div className={styles.pokemon__info__title}>설명 :&nbsp;</div>
        <div className={styles.pokemon__info__data}>
          {isLoading ? (
            <InfoSkeleton />
          ) : (
            <>
              {(selectedFormId && POKEMON_FLAVOR_TEXTS[selectedFormId]) ||
                (pokemon && POKEMON_FLAVOR_TEXTS[pokemon?.id]) ||
                flavorText}
            </>
          )}
        </div>
      </div>
      <div className={styles.pokemon__info}>
        <div className={`${styles.pokemon__info__title} ${styles.title}`}>
          폼 :&nbsp;
        </div>
        <div className={styles.pokemon__info__data}>
          {isLoading ? (
            <InfoSkeleton />
          ) : (
            <>
              {formsData.map((form, index) => (
                <div
                  key={index}
                  onClick={() => onFormChange?.(form)}
                  className={styles.pokemon__info__form}
                >
                  {getKoreanFormName(form)}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PokemonInfoDisplay;

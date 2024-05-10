import Image from 'next/image';
import styles from './Detail.module.scss';
import LikePokemon from './LikePokemon';
import { PokemonInfoExtendsProps } from './PokemonInfo';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';
import StatusDisplay from './StatusDisplay';

const Status = ({ pokemonState, isLoading }: PokemonInfoExtendsProps) => {
  const { pokemon } = pokemonState;
  const windowWidth = useCalculateInnerWidth();

  const pokemonId = pokemon?.id;

  return (
    <>
      <div className={styles.stats__main}>
        <LikePokemon pokemonId={pokemonId || ''} isLoading={isLoading} />
        <div className={styles.stats__container}>
          <div className={styles.stats}>
            <div className={styles.stats__top}>
              <span>스탯</span>
            </div>
            <Image src="/Rectangle 47.png" alt="" width={13} height={425} />
            <StatusDisplay pokemon={pokemon} isLoading={isLoading} />
            <div className={styles.stats__total}>
              Total:{' '}
              {pokemon?.stats.reduce(
                (acc, baseStat) => acc + baseStat.base_stat,
                0,
              )}
            </div>
          </div>
        </div>
      </div>

      {windowWidth <= 768 && (
        <>
          <div className={styles.mobile__info}>
            <div className={styles.mobile__status__container}>
              <div className={styles.mobile__info__title}>
                <span className={styles.mobile__info__title__span}>스탯</span>
                <div className={styles.mobile__info__title__left}></div>
                <div className={styles.mobile__info__title__right}></div>
              </div>
              <div className={styles.mobile__status__box}>
                <StatusDisplay pokemon={pokemon} isLoading={isLoading} />
              </div>
              <div className={styles.mobile__status__total}>
                <div>최종 스탯</div>
                <div>
                  {pokemon?.stats.reduce(
                    (acc, baseStat) => acc + baseStat.base_stat,
                    0,
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Status;

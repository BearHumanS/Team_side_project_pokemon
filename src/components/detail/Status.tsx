import styles from './Detail.module.scss';
import LikePokemon from './LikePokemon';
import { PokemonInfoExtendsProps } from './PokemonInfo';
import StatsSkeleton from '../skeleton/StatsSkeleton';
import StatusBar from './StatusBar';

const Status = ({ pokemonState, isLoading }: PokemonInfoExtendsProps) => {
  const { pokemon } = pokemonState;

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
            <img src="/Rectangle 47.png" alt="" width={13} height={425} />
            <div>
              <div className={`${styles.status}`}>
                <span>체력</span>
                {isLoading ? (
                  <StatsSkeleton />
                ) : (
                  <>
                    {pokemon ? (
                      <StatusBar
                        baseStat={pokemon?.stats[0]}
                        pokemonTypes={pokemon?.types}
                      />
                    ) : null}
                  </>
                )}
              </div>
              <div className={`${styles.status}`}>
                <span>특수공격</span>
                {isLoading ? (
                  <StatsSkeleton />
                ) : (
                  <>
                    {pokemon ? (
                      <StatusBar
                        baseStat={pokemon?.stats[3]}
                        pokemonTypes={pokemon?.types}
                      />
                    ) : null}
                  </>
                )}
              </div>
            </div>
            <div>
              <div className={`${styles.status}`}>
                <span>공격</span>
                {isLoading ? (
                  <StatsSkeleton />
                ) : (
                  <>
                    {pokemon ? (
                      <StatusBar
                        baseStat={pokemon?.stats[1]}
                        pokemonTypes={pokemon?.types}
                      />
                    ) : null}
                  </>
                )}
              </div>
              <div className={`${styles.status}`}>
                <span>특수방어</span>
                {isLoading ? (
                  <StatsSkeleton />
                ) : (
                  <>
                    {pokemon ? (
                      <StatusBar
                        baseStat={pokemon?.stats[4]}
                        pokemonTypes={pokemon?.types}
                      />
                    ) : null}
                  </>
                )}
              </div>
            </div>
            <div>
              <div className={`${styles.status}`}>
                <span>방어</span>
                {isLoading ? (
                  <StatsSkeleton />
                ) : (
                  <>
                    {pokemon ? (
                      <StatusBar
                        baseStat={pokemon?.stats[2]}
                        pokemonTypes={pokemon?.types}
                      />
                    ) : null}
                  </>
                )}
              </div>
              <div className={`${styles.status}`}>
                <span>스피드</span>
                {isLoading ? (
                  <StatsSkeleton />
                ) : (
                  <>
                    {pokemon ? (
                      <StatusBar
                        baseStat={pokemon?.stats[5]}
                        pokemonTypes={pokemon?.types}
                      />
                    ) : null}
                  </>
                )}
              </div>
            </div>

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
    </>
  );
};

export default Status;

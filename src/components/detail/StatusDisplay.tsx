import styles from './Detail.module.scss';
import StatsSkeleton from '../skeleton/StatsSkeleton';
import StatusBar from './StatusBar';
import { PokemonType } from '@/lib/type';

interface StatusDisplayProps {
  pokemon: PokemonType | null | undefined;
  isLoading: boolean;
}

const StatusDisplay = ({ pokemon, isLoading }: StatusDisplayProps) => {
  return (
    <>
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
    </>
  );
};

export default StatusDisplay;

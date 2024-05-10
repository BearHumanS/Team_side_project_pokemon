import Image from 'next/image';
import { PokemonInfoProps } from '@/lib/type';
import styles from './Detail.module.scss';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';
import PokemonInfoDisplay from './PokemonInfoDisplay';

export interface PokemonInfoExtendsProps extends PokemonInfoProps {
  isLoading: boolean;
}

const PokemonInfo = ({
  pokemonState,
  onFormChange,
  isLoading,
}: PokemonInfoExtendsProps) => {
  const windowWidth = useCalculateInnerWidth();

  return (
    <>
      <div className={styles.pokemon__info__Box}>
        <div className={styles.pokemon__info__container}>
          <div className={styles.pokemon__info__top}>
            <span>정보</span>
          </div>
          <Image src="/Rectangle 47.png" alt="" width={13} height={425} />
          <PokemonInfoDisplay
            pokemonState={pokemonState}
            onFormChange={onFormChange}
            isLoading={isLoading}
          />
        </div>
      </div>

      {windowWidth <= 768 && (
        <>
          <div className={styles.mobile__info}>
            <div className={styles.mobile__info__box}>
              <div className={styles.mobile__info__title}>
                <span className={styles.mobile__info__title__span}>정보</span>
                <div className={styles.mobile__info__title__left}></div>
                <div className={styles.mobile__info__title__right}></div>
              </div>
              <div className={styles.mobile__info__contents}>
                <PokemonInfoDisplay
                  pokemonState={pokemonState}
                  onFormChange={onFormChange}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PokemonInfo;

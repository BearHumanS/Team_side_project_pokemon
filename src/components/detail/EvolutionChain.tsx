import { PokemonType } from '@/lib/type';
import PokemonDexElementLayout from '../dex/PokemonDexElementLayout';
import styles from './Detail.module.scss';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { reverseObject } from '@/lib/util/reverseObject';
import { useEffect, useState } from 'react';
import { getPokemonData } from '@/lib/poketApi';
import { useRouter } from 'next/navigation';
import { PokemonInfoExtendsProps } from './PokemonInfo';
import EvolutionImgSkeleton from '../skeleton/EvolutionImgSkeleton';
import Image from 'next/image';

const EvolutionChain = ({
  pokemonState,
  isLoading,
}: PokemonInfoExtendsProps) => {
  const { evolvesChain } = pokemonState;

  const [evovlutionPokemonData, setEvolutionPokemonData] = useState<
    PokemonType[]
  >([]);

  const router = useRouter();

  const fetchData = async (evolvesChain: string[][]) => {
    const evolvesChainFlat =
      evolvesChain.length > 1
        ? [...new Set(evolvesChain.flat())]
        : evolvesChain.flat();

    const evolutionChainData = evolvesChainFlat?.map((partialName) => {
      const englishName = Object.values(POKEMON_NAME).find((name) =>
        name.includes(partialName),
      );
      return englishName && getPokemonData(englishName);
    });

    try {
      const data = await Promise.all(evolutionChainData);

      setEvolutionPokemonData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!evolvesChain || evolvesChain.length === 0) return;

    fetchData(evolvesChain);
  }, [evolvesChain]);

  if (!evolvesChain) {
    return null;
  }

  const preEvolutionPokemon = evovlutionPokemonData[0];

  const finalEvolutionPokemons = evovlutionPokemonData.slice(1);

  const allEvolutions = new Set(evolvesChain.flat());

  const commonEvolution = Array.from(allEvolutions).filter((pokemonName) =>
    evolvesChain.every((path) => path.includes(pokemonName)),
  );

  const commonEvolutionPokemonData = evovlutionPokemonData.filter((pokemon) =>
    commonEvolution.includes(pokemon.name),
  );

  const otherFinalEvolution = evolvesChain.map((path) =>
    path.filter((pokemon) => !commonEvolution.includes(pokemon)),
  );

  const otherFinalEvolutionPokemonData = evovlutionPokemonData.filter(
    (pokemon) =>
      otherFinalEvolution.some((path) => path.includes(pokemon.name)),
  );

  return (
    <>
      <div className={styles.evolves}>
        <div className={styles.evolves__container}>
          <div className={styles.evolves__title}>
            <div className={styles.evolves__title__box}>
              <div className={styles.evolves__title__text}>진화</div>
            </div>
          </div>
          <div className={styles.evolves__img__box}>
            {isLoading ? (
              <EvolutionImgSkeleton />
            ) : (
              <>
                {evolvesChain.length > 1 && commonEvolution.length < 2 ? (
                  <>
                    <div className={styles.evolves}>
                      {preEvolutionPokemon && (
                        <>
                          <div className={styles.evolves__pre__evolution}>
                            <PokemonDexElementLayout
                              data={preEvolutionPokemon}
                              className={styles.evolves__list}
                              onClick={() =>
                                router.push(
                                  `/pokemon/${preEvolutionPokemon.id}`,
                                )
                              }
                            >
                              <Image
                                src={
                                  preEvolutionPokemon.sprites?.other?.[
                                    'official-artwork'
                                  ].front_default as string
                                }
                                alt={`${preEvolutionPokemon.name} 포켓몬 이미지`}
                                width={141}
                                height={141}
                              />
                            </PokemonDexElementLayout>
                            <div
                              className={styles.evolves__pre__evolution__name}
                            >
                              {
                                reverseObject(POKEMON_NAME)[
                                  preEvolutionPokemon.name
                                ]
                              }
                            </div>
                            <Image
                              className={styles.evolves__pre__evolution__arrow}
                              src="/arrow.svg"
                              alt="우측 화살표"
                              width={24}
                              height={38}
                            />
                          </div>
                        </>
                      )}
                      <div className={styles.evolves__final__evolution}>
                        {finalEvolutionPokemons.map((pokemonData) => (
                          <div
                            className={styles.evolves__final__evolution__box}
                            key={pokemonData.name}
                          >
                            <PokemonDexElementLayout
                              data={pokemonData}
                              className={styles.evolves__list}
                              onClick={() =>
                                router.push(`/pokemon/${pokemonData.id}`)
                              }
                            >
                              <Image
                                src={
                                  pokemonData.sprites?.other?.[
                                    'official-artwork'
                                  ].front_default as string
                                }
                                alt={`${pokemonData.name} 포켓몬 이미지`}
                                width={141}
                                height={141}
                              />
                            </PokemonDexElementLayout>
                            <div
                              className={styles.evolves__final__evolution__name}
                            >
                              {reverseObject(POKEMON_NAME)[pokemonData.name]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : evolvesChain.length > 1 &&
                  commonEvolution.length > 1 &&
                  otherFinalEvolution ? (
                  <>
                    <div className={styles.evolves__extra__box}>
                      {commonEvolutionPokemonData?.map((pokemonData, index) => {
                        return (
                          <div
                            key={pokemonData.name}
                            className={styles.evolves__common__evolution}
                          >
                            <PokemonDexElementLayout
                              data={pokemonData}
                              className={styles.evolves__list}
                              onClick={() =>
                                router.push(`/pokemon/${pokemonData.id}`)
                              }
                            >
                              <Image
                                src={
                                  pokemonData.sprites?.other?.[
                                    'official-artwork'
                                  ].front_default as string
                                }
                                alt={`${pokemonData.name} 포켓몬 이미지`}
                                width={141}
                                height={141}
                              />
                            </PokemonDexElementLayout>
                            <div
                              className={styles.evolves__pre__evolution__name}
                            >
                              {reverseObject(POKEMON_NAME)[pokemonData.name]}
                            </div>
                            {index < evovlutionPokemonData.length - 1 && (
                              <Image
                                className={
                                  styles.evolves__pre__evolution__arrow
                                }
                                src="/arrow.svg"
                                alt="우측 화살표"
                                width={24}
                                height={38}
                              />
                            )}
                          </div>
                        );
                      })}

                      <div className={styles.evolves__other__evolution}>
                        {otherFinalEvolutionPokemonData?.map((pokemonData) => {
                          return (
                            <div
                              key={pokemonData.name}
                              className={styles.evolves__pre__evolution}
                            >
                              <PokemonDexElementLayout
                                data={pokemonData}
                                className={styles.evolves__list}
                                onClick={() =>
                                  router.push(`/pokemon/${pokemonData.id}`)
                                }
                              >
                                <Image
                                  src={
                                    pokemonData.sprites?.other?.[
                                      'official-artwork'
                                    ].front_default as string
                                  }
                                  alt={`${pokemonData.name} 포켓몬 이미지`}
                                  width={141}
                                  height={141}
                                />
                              </PokemonDexElementLayout>
                              <div
                                className={styles.evolves__pre__evolution__name}
                              >
                                {reverseObject(POKEMON_NAME)[pokemonData.name]}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {evovlutionPokemonData?.map((pokemonData, index) => {
                      return (
                        <div
                          key={pokemonData.name}
                          className={styles.evolves__pre__evolution__box}
                        >
                          <div className={styles.evolves__pre__evolution}>
                            <PokemonDexElementLayout
                              data={pokemonData}
                              className={styles.evolves__list}
                              onClick={() =>
                                router.push(`/pokemon/${pokemonData.id}`)
                              }
                            >
                              <Image
                                src={
                                  pokemonData.sprites?.other?.[
                                    'official-artwork'
                                  ].front_default || '/pokemonImg/그우린차.webp'
                                }
                                alt={`${pokemonData.name} 포켓몬 이미지`}
                                width={141}
                                height={141}
                              />
                            </PokemonDexElementLayout>
                            <div
                              className={styles.evolves__pre__evolution__name}
                            >
                              {reverseObject(POKEMON_NAME)[pokemonData.name]}
                            </div>
                          </div>
                          {index < evovlutionPokemonData.length - 1 && (
                            <Image
                              className={styles.arrow}
                              src="/arrow.svg"
                              alt="우측 화살표"
                              width={24}
                              height={38}
                            />
                          )}
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EvolutionChain;

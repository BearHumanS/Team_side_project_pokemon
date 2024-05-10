'use client';

import { useEffect, useState } from 'react';
import PokemonInfo from './PokemonInfo';
import Status from './Status';
import {
  getPokemonData,
  getPokemonSpecies,
  getEvolvesDatas,
} from '@/lib/poketApi';
import { PokemonState } from '@/lib/type';
import PokemonImg from './PokemonImg';
import { useParams } from 'next/navigation';
import { FORM_NAMES } from '@/lib/pokemonFormNames';
import Comments from '@/components/comment/Comments';
import styles from './Detail.module.scss';
import EvolutionChain from './EvolutionChain';
import useCalculateInnerWidth from '@/hook/useCalculateInnerWidth';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface EvolutionData {
  evolves_to: EvolutionData[];
  species: { name: string };
}

const Detail = () => {
  const [pokemonState, setPokemonState] = useState<PokemonState>({
    pokemon: null,
    baseStats: [],
    flavorText: '',
    genus: '',
    selectedFormName: '',
    selectedFormId: null,
    evolvesChain: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const windowWidth = useCalculateInnerWidth();

  const params = useParams();

  useEffect(() => {
    const evolutionChains = (
      evolutionData: EvolutionData,
      chain: string[][] = [],
      basicStage: string[] = [],
    ): string[][] => {
      if (!evolutionData) return chain;
      const newPath = [...basicStage, evolutionData.species.name];
      if (evolutionData.evolves_to.length === 0) {
        chain.push(newPath);
      } else {
        evolutionData.evolves_to.forEach((evolution) => {
          evolutionChains(evolution, chain, newPath);
        });
      }
      return chain;
    };

    const fetchDataAPI = async () => {
      setIsLoading(true);
      try {
        const pokemonData = await getPokemonData(params.pokemonId);
        const speciesData = await getPokemonSpecies(pokemonData.species.url);
        const evolvesChainData = await getEvolvesDatas(
          speciesData.evolution_chain.url,
        );

        const chain = evolutionChains(evolvesChainData.chain);

        const koreanSpeciesData = speciesData.flavor_text_entries.find(
          (entry: { language: { name: string } }) =>
            entry.language.name === 'ko',
        );

        const koreanGenusData = speciesData.genera.find(
          (genus: { language: { name: string } }) =>
            genus.language.name === 'ko',
        );

        setPokemonState((prev) => ({
          ...prev,
          pokemon: pokemonData,
          baseStats: pokemonData.stats,
          flavorText: koreanSpeciesData?.flavor_text,
          genus: koreanGenusData?.genus,
          evolvesChain: chain,
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (pokemonState.pokemon?.id !== Number(params.id)) {
      fetchDataAPI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, pokemonState.pokemon?.id]);

  const onFormChange = async (formName: string) => {
    try {
      const FormChangeData = await getPokemonData(formName);

      const koreanFormName = FORM_NAMES[formName];

      setPokemonState((prev) => ({
        ...prev,
        selectedFormName: koreanFormName,
        pokemon: {
          ...FormChangeData,
          id: prev.pokemon?.id ?? FormChangeData.id,
          name: prev.pokemon?.name ?? FormChangeData.name,
          baseStats: FormChangeData.stats,
          selectedFormId: FormChangeData.id,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {windowWidth <= 768 ? (
        <>
          <div style={{ marginTop: '-30px' }}>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
            >
              <div className={styles.detail__main}>
                <SwiperSlide>
                  <PokemonImg
                    pokemonState={pokemonState}
                    isLoading={isLoading}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <PokemonInfo
                    pokemonState={pokemonState}
                    onFormChange={onFormChange}
                    isLoading={isLoading}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Status pokemonState={pokemonState} isLoading={isLoading} />
                </SwiperSlide>
              </div>
            </Swiper>
          </div>

          <EvolutionChain pokemonState={pokemonState} isLoading={isLoading} />
          <div className={styles.detail__comments}>
            <Comments pokemonState={pokemonState} />
          </div>
        </>
      ) : (
        <>
          <div className={styles.detail__main}>
            <PokemonInfo
              pokemonState={pokemonState}
              onFormChange={onFormChange}
              isLoading={isLoading}
            />
            <PokemonImg pokemonState={pokemonState} isLoading={isLoading} />
            <Status pokemonState={pokemonState} isLoading={isLoading} />
          </div>
          <EvolutionChain pokemonState={pokemonState} isLoading={isLoading} />
          <div className={styles.detail__comments}>
            <Comments pokemonState={pokemonState} />
          </div>
        </>
      )}
    </>
  );
};

export default Detail;

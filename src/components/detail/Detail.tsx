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
import { useParams } from 'react-router-dom';
import { FORM_NAMES } from '@/lib/pokemonFormNames';
import Comments from '@/components/comment/Comments';
import styles from './Detail.module.scss';
import EvolutionChain from './EvolutionChain';

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
        const pokemonData = await getPokemonData(params.id ?? '');
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

    if (pokemonState.pokemon?.id !== params.id) {
      fetchDataAPI();
    }
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
  );
};

export default Detail;

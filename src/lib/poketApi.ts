import { fetchData } from './api';
import { Pokemon, PokemonType } from './type';

export const getAllPokemonDatas = async (limit: number) => {
  return fetchData(`pokemon?limit=${limit}`, 'get');
};

export const getPokemonData = async (pokemon: number | string | string[]) => {
  return fetchData(`pokemon/${pokemon}/`, 'get');
};

export const getAllPokemonSpeciesDatas = async (limit: number) => {
  return fetchData(`pokemon-species?limit=${limit}`, 'get');
};

export const getPokemonSpeciesDatas = async (pokemon: number | string) => {
  return fetchData(`pokemon-species/${pokemon}/`, 'get');
};

export const getPokemonTypesDatas = async (type: number | string) => {
  return fetchData(`type/${type}/`, 'get');
};

export const getPokemonSpecies = async (url: string) => {
  return fetchData(`${url}`, 'get');
};

export const getAllPokemonDetails = async (limit: number) => {
  const data = await fetchData(`pokemon?limit=${limit}`, 'get');
  const pokemonDetailDatas: PokemonType[] = await Promise.all(
    data.results.map((item: Pokemon) => fetchData(item.url, 'get')),
  );
  return pokemonDetailDatas;
};

export const getEvolvesDatas = async (url: string) => {
  return fetchData(`${url}`, 'get');
};

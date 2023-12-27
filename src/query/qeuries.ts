import { getAllPokemonDetails } from '@/lib/poketApi';
import { useQuery } from 'react-query';

/* interface QueryOptions {
  [key: string]: unknown;
} */

export const useGetAllPokemon = (limit: number) => {
  return useQuery('allPokemon', () => getAllPokemonDetails(limit), {
    refetchOnWindowFocus: false,
  });
};

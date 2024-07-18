import { fetchData } from '@/lib/api';
import { getPokemonDetails } from '@/lib/poketApi';
import { Pokemon, PokemonType } from '@/lib/type';
import { UseQueryResult, useQueries, useQuery } from 'react-query';

/* interface QueryOptions {
  [key: string]: unknown;
} */

export const usePokemonQueries = (limit: number) => {
  const batchSize = 20;
  const totalBatches = Math.ceil(limit / batchSize);

  const queries = useQueries<UseQueryResult<PokemonType>[]>(
    Array.from({ length: totalBatches }, (_, batchIndex) => ({
      queryKey: ['pokemonBatch', batchIndex],
      queryFn: async () => {
        const offset = batchIndex * batchSize;
        const data = await fetchData(
          `pokemon?limit=${batchSize}&offset=${offset}`,
          'get',
        );

        return Promise.all(
          data.results.map((item: Pokemon) => getPokemonDetails(item.url)),
        );
      },
      staleTime: 1000 * 60 * 5,
    })),
  );

  return queries;
};

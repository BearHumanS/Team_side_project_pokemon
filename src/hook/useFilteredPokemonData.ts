import { POKEMON_TYPES } from '@/lib/constants';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { PokemonType, TypesType } from '@/lib/type';
import { reverseObject } from '@/lib/util/reverseObject';
import { useMemo } from 'react';
import { usePokemonQueries } from '@/query/qeuries';
import useSelectedStore from '@/store/useSelectedStore';
import useSearchInputText from '@/store/useSearchInputText';
import useFlatData from './useFlatData';
import { UseQueryResult } from 'react-query';

const useFilteredPokemonData = () => {
  const queries = usePokemonQueries(1017);
  const allData = useFlatData(queries as UseQueryResult<PokemonType>[]);
  const { selectedPlate } = useSelectedStore();
  const { inputText } = useSearchInputText();
  const reversedPokemonNameObject = reverseObject(POKEMON_NAME);

  const filteredData = useMemo(() => {
    if (!allData.length) return [];
    return allData.filter((data: PokemonType) => {
      if (inputText) {
        return reversedPokemonNameObject[data?.name]?.includes(inputText);
      }
      if (!selectedPlate.length) {
        return true;
      }
      const { types } = data;
      return selectedPlate.every((plate: string) =>
        types?.some(
          (type: TypesType) => POKEMON_TYPES[type.type.name] === plate,
        ),
      );
    });
  }, [allData, inputText, selectedPlate]);

  const isLoading = !allData.length;

  return { filteredData, isLoading };
};

export default useFilteredPokemonData;

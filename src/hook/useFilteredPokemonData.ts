import { POKEMON_TYPES } from '@/lib/constants';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { PokemonType, TypesType } from '@/lib/type';
import { reverseObject } from '@/lib/util/reverseObject';
import { useMemo } from 'react';
import { useGetAllPokemon } from '@/query/qeuries';
import useSelectedStore from '@/store/useSelectedStore';
import useSearchInputText from '@/store/useSearchInputText';

const useFilteredPokemonData = () => {
  const { data: allPokemonData } = useGetAllPokemon(1017);
  const { selectedPlate } = useSelectedStore();
  const { inputText } = useSearchInputText();
  const reversedPokemonNameObject = reverseObject(POKEMON_NAME);

  return useMemo(() => {
    if (!allPokemonData) return [];

    return allPokemonData.filter((data: PokemonType) => {
      if (inputText) {
        return reversedPokemonNameObject[data?.name]?.includes(inputText);
      }
      if (!selectedPlate.length) {
        return data;
      }
      const { types } = data;
      return selectedPlate.every((plate: string) =>
        types.some(
          (type: TypesType) => POKEMON_TYPES[type.type.name] === plate,
        ),
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPokemonData, inputText, selectedPlate]);
};

export default useFilteredPokemonData;

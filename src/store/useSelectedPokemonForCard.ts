// useSelectedPokemonForCard.ts

import { POKEMON_NICKNAME1, POKEMON_NICKNAME2 } from '@/lib/constants';
import { PokemonType } from '@/lib/type';
import { create } from 'zustand';

interface useSelectedPokemonForCard {
  pokemonData: PokemonType | null;
  setPokemonData: (data: PokemonType | null) => void;
  pokemonName: string | null;
  setPokemonName: (name: string) => void;
  pokemonNickName1: string | null;
  setPokemonNickName1: (nickName: string) => void;
  pokemonNickName2: string | null;
  setPokemonNickName2: (nickName: string) => void;
  generateRandomNicknames: () => void; // New function for generating random nicknames
}

const useSelectedPokemonForCard = create<useSelectedPokemonForCard>((set) => ({
  pokemonData: null,
  setPokemonData: (data) => set({ pokemonData: data }),
  pokemonName: null,
  setPokemonName: (name) => set({ pokemonName: name }),
  pokemonNickName1: null,
  setPokemonNickName1: (nickName) => set({ pokemonNickName1: nickName }),
  pokemonNickName2: null,
  setPokemonNickName2: (nickName) => set({ pokemonNickName2: nickName }),

  generateRandomNicknames: () => {
    const randomIndex1 = Math.floor(Math.random() * POKEMON_NICKNAME1.length);
    const randomIndex2 = Math.floor(Math.random() * POKEMON_NICKNAME2.length);

    set({ pokemonNickName1: POKEMON_NICKNAME1[randomIndex1] });
    set({ pokemonNickName2: POKEMON_NICKNAME2[randomIndex2] });
  },
}));

export default useSelectedPokemonForCard;

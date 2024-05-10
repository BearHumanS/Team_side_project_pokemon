import { PokemonType } from '@/lib/type';
import { create } from 'zustand';

type PokemonStore = {
  pokemonData: PokemonType[];
  setPokemonData: (pokemonData: PokemonType[]) => void;
};

const useLikedStore = create<PokemonStore>((set) => ({
  pokemonData: [],
  setPokemonData: (pokemonData) => set({ pokemonData }),
}));

export default useLikedStore;

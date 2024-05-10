import { ReactNode } from 'react';

export interface PokemonInfoProps {
  pokemonState: PokemonState;
  onFormChange?: (formName: string) => void;
}
export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export type KeyValueType = {
  [key: string]: string;
};

export type AbilitysType = {
  ability: {
    name: string;
    url: string;
  };
};

export type TypesType = {
  type: {
    name: string;
    url: string;
  };
};

export type StatsType = {
  base_stat: number;
};

export type MovesType = {
  move: {
    name: string;
    url: string;
  };
};

export type Sprites = {
  front_default: string | undefined;
  back_default: string | undefined;
  other?: {
    'official-artwork': {
      front_default: string | undefined;
    };
    home?: {
      front_default: string | undefined;
    };
  };
  animated?: {
    front_default: string | undefined;
    back_default: string | undefined;
  };
};

export type PokemonType = {
  id: number;
  height: number;
  weight: number;
  stats: Stat[];
  abilities: AbilitysType[];
  types: TypesType[];
  name: string;
  moves: MovesType[];
  sprites: Sprites;
  forms: {
    name: string;
  };
};

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonState {
  pokemon?: PokemonType | null;
  baseStats?: Stat[];
  flavorText?: string;
  genus?: string;
  selectedFormName?: string;
  selectedFormId?: number | null;
  evolvesChain?: string[][];
}

export interface PokemonSprites {
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export interface filteredPokemonData {
  id: number;
  types: TypesType[];
  stats: Stat[];
  sprites: string | undefined;
  name: string;
}

export interface childrenProps {
  children: ReactNode;
}

import { create } from 'zustand';

interface MobileNavState {
  searchOpen: boolean;
  setSearchOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  navOpen: boolean;
  setNavOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const useMobileNavStore = create<MobileNavState>((set) => ({
  searchOpen: false,
  setSearchOpen: (value) =>
    set((state) => ({
      searchOpen: typeof value === 'function' ? value(state.searchOpen) : value,
    })),
  navOpen: false,
  setNavOpen: (value) =>
    set((state) => ({
      navOpen: typeof value === 'function' ? value(state.navOpen) : value,
    })),
}));

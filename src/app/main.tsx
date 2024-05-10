'use client';
import PokemonDex from '@/components/dex/PokemonDex';
import dynamic from 'next/dynamic';

const FilterPlates = dynamic(() => import('@/components/plate/FilterPlates'), {
  ssr: false,
});

const Dex = () => {
  return (
    <section style={{ marginTop: 0 }}>
      <FilterPlates />
      <PokemonDex />
    </section>
  );
};

export default Dex;

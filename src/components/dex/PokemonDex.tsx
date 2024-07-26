'use client';

import styles from './PokemonDex.module.scss';
import PokemonDexElement from './PokemonDexElement';
import Inner from '../Inner';
import useFilteredPokemonData from '@/hook/useFilteredPokemonData';
import useVisibleDataByScroll from '@/hook/useVisibleDataByScroll';
import Loading from '../loading/Loading';
import { useLayoutEffect, useState } from 'react';
import useElementCount from '@/hook/useElementCount';
import useGetGridElementWidth from '@/hook/useGetGridElementWidth';

const PokemonDex = () => {
  const { filteredData, isLoading } = useFilteredPokemonData();
  const [ulWidth, setUlWidth] = useState(0);
  const itemWidth = useGetGridElementWidth(ulWidth);
  const { ulRef, elementCount } = useElementCount(itemWidth, 315, 20);

  useLayoutEffect(() => {
    if (!ulRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        if (entry.target === ulRef.current) {
          const { width } = entry.contentRect;
          setUlWidth(width);
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(ulRef.current);

    return () => {
      if (ulRef.current) {
        resizeObserver.unobserve(ulRef.current);
      }
    };
  }, [filteredData]);

  const visibleData = useVisibleDataByScroll(filteredData, elementCount.total);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Inner>
      <ul className={styles.pokemon_grid} ref={ulRef}>
        {visibleData.length
          ? visibleData?.map((data) => (
              <PokemonDexElement data={data} key={data.name} />
            ))
          : null}
      </ul>
    </Inner>
  );
};

export default PokemonDex;

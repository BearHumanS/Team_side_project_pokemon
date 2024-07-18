'use client';

import { PokemonType } from '@/lib/type';
import { useEffect, useState } from 'react';

const useVisibleDataByScroll = (
  filteredData: PokemonType[],
  itemsPerPage: number,
) => {
  const [visibleData, setVisibleData] = useState<PokemonType[]>([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    setVisibleData(filteredData.slice(0, pageNum * itemsPerPage));
  }, [filteredData, pageNum, itemsPerPage]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setPageNum((prevPageNum) => prevPageNum + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return visibleData;
};

export default useVisibleDataByScroll;

import { PokemonType } from '@/lib/type';
import { useEffect, useState } from 'react';
import { UseQueryResult } from 'react-query';

const useFlatData = (queries: UseQueryResult<PokemonType>[]) => {
  const [allData, setAllData] = useState<PokemonType[]>([]);

  useEffect(() => {
    const newData = queries.flatMap((query) => query.data || []);
    if (newData.length !== allData.length) {
      setAllData(newData);
    }
  }, [queries]);

  return allData;
};

export default useFlatData;

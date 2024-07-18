import { useState, useEffect } from 'react';

const useGetGridElementWidth = (gridWidth: number) => {
  const [elementWidth, setElement] = useState(0);

  useEffect(() => {
    const minElementWidth = 200;
    const gap = 20;

    const maxElements = Math.floor((gridWidth + gap) / (minElementWidth + gap));

    const totalGapWidth = (maxElements - 1) * gap;
    const remainingWidth = gridWidth - totalGapWidth;
    const elementWidth = remainingWidth / maxElements;

    setElement(elementWidth);
  }, [gridWidth]);

  return elementWidth;
};

export default useGetGridElementWidth;

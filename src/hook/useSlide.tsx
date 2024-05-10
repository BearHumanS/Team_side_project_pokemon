import { useState, useCallback } from 'react';

const useSlide = (totalItems: number, itemsPerPage: number) => {
  const [index, setIndex] = useState(0);

  const prevSlide = useCallback(() => {
    if (totalItems <= itemsPerPage) return;
    setIndex((prevIndex) => (prevIndex === 0 ? totalItems - 1 : prevIndex - 1));
  }, [totalItems, itemsPerPage]);

  const nextSlide = useCallback(() => {
    if (totalItems <= itemsPerPage) return;
    setIndex((prevIndex) => (prevIndex === totalItems - 1 ? 0 : prevIndex + 1));
  }, [totalItems, itemsPerPage]);

  return { index, prevSlide, nextSlide };
};

export default useSlide;

import { useState, useEffect, useRef } from 'react';

interface ElementCount {
  rows: number;
  columns: number;
  total: number;
}

const useElementCount = (
  elementWidth: number,
  elementHeight: number,
  gap: number,
) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const [elementCount, setElementCount] = useState<ElementCount>({
    rows: 0,
    columns: 0,
    total: 0,
  });

  useEffect(() => {
    const calculateElementCount = (entries: IntersectionObserverEntry[]) => {
      if (elementWidth) {
        for (let entry of entries) {
          if (entry.isIntersecting && entry.target === ulRef.current) {
            const ulElement = entry.target as HTMLUListElement;
            const ulWidth = ulElement.offsetWidth;
            const ulHeight = ulElement.offsetHeight;

            const columns = Math.ceil((ulWidth + gap) / (elementWidth + gap));
            const rows = Math.ceil((ulHeight + gap) / (elementHeight + gap));
            const total = columns * rows;
            setElementCount({ rows, columns, total });
          }
        }
      }
    };

    const observer = new IntersectionObserver(calculateElementCount, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (ulRef.current) {
      observer.observe(ulRef.current);
    }

    return () => {
      if (ulRef.current) {
        observer.unobserve(ulRef.current);
      }
    };
  }, [elementWidth, elementHeight, gap]);

  return { ulRef, elementCount };
};

export default useElementCount;

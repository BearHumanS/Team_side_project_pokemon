import { POKEMON_TYPES } from '@/lib/constants';
import styles from './Detail.module.scss';
import { useEffect, useState } from 'react';
import { Stat, TypesType } from '@/lib/type';
import { usePathname } from 'next/navigation';

interface StatusBarProp {
  baseStat: Stat;
  pokemonTypes: TypesType[];
}

const StatusBar = ({ baseStat, pokemonTypes }: StatusBarProp) => {
  const pathName = usePathname();
  const isMyPage = pathName.includes('mypage');
  const [percentages, setPercentages] = useState<Record<string, number>>({});

  const typeColor = pokemonTypes?.map((typeInfo) => {
    return POKEMON_TYPES[typeInfo.type.name];
  });

  useEffect(() => {
    const maxStatValue = 255;
    const targetPercentage = (baseStat.base_stat / maxStatValue) * 100;
    setPercentages((prev) => ({
      ...prev,
      [baseStat.stat.name]: targetPercentage,
    }));
  }, [baseStat]);

  return (
    <div
      className={
        isMyPage
          ? `${styles.stat__barBg__my}  ${typeColor && styles[typeColor[0]]}`
          : `${styles.stat__barBg}  ${typeColor && styles[typeColor[0]]}`
      }
    >
      <div
        className={
          isMyPage
            ? `${styles.stat__barFilled__my} ${
                typeColor && styles[typeColor[0]]
              }`
            : `${styles.stat__barFilled} ${typeColor && styles[typeColor[0]]}`
        }
        style={{
          width: `${percentages[baseStat.stat.name] || 0}%`,
          borderRadius: isMyPage ? '2px' : '4px',
        }}
      ></div>
      <span
        className={`${styles.stat__value} ${typeColor && styles[typeColor[0]]}`}
      >
        {baseStat.base_stat}
      </span>
    </div>
  );
};

export default StatusBar;

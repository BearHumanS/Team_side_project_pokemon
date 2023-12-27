import { KeyValueType } from './type';

export const POKEMON_TYPES: KeyValueType = {
  normal: '노말',
  fighting: '격투',
  flying: '비행',
  poison: '독',
  ground: '땅',
  rock: '바위',
  bug: '벌레',
  ghost: '고스트',
  steel: '강철',
  fire: '불꽃',
  water: '물',
  grass: '풀',
  electric: '전기',
  psychic: '에스퍼',
  ice: '얼음',
  dragon: '드래곤',
  dark: '악',
  fairy: '페어리',
};

export const STAT_NAME: KeyValueType = {
  hp: '체력',
  attack: '공격',
  defense: '방어',
  'special-attack': '특수공격',
  'special-defense': '특수방어',
  speed: '스피드',
};

export const POKEMON_STATS = [
  '체력',
  '공격',
  '방어',
  '특수공격',
  '특수방어',
  '스피드',
];

export const POKEMON_NICKNAME1 = ['별명1', '별명2', '별명3', '별명4'];

export const POKEMON_NICKNAME2 = ['별칭1', '별칭2', '별칭3', '별칭4'];

export const PROFILE_DEFAULT_IMG = '/src/assets/default_profile.svg';

export const STORAGE_DOWNLOAD_URL = 'https://firebasestorage.googleapis.com';

export const FORMDATE = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// export const RANDOM_STAT = {
//   HP: (
//     baseStat: number,
//     talentStat: number,
//     effortStat: number,
//     level: number,
//   ) => (2 * baseStat + talentStat + effortStat / 4 + 100) * (level / 100) + 10,
//   ATTACK: () => {},
// };

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

export const POKEMON_NICKNAME1 = [
  '외로움을 타는',
  '고집스런',
  '개구쟁이같은',
  '용감한',
  '대담한',
  '장난꾸러기같은',
  '촐랑거리는',
  '무사태평한',
  '조심스러운',
  '의젓한',
  '덜렁거리는',
  '냉정한',
  '차분한',
  '얌전한',
  '신중한',
  '건방진',
  '겁쟁이같은',
  '성급한',
  '명랑한',
  '천진난만한',
  '수줍음을 타는',
  '노력하는',
  '온순한',
  '변덕스러운',
  '성실한',
];

export const POKEMON_NICKNAME2 = [
  '기발한',
  '끈질긴',
  '현명한',
  '발랄한',
  '유순한',
  '날렵한',
  '똘똘한',
  '집요한',
  '쾌활한',
  '배려심 많은',
  '강인한',
  '자유로운',
  '헌신적인',
  '담대한',
  '다정다감한',
  '활발한',
  '귀여운',
  '유능한',
  '매력적인',
  '열정적인',
  '빠른',
  '끼있는',
  '재치있는',
  '용감무쌍한',
  '서툰',
  '느린',
  '조급한',
  '걱정많은',
  '눈치 없는',
  '혼란스러운',
  '실수 잦은',
  '쉽게 지치는',
  '소심한',
  '까다로운',
  '망설이는',
  '남의 눈치 보는',
  '보수적인',
  '투덜대는',
  '조심성 없는',
  '건망증 있는',
  '질투 잘 하는',
  '생각이 짧은',
  '참을성 없는',
  '허세 부리는',
  '불안정한',
  '고집 센',
  '무책임한',
];

export const PROFILE_DEFAULT_IMG = '/default_profile.svg';

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

export const ADMINS = [
  process.env.NEXT_PUBLIC_ADMIN_UID_1,
  process.env.NEXT_PUBLIC_ADMIN_UID_2,
  process.env.NEXT_PUBLIC_ADMIN_UID_3,
];

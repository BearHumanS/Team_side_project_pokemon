interface reverseObject {
  data?: string;
}

export const ConvertTime = (value: reverseObject) => {
  if (!value.data) return '';
  const utcDate = new Date(value.data);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Seoul', // 시간대를 서울로 설정
  };
  const formattedKoreanDate = utcDate.toLocaleDateString('ko-KR', options);
  return formattedKoreanDate;
};

export const ConvertTimes = (value: reverseObject) => {
  if (!value.data) return '';
  const utcDate = new Date(value.data);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Seoul', // 시간대를 서울로 설정
  };
  const formattedKoreanDate = utcDate.toLocaleDateString('ko-KR', options);
  return formattedKoreanDate;
};

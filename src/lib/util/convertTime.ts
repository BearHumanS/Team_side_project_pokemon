interface reverseObject {
  data: string;
}

export const ConvertTime = (value: reverseObject) => {
  const utcDate = new Date(value.data);
  const koreanDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
  const formattedKoreanDate = koreanDate.toISOString().split('T')[0];

  return formattedKoreanDate;
};

export const ConvertTimes = (value: reverseObject) => {
  const utcDate = new Date(value.data);
  const koreanDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
  const formattedKoreanDates = koreanDate
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\.\d+Z$/, '');

  return formattedKoreanDates;
};

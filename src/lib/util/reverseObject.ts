interface reverseObject {
  [key: string]: string;
}

export const reverseObject = (obj: reverseObject) => {
  const reversed: reverseObject = {};

  for (const key in obj) {
    reversed[obj[key]] = key;
  }

  return reversed;
};

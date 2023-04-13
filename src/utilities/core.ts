export const generateArrayOfSize = (size: number, defaultValue = '0') => {
  return Array.from({ length: size }, (_, i) => defaultValue);
};

export const generateArrayOfSizeBySize = (size: number, defaultValue = '0') => {
  return Array.from({ length: size }, (_, i) =>
    generateArrayOfSize(size, defaultValue)
  );
};

export const arrayHasMiddle = (array: any[]) => {
  return array.length % 2 !== 0;
};

export const getMiddleOfArrayOfArray = (array: any[]) => {
  const firstLevel = array.length / 2;
  const secondLevel = array[firstLevel].length / 2;

  return array[firstLevel][secondLevel];
};

export const getIndexOfMiddleOfArrayOrArray = (array: any[]) => {
  const firstLevel = Math.ceil(array.length / 2) - 1;
  const secondLevel = Math.ceil(array[firstLevel].length / 2) - 1;

  return [firstLevel, secondLevel];
};

export const changeValuesOfArray = (array: any[], indexes: any[], value: any) => {
  array[indexes[0]][indexes[1]] = value;

  return array;
}

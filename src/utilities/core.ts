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

export const changeValuesOfArray = (
  array: any[],
  indexes: any[],
  value: any
) => {
  array[indexes[0]][indexes[1]] = value;

  return array;
};

export const colors = [
  'bg-red-600',
  'bg-orange-500',
  'bg-amber-300',
  'bg-lime-800',
  'bg-green-400',
  'bg-teal-300',
  'bg-cyan-950',
  'bg-sky-400',
  'bg-indigo-500',
  'bg-purple-600',
  'bg-rose-600',
];

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const generateRandomColorForCell = (
  colorsBag: string[],
  colorBag: string[],
  winnerColor: string,
  colorBagLimit: number | null = null
): string | null => {
  const colorLimit = colorBagLimit ? colorBagLimit - 1 : colors.length - 1;
  let randomColor = colors[random(0, colorLimit)];
  const isWinnerColorTwoTimes =
    colorBag.filter((color) => color === winnerColor).length === 2;

  if (colorBag.length === colorBagLimit) {
    return null;
  }

  if (!isWinnerColorTwoTimes && randomColor === winnerColor) {
    return winnerColor;
  }

  if (colorBag.includes(randomColor)) {
    return generateRandomColorForCell(
      colorsBag,
      colorBag,
      winnerColor,
      colorBagLimit
    );
  }

  return randomColor;
};

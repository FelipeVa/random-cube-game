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
  'bg-yellow-800',
  'bg-amber-600',
  'bg-lime-500',
  'bg-green-800',
  'bg-emerald-400',
  'bg-teal-600',
  'bg-cyan-900',
  'bg-sky-500',
  'bg-indigo-600',
  'bg-violet-200',
  'bg-purple-600',
  'bg-pink-600',
];

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const generateRandomColorForCell = (
  colorBag: string[],
  winnerColor: string
): string | null => {
  let randomColor = colors[random(0, 7)];
  const winnerColors = [winnerColor];
  const isWinnerColorTwoTimes =
    colorBag.filter((color) => color === winnerColor).length === 2;

  if (colorBag.length === 8) {
    return null;
  }

  if (!isWinnerColorTwoTimes && randomColor === winnerColor) {
    winnerColors.push(winnerColor);

    return winnerColor;
  }

  if (colorBag.includes(randomColor)) {
    return generateRandomColorForCell(colorBag, winnerColor);
  }

  return randomColor;
};

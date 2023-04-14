import { useEffect, useRef, useState } from 'react';
import {
  colors,
  generateArrayOfSizeBySize,
  generateRandomColorForCell,
  getIndexOfMiddleOfArrayOrArray,
  random,
} from '@/utilities/core';
import { Button } from '@/components/ui/Button';
import { GameBox } from '@/components/GameBox';
import { LostGameResume } from '@/components/LostGameResume';
import { GameContainer } from '@/components/GameContainer';
import { GameInformation } from '@/components/GameInformation';
import { StartGame } from '@/components/StartGame';

function App() {
  const [gameSize, setGameSize] = useState(7);
  const [started, setStarted] = useState(false);
  const [winnerColor, setWinnerColor] = useState<string | null>(null);
  const [gameCell, setGameCell] = useState(
    generateArrayOfSizeBySize(gameSize, '0')
  );
  const [centerX, centerY] = getIndexOfMiddleOfArrayOrArray(gameCell);
  const [win, setWin] = useState(false);
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [gameTimeout, setGameGameTimeout] = useState(3000);
  const interval = useRef<null | NodeJS.Timer>(null);
  const [generableColorLimit, setGenerableColorLimit] = useState(3);
  const flattenGameCell = gameCell.flatMap((group) => group.flat());
  const canWin =
    flattenGameCell.filter((cell) => cell === winnerColor).length === 2;

  const generateCellColors = (
    availableColors: string[],
    numberOfColors: number,
    winnerColor: string
  ) => {
    const colorBag: string[] = [];

    const coloredCells = gameCell.map((groupCell, indexGroup) =>
      groupCell.map((cell, indexCell) => {
        if (centerX === indexGroup && centerY === indexCell) {
          return cell;
        }

        if (centerX === indexGroup || centerY === indexCell) {
          const randomColor = generateRandomColorForCell(
            availableColors,
            colorBag,
            winnerColor,
            numberOfColors
          );

          if (randomColor) {
            colorBag.push(randomColor);
          }

          return randomColor ? randomColor : cell;
        }

        return cell;
      })
    );

    setGameCell(coloredCells);
  };

  useEffect(() => {
    if (started && lives !== 0) {
      interval.current = setInterval(() => {
        if (canWin && !win) {
          onLose();
        }

        onGenerate(generableColorLimit);
      }, gameTimeout);
    }

    return () =>
      interval.current ? clearInterval(interval.current) : undefined;
  }, [started, lives, gameTimeout, canWin, win, generableColorLimit]);

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.code === 'Space') {
        if (started && lives === 0) {
          onRestart();
          return;
        }

        if (started) {
          onPick();
          return;
        }

        onStart();
      }
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [started, lives, gameTimeout, canWin, win, generableColorLimit]);

  const onGenerate = (numberOfColors: number) => {
    const colorsBag = colors.slice(0, numberOfColors);
    const randomWinnerColor = colorsBag[random(0, numberOfColors)];

    if (win) {
      setWin(false);
    }

    setWinnerColor(randomWinnerColor);
    generateCellColors(colorsBag, numberOfColors, randomWinnerColor);
  };

  const onWin = () => {
    setWin(true);
    setPoints((points) => points + 1);

    if (gameTimeout !== 1000) {
      setGameGameTimeout((timeout) => timeout - 200);
    }

    if (gameTimeout === 1000) {
      setGameGameTimeout((timeout) => timeout - 150);
    }

    if (generableColorLimit <= gameCell.length + 3) {
      setGenerableColorLimit(generableColorLimit + 1);
    }

    onGenerate(generableColorLimit + 1);
  };

  const onLose = () => {
    onGenerate(generableColorLimit);
    setGameGameTimeout((timeout) => timeout + 250);
    setLives((lives) => lives - 1);
  };

  const onPick = () => {
    if (!canWin) {
      return onLose();
    }

    onWin();
  };

  const onRestart = () => {
    setGameGameTimeout(3000);
    setLives(3);
    setPoints(0);
    setGenerableColorLimit(3);
    onGenerate(3);
    setGameCell(generateArrayOfSizeBySize(gameSize, '0'));
  };

  const onStart = () => {
    setStarted(true);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center dark:bg-slate-950">
      <div className="flex flex-col gap-2">
        <div className="dark:text-slate-400">
          {started && lives > 0 ? (
            <GameInformation lives={lives} points={points} />
          ) : null}
        </div>
        <GameContainer size={gameCell.length}>
          {!started ? <StartGame onStart={onStart} /> : null}
          {started && lives === 0 ? (
            <LostGameResume points={points} onRestart={onRestart} />
          ) : null}
          <GameBox cells={gameCell} centers={[centerX, centerY]} />
        </GameContainer>
        {lives > 0 ? (
          <Button onClick={onPick} disabled={!started}>
            Pick!
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default App;

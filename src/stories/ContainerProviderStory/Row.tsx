import { useEffect, useState } from "react";
import Item from "./Item";

const MAX_COL_LENGTH = 12;

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

type RowPropsType = { rowIndex: number };

const Row = ({ rowIndex }: RowPropsType) => {
  const [cells, setCells] = useState<number[]>([]);
  useEffect(() => {
    const newCells: number[] = [];
    while (true) {
      const currentSize = newCells.reduce((a, b) => a + b, 0);
      const newCellSize = getRandomInt(MAX_COL_LENGTH - 1) + 1;
      if (currentSize + newCellSize < MAX_COL_LENGTH) {
        newCells.push(newCellSize);
      } else {
        newCells.push(MAX_COL_LENGTH - currentSize);
        break;
      }
    }
    setCells(newCells);
  }, []);

  return (
    <>
      {cells.map((size, index) => (
        <Item id={`${rowIndex}-${index}`} size={size} />
      ))}
    </>
  )
}

export default Row;

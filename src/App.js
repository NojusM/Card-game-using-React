import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [grid, setGrid] = useState([
    [
      { value: 0, open: false, matched: false },
      { value: 5, open: false, matched: false },
      { value: 1, open: false, matched: false },
      { value: 3, open: false, matched: false },
    ],
    [
      { value: 2, open: false, matched: false },
      { value: 5, open: false, matched: false },
      { value: 2, open: false, matched: false },
      { value: 4, open: false, matched: false },
    ],
    [
      { value: 4, open: false, matched: false },
      { value: 3, open: false, matched: false },
      { value: 1, open: false, matched: false },
      { value: 0, open: false, matched: false },
    ],
  ]);
  const isPaused = useRef(false);
  const oldClick = useRef(null);

  function handleCardClicked(row, col) {
    // Open cards
    let newGrid = [...grid];
    newGrid[row][col].open = true;
    setGrid(newGrid);
    //If first opened card, save it
    if (oldClick.current === null) {
      oldClick.current = [row, col];
      return;
    }
    //If second card, check if match
    let oldRow = oldClick.current[0];
    let oldCol = oldClick.current[1];
    //If opened same card, do nothing
    if (oldRow === row && oldCol === col) {
      return;
    }
    //Match cards
    if (newGrid[oldRow][oldCol].value !== newGrid[row][col].value) {
      isPaused.current = true;
      setTimeout(() => {
        newGrid[row][col].open = false;
        newGrid[oldRow][oldCol].open = false;
        setGrid([...newGrid]);
        isPaused.current = false;
      }, 1000);
    } else {
      //Matched
      newGrid[row][col].matched = true;
      newGrid[oldRow][oldCol].matched = true;
      setGrid([...newGrid]);
      const hasWon = newGrid
        .map((row) => row.map((col) => col.matched))
        .flat()
        .every((card) => card);
      if (hasWon) {
        alert("You WON!");
      }
    }
    oldClick.current = null;
  }

  return (
    <div className="App">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((number, colIndex) => (
              <div
                key={colIndex}
                className={
                  number.matched
                    ? "card open matched"
                    : number.open
                    ? "card open"
                    : "card"
                }
                onClick={
                  isPaused.current
                    ? function () {}
                    : number.matched
                    ? function () {}
                    : () => handleCardClicked(rowIndex, colIndex)
                }
              >
                {number.value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

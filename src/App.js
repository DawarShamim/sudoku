import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [errorIndexes, setErrorIndexes] = useState([]);


  const [Sudoku_grid, setSudoku_grid] = useState([...Array(9)].map(() => Array(9).fill('')));
  const Fixed_Values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    function randomNumberInRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function Fill_grid() {
      const updatedGrid = [...Sudoku_grid];
      // for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const fillerValues = [...Fixed_Values];
          let i =0;

          while (fillerValues.length > 0) {
            console.log(fillerValues);
            let newValueIndex = randomNumberInRange(0, fillerValues.length - 1);
            let newValue = fillerValues[newValueIndex];

            updatedGrid[i][j] = newValue;
            if (check_similar(i, j, true)) {
                break; // Break the loop if a valid value is found
            }

            fillerValues.splice(newValueIndex, 1);
        }
        }
      // }
      setSudoku_grid(updatedGrid);
    };

    Fill_grid();
  }, []);



  function handleInputChange(e, colindex, rowindex) {
    const newValue = e.target.value;
    const updatedGrid = [...Sudoku_grid];

    if (/^[1-9]$/.test(newValue) || newValue === '') {
      updatedGrid[colindex][rowindex] = '';
      setSudoku_grid(updatedGrid);
      updatedGrid[colindex][rowindex] = newValue;
      // check_changes(rowindex, colindex);
      check_similar(rowindex, colindex);
      setSudoku_grid(updatedGrid);
    }
    // check_changes(rowindex, colindex);
    // setSudoku_grid(updatedGrid);
  };

  function check_similar(row_index, col_index, status = false) {
    let value = Sudoku_grid[row_index][col_index] ;
    // !== '' ? Sudoku_grid[row_index][col_index] : 0;

    for (let i = 0; i < 9; i++) {
      // checking in row
      if (Sudoku_grid[row_index][i] === value && i !== col_index) {

        console.log("found similar in row", row_index, i)
        if (status) {
          return false
        }
      }
      // checking in col
      if (Sudoku_grid[i][col_index] === value && i !== row_index) {
        console.log("found similar in column", i, col_index)
        if (status) {
          return false
        }
      }
    }

    const col_start_value = Math.floor(col_index / 3) * 3;
    const row_start_value = Math.floor(row_index / 3) * 3;

    for (let i = row_start_value; i < row_start_value + 3; i++) {
      for (let j = col_start_value; j < col_start_value + 3; j++) {
        if (Sudoku_grid[i][j] === value && i!== row_index && j!== col_index) {
          console.log("similar found in cube at", i, j);
          if (status) {
            return false
          }
        }
      }
    };
    return true;
  }


  return (
    <div className="App">
      <div className='body'>
        <div className="sudoku">
          {Array(9).fill().map((_, rowindex) => (
            <div key={rowindex} className='row-flex'>
              {Array(9).fill().map((_, colindex) => (
                <input
                  className={`sudoku-cube ${errorIndexes.includes(`${rowindex}${colindex}`) ? "sudoku-cube-invalid" : ""}`}
                  type="text"
                  key={colindex}
                  value={Sudoku_grid[rowindex][colindex]}
                  onChange={(e) => handleInputChange(e, rowindex, colindex)}
                  maxLength={1}
                  pattern="[1-9]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

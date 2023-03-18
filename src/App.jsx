import { useRef, useState } from 'react'
import './App.css'

function App() {
  const [board,setBoard] = useState(["","","","","","","","",""])
  const [winner,setWinner] = useState(null)
  const [currentPlayer,setCurrentPlayer] = useState("X")
  const [score,setScore] = useState({X:0,Y:0})
  const [isGameDraw,setIsGameDraw] = useState(false)

  const gameOver = (board) =>{
    for(let i=0;i<board.length;i+=1){
      if(board[i]=="")return false
    }
    return true
  }

   const checkWin = (board) =>{
        if(board[0] == board[1] && board[1] == board[2] && board[0]!="") return currentPlayer
        if(board[3] == board[4] && board[4] == board[5] && board[3]!="") return currentPlayer
        if(board[6] == board[7] && board[7] == board[8] && board[6]!="") return currentPlayer
        if(board[0] == board[3] && board[3] == board[6] && board[0]!="") return currentPlayer
        if(board[1] == board[4] && board[4] == board[7] && board[1]!="") return currentPlayer
        if(board[2] == board[5] && board[5] == board[8] && board[2]!="") return currentPlayer
        if(board[0] == board[4] && board[4] == board[8] && board[0]!="") return currentPlayer
        if(board[2] == board[4] && board[4] == board[6] && board[2]!="") return currentPlayer
        return null
    }


  const handleClick = (board,index) => {
    if(winner ||  isGameDraw) return
    const updatedBoard = board.map((element, idx) => {
      if (idx == index && board[index]=="") {
        return currentPlayer;
      } else {
        return element;
      }
    });
    setBoard(updatedBoard);

    const isWinner = checkWin(updatedBoard);
    const isGameOver = gameOver(updatedBoard);

    
    

    if (isWinner) {
      if (currentPlayer == "X") {
        setScore({ ...score, X: score.X + 1 });
      } else {
        setScore({ ...score, Y: score.Y + 1 });
      }
      console.log(currentPlayer, score);
      setWinner(isWinner);
      return;
    } 

    if (isGameOver) {
      setIsGameDraw(true);
      return;
    }
    
    if (currentPlayer == "X") {
      setCurrentPlayer("O");
    } else {
      setCurrentPlayer("X");
    }
    
    
  }

  const resetScore = () =>{
    setScore({X:0,Y:0})
  }


  const clearBoard = () => {
    setBoard(["","","","","","","","",""])
    setWinner(null)
    setCurrentPlayer("X")
  }
  
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center bg-slate-300">
      <div className="bg-white m-3 rounded-md flex justify-between w-40">
        <div
          className={`${
            currentPlayer == "X" ? "bg-red-500 text-white" : ""
          } p-3  text-xl text-bold`}
        >{`X : ${score.X}`}</div>
        <div
          className={`${
            currentPlayer == "O" ? "bg-blue-500 text-white" : ""
          } p-3  text-xl text-bold`}
        >{`O : ${score.Y}`}</div>
      </div>
      <div className="grid grid-rows-3  gap-4 justify-center items-center grid-flow-col">
        {board.map((currentVal, index) => (
          <div
            key={index}
            className={`bg-white h-24 w-24 rounded-md flex justify-center items-center  text-8xl font-bold drop-shadow-md ${
              currentVal == "X" ? "text-red-500" : "text-blue-500"
            }`}
            onClick={() => handleClick(board, index)}
          >
            {currentVal}
          </div>
        ))}
      </div>
      {isGameDraw && (
        <div className="m-2 p-2 px-4 text-white bg-green-500 font-2xl">
          GAME IS DRAW PLEASE CLEARBOARD
        </div>
      )}
      {winner && (
        <div className="m-2 p-2 px-4 text-white bg-green-500 font-2xl">
          {`WINNER IS ${winner} PLEASE CLEARBOARD`}
        </div>
      )}
      <div className="flex justify-center items-center">
        <div className="m-2 p-2 px-4 bg-white font-2xl" onClick={clearBoard}>
          CLEAR BOARD
        </div>
        <div className="m-2 p-2 px-4 bg-white font-2xl" onClick={resetScore}>
          RESET SCORE
        </div>
      </div>
    </div>
  );
}

export default App

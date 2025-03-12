import React, { useRef, useEffect, useState, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dice from "react-dice-roll";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import BoardImage from "../../game.logo.png";
import Particles from "react-particles";
import { loadConfettiPreset } from "tsparticles-preset-confetti";
import { Dialog, Transition } from "@headlessui/react";
import { InfoRounded } from "@mui/icons-material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import  dice_roll_sound from "../../dice_roll_sound.mp3";
import "./board.css";
const GRID_SIZE=10;
const CELL_WIDTH=60;
const CELL_HEIGHT=60;
let order = 0;
const ladderStart=[5,14,42,53,64,75];
const ladderEnd=[58,49,60,72,83,94];
const snakeStart=[38,45,51,65,91,97];
const snakeEnd=[20,7,10,54,73,61];
const Board = () => {
const customInit = (engine) => {
    loadConfettiPreset(engine);
  };
  const particlesInit={init:customInit};
  const options = {
    emitters: [
      {
        life: { duration: 500000, count: 1 },
        position: { x: 25, y: 0 },
        particles: {
          move: { direction: "top-right" },
          color: { value: ["#1E00FF", "#FF0061", "#E1FF00", "#00FF9E"] },
          rotate: { value: { min: 0, max: 360 }, direction: "random", animation: { enable: true, speed: 30 } },
          tilt: { direction: "random", enable: true, value: { min: 0, max: 360 }, animation: { enable: true, speed: 30 } },
          size: { value: 5, animation: { enable: true, startValue: "min", count: 1, speed: 16, sync: true } },
          roll: { darken: { enable: true, value: 25 }, enlighten: { enable: true, value: 25 }, enable: true, speed: { min: 5, max: 15 } },
          wobble: { distance: 30, enable: true, speed: { min: -7, max: 7 } },
          shape: { type: ["circle", "square"], options: {} },
        },
        rate:{quantity:8},
      },
    ],
    preset:"confetti",
  };
const { state } = useLocation();
const {name,players,check,items}=state;
const [turn, setTurn] = useState("Player 1's Turn");
const [win, setWin] = useState(false);
const [open, setOpen] = useState(false);
const [dialog, setDialog] = useState(false);
const cancelButtonRef = useRef(null);
const player1Color = items[0];
const player2Color = items[1];
const player3Color = items[2];
const player4Color = items[3];
const player5Color = items[4];
const navigate = useNavigate();
const [winnerText, setWinnerText] = useState("no one");
const [player1LeftPosition, setPlayer1LeftPosition] = useState("-15.8%");
const [player2LeftPosition, setPlayer2LeftPosition] = useState("-12.6%");
const [player3LeftPosition, setPlayer3LeftPosition] = useState("-9.4%");
const [player4LeftPosition, setPlayer4LeftPosition] = useState("-6.2%");
const [player5LeftPosition, setPlayer5LeftPosition] = useState("-3.7%");
const [player1BottomPosition, setPlayer1BottomPosition] = useState("-14%");
const [player2BottomPosition, setPlayer2BottomPosition] = useState("-14%");
const [player3BottomPosition, setPlayer3BottomPosition] = useState("-14%");
const [player4BottomPosition, setPlayer4BottomPosition] = useState("-14%");
const [player5BottomPosition, setPlayer5BottomPosition] = useState("-14%"); //let row=left,let col=bottom
const [texttrig,settexttrig]=useState(0);
const [playersLocations, setPlayersLocations] = useState([]);
const [botRolling, setBotRolling] = useState(false);
const [rolledText, setRolledText] = useState(null); 
const [diceValue, setDiceValue] = useState(null);
const totalPlayersRef=players;
const [botrolltrig,setbotrolltrig]=useState(false);
const convertNumberToText = (num) => {
  const words=["ONE","TWO","THREE","FOUR","FIVE","SIX"];
  return words[num-1]||num;
};
const diceRef = useRef(null);
const generateGrid=()=>{
  let grid=[];
  let num=1;
  for (let row=0;row<10;row++) 
    {
    let rowCells = [];
    if (row%2===0) 
      {
      for (let col=0;col<10;col++) 
        {
         rowCells.push(num++);
        }
    }
     else
     {
      for(let col=0;col<10;col++)
       {
         rowCells.unshift(num++);
       }
    }
    grid.push(rowCells);
  }
  return grid;
};
useEffect(()=>
  {
  let totalPlayersRef=players;
  if (check) 
  {
      totalPlayersRef+=1;
  }
  setPlayersLocations(new Array(totalPlayersRef).fill(0));
}, [check, players]);
let cnt=0;
const handleOrder=(num)=>{
    console.log(playersLocations);
    if (isbotturn(order)) {
      setBotRolling(true); 
      setRolledText(`BOT - ${num}`); 
    } else {
      setRolledText(convertNumberToText(num)); 
    }
    settexttrig(prev=>prev+1);
    if(playersLocations[order]+num===100) 
    {
        playersLocations[order]+=num
        handleBoardUpdate();
        handleGameEnd(order);
        return;
    }
    else if(playersLocations[order]+num<100)
    {
        playersLocations[order]+=num
    }
    handleBoardUpdate() 
   if(num==6)
   {
      cnt++;
       if(cnt===1 && playersLocations[order]+6>100)
       {
        order=(order+1)%playersLocations.length;
        cnt=0; 
         handleTurn(order)
         console.log("done")
         if(isbotturn(order))
         {
             setTimeout(() => {
              setbotrolltrig(true);
             },1500);
         }
         return;
       }
       else if(cnt===2 && playersLocations[order]+12>100)
       {
          playersLocations[order]-=12;
          order=(order+1)%playersLocations.length;
          cnt=0; 
            handleTurn(order)
            console.log("done")
          if(isbotturn(order))
          {
            setTimeout(() => {
           setbotrolltrig(true);
            },1500);
           }
           return;
       }
       else if(cnt===3)
       {
          playersLocations[order]-=18;
          if(playersLocations[order]<0)
            playersLocations[order]=0;
          order=(order+1)%playersLocations.length;
          cnt=0; 
           handleTurn(order)
           console.log("done")
           if(isbotturn(order))
           {
               setTimeout(() => {
                setbotrolltrig(true);
               },1500);
           }
           return;
       }
       else
       {
        handleTurn(order)
        console.log("done")
        if(isbotturn(order))
        {
            setTimeout(() => {
             setbotrolltrig(true);
            },1500);
        } 
        return;
       }
   }
   order=(order+1)%playersLocations.length;
    handleTurn(order)
    console.log("done")
    if(isbotturn(order))
    {
        setTimeout(() => {
         setbotrolltrig(true);
        },1500);
    }
}
useEffect(()=>{
  if(botrolltrig)
  {
    setTimeout(() => {
      const rol=Math.floor(Math.random()*6)+1;
      handleroll(rol);
  },100);
  }
},[botrolltrig]); 

const handleDiceRoll = () => {
  new Audio(dice_roll_sound).play();
  if (diceRef.current) {
    diceRef.current.rollDice();
  }
};

const handleroll=(value)=>{

  console.log("Dice Number is:" + value);
  setbotrolltrig(false);
  handleOrder(value);
};
const handleGameEnd=(order)=>{
  setWinnerText("🏆 Player " + (order + 1) + " 🏆");
  setWin(true);
};
const handleTurn = (order) => 
{
  setTurn("Player "+(order+1)+"'s Turn");
};
const handleSave = () => {
  setOpen(true);
  let exportData = state.name + "/" + state.check + "/" + totalPlayersRef.current + "/" + state.items + "/" + playersLocations;
  setTimeout(() => {
    download("Saved-Game.txt", exportData);
    setOpen(false);
  }, 3500);
};
const download = (filename, content) => {
  let pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  pom.setAttribute('download', filename);
  pom.click();
};

const checkLadder = (pos) => {
  let isLadder = false;
  for (let i = 0; i < ladderStart.length; i++) {
    if (ladderStart[i] === pos) {
      playersLocations[order] = ladderEnd[i];
      isLadder = true;
    }
  }
  return isLadder;
};

const checkSnake = (pos) => {
  let isSnake = false;
  for (let i = 0; i < snakeStart.length; i++) {
    if (snakeStart[i] === pos) {
      playersLocations[order] = snakeEnd[i];
      isSnake = true;
    }
  }
  return isSnake;
};
const getcellcoordinates=(cellnumber)=>{
  let grid=generateGrid();
  for(let row=0;row<GRID_SIZE;row++)
  {
     for(let col=0;col<GRID_SIZE;col++)
     {
        if(grid[row][col]===cellnumber)
        {
          return {row,col}
         }
    }
  }
  return {row:9,col:0};
};
const isbotturn=(order)=>{
  return check && order===playersLocations.length-1;
} 
const handleBoardUpdate=()=>
  {
 if(order===0)
 {
     let newpos=getcellcoordinates(playersLocations[order]);
     setPlayer1LeftPosition(`${newpos.col * CELL_WIDTH}px`);
     setPlayer1BottomPosition(`${newpos.row *CELL_HEIGHT}px`);
      let useLadder = checkLadder(playersLocations[order]);
      let useSnake = checkSnake(playersLocations[order]);
      if (useLadder) {
        const newpos=getcellcoordinates(playersLocations[order]);
        setTimeout(() => {
          setPlayer1LeftPosition(`${newpos.col*CELL_WIDTH}px`);
         setPlayer1BottomPosition(`${newpos.row*CELL_HEIGHT}px`);
        }, 600);
      }
      if(useSnake)
      {
        const newpos=getcellcoordinates(playersLocations[order]);
        setTimeout(() => {
          setPlayer1LeftPosition(`${newpos.col*CELL_WIDTH}px`);
          setPlayer1BottomPosition(`${newpos.row*CELL_HEIGHT}px`);
        }, 600);
      }
 }
  else if(order===1)
  {
      let newpos=getcellcoordinates(playersLocations[order]);
         setPlayer2LeftPosition(`${newpos.col*CELL_WIDTH}px`);
         setPlayer2BottomPosition(`${newpos.row*CELL_HEIGHT}px`);
      let useLadder = checkLadder(playersLocations[order]);
      let useSnake = checkSnake(playersLocations[order]);
      if (useLadder) {
        const newpos=getcellcoordinates(playersLocations[order]);
        setTimeout(() => {
          setPlayer2LeftPosition(`${newpos.col*CELL_WIDTH}px`);
         setPlayer2BottomPosition(`${newpos.row*CELL_HEIGHT}px`);
        }, 600);
      }
      if(useSnake)
      {
        const newpos=getcellcoordinates(playersLocations[order]);
        setTimeout(() => {
          setPlayer2LeftPosition(`${newpos.col*CELL_WIDTH}px`);
          setPlayer2BottomPosition(`${newpos.row*CELL_HEIGHT}px`);
        }, 600);
      }
  }
  else if(order===2)
  {
      let newpos=getcellcoordinates(playersLocations[order]);
      setPlayer3LeftPosition(`${newpos.col*CELL_WIDTH}px`);
      setPlayer3BottomPosition(`${newpos.row*CELL_HEIGHT}px`);
      let useLadder = checkLadder(playersLocations[order]);
      let useSnake = checkSnake(playersLocations[order]);
      if (useLadder) {
        const newpos=getcellcoordinates(playersLocations[order]);
        setTimeout(() => {
          setPlayer3LeftPosition(`${newpos.col*CELL_WIDTH}px`);
      setPlayer3BottomPosition(`${newpos.row*CELL_HEIGHT}px`);
        }, 600);
      }
      if(useSnake)
      {
        const newpos=getcellcoordinates(playersLocations[order]);
        setTimeout(() => {
          setPlayer3LeftPosition(`${newpos.col*CELL_WIDTH}px`);
      setPlayer3BottomPosition(`${newpos.row*CELL_HEIGHT}px`);
        }, 600);
      }
  }
  else if(order===3)
  {
      let newpos=getcellcoordinates(playersLocations[order]);
      setPlayer4LeftPosition(`${newpos.col*CELL_WIDTH}px`);
      setPlayer4BottomPosition(`${newpos.row*CELL_HEIGHT}px`);
      let useLadder = checkLadder(playersLocations[order]);
      let useSnake = checkSnake(playersLocations[order]);
      if (useLadder) {
        const newpos=getcellcoordinates(playersLocations[order]);
        setTimeout(() => {
          setPlayer4LeftPosition(`${newpos.col*CELL_WIDTH}px`);
          setPlayer4BottomPosition(`${newpos.row*CELL_HEIGHT}px`);
        }, 600);
      }
      if(useSnake)
      {
        const newpos=getcellcoordinates(playersLocations[order]);
        setTimeout(() => {
          setPlayer4LeftPosition(`${newpos.col*CELL_WIDTH}px`);
          setPlayer4BottomPosition(`${newpos.row*CELL_HEIGHT}px`);
        }, 600);
      }
  }
  else if(order===4)
  {
      let newpos=getcellcoordinates(playersLocations[order]);
      setPlayer5LeftPosition(`${newpos.col*CELL_WIDTH}px`);
      setPlayer5BottomPosition(`${newpos.row*CELL_HEIGHT}px`);
      let useLadder = checkLadder(playersLocations[order]);
      let useSnake = checkSnake(playersLocations[order]);
      if (useLadder) {
        const newpos=getcellcoordinates(playersLocations[order]);
        setTimeout(() => {
          setPlayer5LeftPosition(`${newpos.col*CELL_WIDTH}px`);
      setPlayer5BottomPosition(`${newpos.row*CELL_HEIGHT}px`);
        }, 600);
      }
      if(useSnake)
      {
        const newpos=getcellcoordinates(playersLocations[order]);
        setTimeout(() => {
          setPlayer5LeftPosition(`${newpos.col*CELL_WIDTH}px`);
      setPlayer5BottomPosition(`${newpos.row*CELL_HEIGHT}px`);
        }, 600);
      }
  }
};
return (
    <div className="game-board">
        <div className="board-image-container">
            <h1 className="game-name">{name}</h1>
   <div className="board-container">
  <img alt="board-image" className="board-image" src={BoardImage}/>
  <div className="grid">
    {generateGrid().map((row) =>
      row.map((cell) => (
        <div key={cell} className="cell">{cell}</div>
      ))
    )}
  </div>
  <div className="player-1" style={{ backgroundColor: player1Color, left: player1LeftPosition, bottom: player1BottomPosition }}></div>
  <div className="player-2" style={{ backgroundColor: player2Color, left: player2LeftPosition, bottom: player2BottomPosition }}></div>
  <div className="player-3" style={{ backgroundColor: player3Color, left: player3LeftPosition, bottom: player3BottomPosition }}></div>
  <div className="player-4" style={{ backgroundColor: player4Color, left: player4LeftPosition, bottom: player4BottomPosition }}></div>
  <div className="player-5" style={{ backgroundColor: player5Color, left: player5LeftPosition, bottom: player5BottomPosition }}></div>
</div>
            <div className="stats-container">
                <div className="stats">
                <h1>Game Status: {turn}</h1>
                <h2>
      <span style={{ backgroundColor: player1Color, display: 'inline-block', width: '20px', height: '20px', marginRight: '10px' }}></span>
      Player 1: <span>{playersLocations[0]}</span>
    </h2>
    <h2>
      <span style={{ backgroundColor: player2Color, display: 'inline-block', width: '20px', height: '20px', marginRight: '10px' }}></span>
      Player 2: <span>{playersLocations[1]}</span>
    </h2>
    <h2>
      <span style={{ backgroundColor: player3Color, display: 'inline-block', width: '20px', height: '20px', marginRight: '10px' }}></span>
      Player 3: <span>{playersLocations[2]}</span>
    </h2>
    <h2>
      <span style={{ backgroundColor: player4Color, display: 'inline-block', width: '20px', height: '20px', marginRight: '10px' }}></span>
      Player 4: <span>{playersLocations[3]}</span>
    </h2>
    <h2>
      <span style={{ backgroundColor: player5Color, display: 'inline-block', width: '20px', height: '20px', marginRight: '10px' }}></span>
      Player 5: <span>{playersLocations[4]}</span>
    </h2>
                </div>
            </div>
            <div className="winner-container">
                <div className="winner">
                    <h4>Winner is: <span>{winnerText}</span></h4>
                </div>
            </div>
            <div className="dice-container">
            <button className="button1" onClick={handleDiceRoll}>Roll Dice</button>   
            <Dice  ref={diceRef}  rollingTime={1300} size={150}  onRoll={(value) => { setDiceValue(value); handleroll(value);}} />
            {rolledText !== null && (
                <div key={texttrig} className="rolled-number"> {rolledText} </div>
            )}
    </div>
        </div>
        {win ? <Particles options={options} {...particlesInit} /> : null}
        <div onClick={() => setDialog(true)} className="close"><CloseIcon className="h-12 w-12 text-white m-auto close-icon" aria-hidden="true"/></div>
        <div className="save" onClick={() => handleSave()}><SaveIcon className="h-12 w-12 text-white m-auto save-icon" aria-hidden="true"/></div>
        <>
      {dialog && (
        <Transition.Root show={dialog} as={Fragment}>
          <Dialog
            as="div"
            className="dialog-overlay"
            initialFocus={cancelButtonRef}
            onClose={setDialog}
          >
            <div className="dialog-backdrop"></div>

            <div className="dialog-container">
              <Transition.Child
                as={Fragment}
                enter="dialog-enter"
                enterFrom="dialog-enter-from"
                enterTo="dialog-enter-to"
                leave="dialog-leave"
                leaveFrom="dialog-leave-from"
                leaveTo="dialog-leave-to"
              >
                <Dialog.Panel className="dialog-panel">
                  <div className="dialog-content">
                    <div className="dialog-header">
                      <div className="dialog-icon">
                        <span className="info-icon">!</span>
                      </div>
                      <div>
                        <Dialog.Title className="dialog-title">
                          Quit to Main Menu
                        </Dialog.Title>
                        <p className="dialog-message">
                          Are you sure you want to quit this game? Any unsaved progress will be lost, and you will return to the main menu.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="dialog-footer">
                    <button
                      className="dialog-button quit"
                      onClick={() => {
                        setDialog(false);
                        navigate("/");
                      }}
                    >
                      Quit
                    </button>
                    <button
                      className="dialog-button cancel"
                      onClick={() => setDialog(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    </div>
  );
};
export default Board;
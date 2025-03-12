import React, { useRef, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import { Dialog } from "@headlessui/react";
import { InfoRounded } from "@mui/icons-material";
//import { arrayMoveImmutable } from "array-move";
import SortableList from "../../Positions/Sortablelist";
import { useNavigate } from "react-router-dom";
import "./page2.css";

const Page2 = () => {
    const [name, setName] = useState("");
    const [players, setPlayers] = useState(2);
    const [check, setCheck] = useState(false);
    const [dialog, setDialog] = useState(false);
    const cancelButtonRef = useRef(null);
    const [items, setItems] = useState(["blue", "red", "green", "yellow", "purple"]);
    const navigate = useNavigate();

  /*  const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems((prevItem) => arrayMoveImmutable(prevItem, oldIndex, newIndex));
    };*/

    return (
        <div className="container">
            <h2 className="container-title">Game Settings</h2>
            <p className="container-description">Customize game settings before playing!</p>
            <div className="container-content">
                <label className="container-content-label">Game Name:</label>
                <TextField
                    className="container-content-input"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="container-content">
                <label className="container-content-label">Number of Players:</label>
                <FormControl variant="outlined" className="container-content-input">
                    <InputLabel id="demo-simple-select-outlined-label">Players</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={players}
                        onChange={(e) => setPlayers(e.target.value)}
                        label="Players"
                    >
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>
            </div>
          <div className="container-content">
                <label className="container-content-label">Include CPU (BOT):</label>
                <Switch checked={check} onChange={() => setCheck(!check)} />
            </div>
            <div className="container-content">
                <label className="container-content-label">Player Color order:</label>
                <p className="info-text">Drag and drop to change order (e.g., Player 1 is blue)</p>
                <SortableList items={items} setItems={setItems} />
            </div>
            <div className="container-content">
                <button className="play-button" onClick={() => setDialog(true)}>Play</button>
            </div>
            {
                dialog && (
                    <Dialog open={dialog} onClose={() => setDialog(false)} initialFocus={cancelButtonRef}>
                        <div className="dialog">
                            <div className="dialog-content">
                                <div className="dialog-icon1">
                                    <InfoRounded />
                                </div>
                                <h3>Start New Game</h3>
                                <p>Are you sure you want to start a new game?</p>
                                <div className="dialog-buttons">
                                    <button className="continue-button"
                                        onClick={() => {
                                            navigate("/board", {
                                                state: {
                                                    name,
                                                    players,
                                                    check,
                                                    items
                                                }
                                            });
                                            setDialog(false);
                                        }}>Continue</button>
                                    <button className="cancel-button" onClick={() => setDialog(false)} ref={cancelButtonRef}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                )
            }
        </div>
    );
};

export default Page2;
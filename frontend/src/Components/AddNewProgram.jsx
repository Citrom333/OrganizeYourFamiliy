import React from 'react';
import { useState } from 'react';
import "../AddNewProgram.css"
const AddNewProgram = ({ isOpen, onClose, users, }) => {
    if (!isOpen) return null;
    const [name, setName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [cost, setCost] = useState("");
    const [participants, setParticipants] = useState([]);
    const [isChecked, setIsChecked] = useState(new Array(users.length).fill(false));
    const fetchProgram = () => {

    };
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchProgram();
        console.log(participants);
    };
    const handleCheckboxChange = (e) => {
        let change = [...isChecked];
        change[e.target.value.split(",")[0]] = !isChecked[e.target.value.split(",")[0]];
        setIsChecked(change);
        console.log(e.target.value);
        if (change[e.target.value[0]]) {
            console.log("checked");
            setParticipants((current) => [...current, e.target.value.split(",")[1]]);
        }
        else {
            console.log("not checked");
            setParticipants(oldValues => {
                return oldValues.filter(partip => partip !== e.target.value.split(",")[1]);
            })
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div>
                    <form className="form" onSubmit={handleSubmit}>
                        <label>
                            <p>Program name</p>
                            <input
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label>
                            <p>Start</p>
                            <input
                                type="datetime-local"
                                onChange={(e) => setStart(e.target.value)}
                            />
                        </label>
                        <label>
                            <p>End</p>
                            <input
                                type="datetime-local"
                                onChange={(e) => setEnd(e.target.value)}
                            />
                        </label>
                        <label>
                            <p>Type</p>
                            {users.length > 0 ? users.map((u, index) => {
                                return <div><label for="user">{u.name}</label><input type="checkbox" checked={isChecked[index]}
                                    value={[index, u.id]} onChange={handleCheckboxChange} /></div>
                            }) : ""}
                        </label>
                        <label>
                            <p>Cost</p>
                            <input
                                onChange={(e) => setCost(e.target.value)}
                            />
                        </label>
                        <div>
                            <input className="submit" type="submit" value="Add program" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewProgram;
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
    const fetchProgram = () => {

    }
    const handleSubmit = () => {
        fetchProgram();
    }
    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={onClose}>&times;</button>
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
                        <select isMulti onChange={(e) => setParticipants(e.target.value)}>
                            <option value=""></option>
                            {users.length > 0 ? users.map(u => <option value={u.id}>u.name</option>) : ""}
                        </select>
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
    );
};

export default AddNewProgram;
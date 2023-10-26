import data from "../translator.json"
import React from 'react';
import { useState } from 'react';
import DateInput from "./DateInput";
const AddNewProgram = (props) => {
    const language = localStorage.getItem("language");
    const [name, setName] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [place, setPlace] = useState("");
    const [cost, setCost] = useState("");
    const [participants, setParticipants] = useState([]);
    const [isChecked, setIsChecked] = useState(new Array(props.users.length).fill(false));
    const fetchAddProgram = async () => {
        try {
            let res = await fetch(`/api/ScheduledProgram`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "name": name,
                    "start": start,
                    "end": end,
                    "place": place,
                    "cost": cost,
                    "participantIds": participants
                }),
            });
            if (res.status === 200) {
                setName("");
                setStart("");
                setEnd("");
                setPlace("");
                setCost("");
                setParticipants([]);
                setIsChecked(new Array(props.users.length).fill(false))
                props.setAddedNew(true);

            } else {
                setMessage(data["Some error occured"][language]);
            }
        } catch (err) {
            setMessage(data["ERROR"][language]);
            console.log(err);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchAddProgram();
    };
    const handleCheckboxChange = (e) => {
        let change = [...isChecked];
        change[e.target.value.split(",")[0]] = !isChecked[e.target.value.split(",")[0]];
        setIsChecked(change);
        if (change[e.target.value[0]]) {
            setParticipants((current) => [...current, e.target.value.split(",")[1]]);
        }
        else {
            setParticipants(oldValues => {
                return oldValues.filter(partip => partip !== e.target.value.split(",")[1]);
            })
        }
    };
    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    <p>{data["Program name"][language]}</p>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    <p>{data["Start"][language]}</p>
                    <DateInput value={start} selected={start} setter={setStart} timeNeeded={true} language={language} />
                </label>
                <label>
                    <p>{data["End"][language]}</p>
                    <DateInput value={end} selected={end} setter={setEnd} timeNeeded={true} language={language} />
                </label>
                <label >
                    <p>{data["Participants"][language]}</p>
                    <div className="centerForced">
                        <div className="checkBoxContainer">
                            {props.users.length > 0 ? props.users.map((u, index) => {
                                return <div key={u.id}><label htmlFor="user">{u.name}</label><input className="checkbox" type="checkbox" checked={isChecked[index]}
                                    value={[index, u.id]} onChange={handleCheckboxChange} /></div>
                            }) : ""}
                        </div>
                    </div>
                </label>
                <label>
                    <p>{data["Place (optional)"][language]}</p>
                    <input
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                    />
                </label>
                <label>
                    <p>{data["Cost"][language]}</p>
                    <input
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                    />
                </label>
                <div>
                    <input className="submit" type="submit" value={data["Add program"][language]} />
                </div>
            </form>
        </div>
    );
};

export default AddNewProgram;
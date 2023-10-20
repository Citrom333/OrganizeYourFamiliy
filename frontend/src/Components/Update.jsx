import data from "../translator.json"
import React from 'react';
import { useState, useEffect } from 'react';

const Update = (props) => {
    const language = localStorage.getItem("language");
    const [name, setName] = useState(props.toUpdate.name);
    const [start, setStart] = useState(props.toUpdate.start);
    const [end, setEnd] = useState(props.toUpdate.end);
    const [place, setPlace] = useState(props.toUpdate.place);
    const [cost, setCost] = useState(props.toUpdate.cost);
    const [participants, setParticipants] = useState([...props.toUpdate.participants.map(participant => participant.id)]);
    const [isChecked, setIsChecked] = useState(new Array(props.users.length).fill(false));
    const [message, setMessage] = useState("");
    useEffect(() => {
        if (participants.length > 0) {
            const newIsChecked = isChecked.map((_, index) => participants.includes(props.users[index].id));
            setIsChecked(newIsChecked);
        }
    }, []);
    const fetchUpdateProgram = async () => {
        console.log(`id: ${props.toUpdate.id}, name: ${name}, start: ${start}, end: ${end}, place: ${place}, cost: ${cost}, participants: ${participants.map(participant => participant.id)}`)
        try {
            let res = await fetch(`/api/ScheduledProgram`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "id": props.toUpdate.id,
                    "name": name,
                    "start": start,
                    "end": end,
                    "place": place,
                    "cost": cost,
                    "participantIds": participants
                }),
            });
            if (res.status === 200) {
                setMessage(data["Updated"][language]);
                props.change(true);
            } else {
                setMessage(data["Some error occured"][language]);
            }
        } catch (err) {
            setMessage(err);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchUpdateProgram();
    };
    const handleCheckboxChange = (e) => {
        let change = [...isChecked];
        change[e.target.value.split(",")[0]] = !isChecked[e.target.value.split(",")[0]];
        setIsChecked(change);
        if (change[e.target.value[0]]) {
            setParticipants((current) => [...current, parseInt(e.target.value.split(",")[1])]);
        }
        else {
            setParticipants(oldValues => {
                return oldValues.filter(partip => partip !== parseInt(e.target.value.split(",")[1]));
            })
        }
    };
    return (
        <div>
            <>{message === "" ?
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
                        <input
                            value={start}
                            type="datetime-local"
                            onChange={(e) => setStart(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>{data["End"][language]}</p>
                        <input
                            value={end}
                            type="datetime-local"
                            onChange={(e) => setEnd(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>{data["Participants"][language]}</p>
                        {props.users.length > 0 ? props.users.map((u, index) => {
                            return <div><label for="user">{u.name}</label><input type="checkbox" checked={isChecked[index]}
                                value={[index, u.id]} onChange={handleCheckboxChange} /></div>
                        }) : ""}
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
                        <input className="submit" type="submit" value="Update program" />
                    </div>
                </form>
                : <h3>{message}</h3>}</>
        </div>
    );
};

export default Update;
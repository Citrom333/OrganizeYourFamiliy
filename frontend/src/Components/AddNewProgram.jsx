import React from 'react';
import { useState } from 'react';

const AddNewProgram = (props) => {
    const [name, setName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
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
                // setMessage("Some error occured");
            }
        } catch (err) {
            // setMessage(err);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchAddProgram();
        console.log(props.change);
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
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <label>
                    <p>Program name</p>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    <p>Start</p>
                    <input
                        value={start}
                        type="datetime-local"
                        onChange={(e) => setStart(e.target.value)}
                    />
                </label>
                <label>
                    <p>End</p>
                    <input
                        value={end}
                        type="datetime-local"
                        onChange={(e) => setEnd(e.target.value)}
                    />
                </label>
                <label>
                    <p>Participants</p>
                    {props.users.length > 0 ? props.users.map((u, index) => {
                        return <div><label for="user">{u.name}</label><input type="checkbox" checked={isChecked[index]}
                            value={[index, u.id]} onChange={handleCheckboxChange} /></div>
                    }) : ""}
                </label>
                <label>
                    <p>Place (optional)</p>
                    <input
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                    />
                </label>
                <label>
                    <p>Cost</p>
                    <input
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                    />
                </label>
                <div>
                    <input className="submit" type="submit" value="Add program" />
                </div>
            </form>
        </div>
    );
};

export default AddNewProgram;
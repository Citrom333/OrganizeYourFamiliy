import data from "../translator.json"
import React from 'react';
import { useState } from 'react';
import ReactDatePicker from "react-datepicker";
import { enGB, fr, de, it, es, } from 'date-fns/esm/locale';
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddNewProgram = (props) => {
    registerLocale('English', enGB);
    registerLocale("Français", fr);
    registerLocale("Español", es);
    registerLocale("Italiano", it);
    registerLocale("Deutsch", de);
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
                // setMessage("Some error occured");
            }
        } catch (err) {
            // setMessage(err);
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
                    {language === "Hungarian" ?
                        <input
                            value={start}
                            type="datetime-local"
                            onChange={(e) => setStart(e.target.value)}
                        /> :
                        <ReactDatePicker
                            selected={start}
                            onChange={(date) => setStart(date)}
                            dateFormat={language === "Deutsch" ? "yyyy.MM.dd HH:mm" : "dd.MM.yyyy HH:mm"}
                            timeInputLabel={data["Time"][language]}
                            showTimeInput
                            locale={language}
                        />}
                </label>
                <label>
                    <p>{data["End"][language]}</p>
                    {language === "Hungarian" ?
                        <input
                            value={end}
                            type="datetime-local"
                            onChange={(e) => setEnd(e.target.value)}
                        /> :
                        <ReactDatePicker
                            selected={end}
                            onChange={(date) => setEnd(date)}
                            dateFormat={language === "Deutsch" ? "yyyy.MM.dd HH:mm" : "dd.MM.yyyy HH:mm"}
                            timeInputLabel={data["Time"][language]}
                            showTimeInput
                            locale={language}
                        />}
                </label>
                <label>
                    <p>{data["Participants"][language]}</p>
                    {props.users.length > 0 ? props.users.map((u, index) => {
                        return <div key={u.id}><label htmlFor="user">{u.name}</label><input className="checkbox" type="checkbox" checked={isChecked[index]}
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
                    <input className="submit" type="submit" value={data["Add program"][language]} />
                </div>
            </form>
        </div>
    );
};

export default AddNewProgram;
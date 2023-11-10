import data from "../translator.json"
import { useState } from "react";
export default function SetLeader(props) {
    const language = localStorage.getItem("language");
    const [message, setMessage] = useState("");
    const [answered, setAnswered] = useState(false);
    const setAsLeader = async () => {
        try {
            let res = await fetch(`/api/Leader/${props.familyId}/${props.userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.status === 200) {
                localStorage.setItem("leader", props.userId);
                setMessage(data[`Ok. But don't forget: With great power comes great responsibility`][language])
            }
            else {
                setMessage(data["Some error occured"][language]);
            }
        } catch (err) {
            setMessage(data["ERROR"][language]);
            console.log(err)
        }
    }
    return (
        <div>
            <div>
                <h1> </h1>
                <h3>{data["Would you like to be set"][language]}</h3>
                <h3>{data["as the leader of the family?"][language]}</h3>
            </div>
            {answered ? "" : <><button className="candyButton" onClick={e => { setAsLeader(); setAnswered(true) }}>{data["Yes"][language]}</button>
                <button className="candyButton" onClick={props.onClose}>{data["No"][language]}</button></>}

            <p>{message}</p>
        </div>
    )
}
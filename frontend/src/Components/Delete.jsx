import data from "../translator.json"
import route from "../backendRoute.json"
import { useState } from "react"
export default function Delete(props) {
    const language = localStorage.getItem("language");
    const [confirmed, setConfirmed] = useState(false);
    const [message, setMessage] = useState("")
    const finalDelete = async () => {
        setConfirmed(true);
        try {
            let url = props.type === "program" ? `${route.api}/ScheduledProgram/${props.toDelete.id}` : "member" ? `${route.api}/User/${props.toDelete.id}` : `${route.api}/ToDo/${props.toDelete.id}`;
            let res = await fetch(url, {
                method: "DELETE"
            })
            console.log(res.status)
            if (res.status === 200) {
                props.change(true);
                setMessage(data["Successfully deleted"][language])
            } else {
                setMessage(data["Some error occured"][language]);
            }
        }
        catch (err) {
            setMessage(data["Error"][language])
        }
    }
    return (
        <div>
            {confirmed ?
                <div><h1>{message}</h1></div>
                : <div>
                    <h2>{data["Do you really want to delete?"][language]}</h2>
                    <button className="candyButton" onClick={finalDelete}>{data["Yes"][language]}</button>
                    <button
                        className="candyButton"
                        onClick={props.onClose}
                    >{data["No"][language]}</button>
                </div>
            }
        </div>
    )
}
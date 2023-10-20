import data from "../translator.json"
import { useEffect } from "react";
export default function ToDos(props) {
    const language = localStorage.getItem("language");
    useEffect(() => {
    }, [props.toDos.length])

    return (
        <div className="toDos">
            <h3>{data["My to-dos:"][language]}</h3>
            <ul>
                {props.toDos.length > 0 ? props.toDos.map((t, index) => <li key={index}>{t.taskName}</li>) : ""}
            </ul>
        </div>
    )
}
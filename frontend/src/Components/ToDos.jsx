import { useEffect } from "react";
export default function ToDos(props) {
    useEffect(() => {
    }, [props.toDos.length])

    return (
        <div className="toDos">
            <h3>My to-dos:</h3>
            <ul>
                {props.toDos.length > 0 ? props.toDos.map((t, index) => <li key={index}>{t.taskName}</li>) : ""}
            </ul>
        </div>
    )
}
import { useState, useEffect } from "react";
export default function ToDos() {
    const [toDos, setToDos] = useState([]);
    let userId = localStorage.getItem("userId");
    const fetchToDos = () =>
        fetch(`/api/ToDo/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setToDos(json);

            });

    useEffect(() => {
        console.log(userId);
        fetchToDos();
        console.log(toDos);

    }, [toDos.length])

    return (
        <div className="toDos">
            <h3>My to-do list:</h3>
            <ul>
                {toDos.length > 0 ? toDos.map((t, index) => <li key={index}>{t.taskName}</li>) : ""}
            </ul>
        </div>
    )
}
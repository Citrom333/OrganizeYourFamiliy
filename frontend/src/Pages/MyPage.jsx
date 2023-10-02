import ToDos from "../Components/ToDos"
import Calendar from "../Components/Calendar"
import { useState, useEffect } from "react";
function MyPage() {
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
        fetchToDos();
    }, [toDos.length])
    return (
        <>
            <div className="myPage">
                <h1>My page</h1>
                <ToDos toDos={toDos} setToDos={setToDos} />
                <Calendar toDos={toDos} setToDos={setToDos} />
            </div>

        </>
    )
}

export default MyPage
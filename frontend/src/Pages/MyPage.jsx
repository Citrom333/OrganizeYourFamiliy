import ToDos from "../Components/ToDos"
import Calendar from "../Components/Calendar"
import { useState, useEffect } from "react";
import TodoDetails from "../Components/TodoDetails";
function MyPage() {
    const [toDos, setToDos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState("");
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
    }, [toDos.length, selectedTodo])

    const handleClick = (e) => {
        setSelectedTodo(toDos.find(t => t.id == e));
        console.log(selectedTodo);
    }
    return (
        <>
            <div className="myPage">
                <h1>My page</h1>
                {selectedTodo === "" ?
                    <div>
                        <ToDos toDos={toDos} />
                        <Calendar toDos={toDos} handleClick={e => handleClick(e)} />
                    </div> :
                    <TodoDetails toDo={selectedTodo} setSelected={setSelectedTodo} />}

            </div>
        </>
    )
}

export default MyPage
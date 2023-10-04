import ToDos from "../Components/ToDos"
import Calendar from "../Components/Calendar"
import { useState, useEffect } from "react";
import TodoDetails from "../Components/TodoDetails";
import Rewardpoints from "../Components/Rewardpoints";
function MyPage() {
    const [toDos, setToDos] = useState([]);
    const [addedNew, setAddedNew] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState("");
    let userId = localStorage.getItem("userId");
    const [user, setUser] = useState("");
    const fetchUser = async () =>
        await fetch(`/api/User/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setUser(json);

            });
    useEffect(() => {
        fetchUser();
        console.log(user)
    }, [])
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
        console.log(addedNew);
        setAddedNew(false);
    }, [toDos.length, addedNew, selectedTodo])

    const handleClick = (e) => {
        setSelectedTodo(toDos.find(t => t.id == e));
        console.log(selectedTodo);
    }
    return (
        <>
            <div className="myPage">
                <div>
                    <div key={user.id}><img className="userAvatarPic" src={user.avatarPic} /><div>{user.name}</div></div>
                </div>
                <h1>My page</h1>
                {selectedTodo === "" ?
                    <div>
                        <Rewardpoints user={user} />
                        <ToDos toDos={toDos} setAddedNew={setAddedNew} />
                        <Calendar toDos={toDos} handleClick={e => handleClick(e)} toDo={selectedTodo} />
                    </div> :
                    <TodoDetails toDo={selectedTodo} setSelected={setSelectedTodo} />}

            </div>
        </>
    )
}

export default MyPage
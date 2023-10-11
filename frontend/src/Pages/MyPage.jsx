import ToDos from "../Components/ToDos"
import Calendar from "../Components/Calendar"
import { useState, useEffect } from "react";
import TodoDetails from "../Components/TodoDetails";
import Rewardpoints from "../Components/Rewardpoints";
import Modal from "../Components/Modal";
import AddTodo from "../Components/AddTodo";
import ProgramDetails from "../Components/ProgramDetails";
function MyPage() {
    const [progDetailIsOpen, setProgDetailIsOpen] = useState(false);
    const [toDos, setToDos] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [change, setChange] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState("");
    const [selectedProg, setSelectedProg] = useState("");
    const [programs, setPrograms] = useState([]);
    let userId = localStorage.getItem("userId");
    const [user, setUser] = useState("");
    const updateFunction = (prop) => {
        console.log("update " + prop.id);
    }
    const deleteFunction = (prop) => {
        console.log("delete " + prop.id);
    }
    const fetchUser = async () =>
        await fetch(`/api/User/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setUser(json);

            });

    const fetchToDos = () =>
        fetch(`/api/ToDo/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setToDos(json);

            });
    const fetchPrograms = () =>
        fetch(`/api/ScheduledProgram/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setPrograms(json);

            });
    useEffect(() => {
        fetchUser();
        fetchToDos();
        fetchPrograms();
        setChange(false);
    }, [toDos.length, change, selectedTodo])

    const handleClick = (id, type) => {
        if (type === "program") {
            setSelectedProg(programs.find(p => p.id == id))
            setProgDetailIsOpen(true);
        }
        else
            setSelectedTodo(toDos.find(t => t.id == id));
    }
    return (
        <>
            <div className="myPage">
                <div>
                    <div key={user.id}><img className="userAvatarPic" src={user.avatarPic} /><div>{user.name}</div></div>
                </div>
                <h1>My page</h1>

                <div>
                    <Rewardpoints user={user} />
                    <button onClick={e => setShowAddForm(true)}>Add todo</button>
                    <Modal isOpen={progDetailIsOpen} onClose={e => setProgDetailIsOpen(false)} child={<ProgramDetails program={selectedProg} setSelected={setSelectedProg} handleUpdate={prog => updateFunction(prog)} handleDelete={prog => deleteFunction(prog)} />} />
                    <Modal isOpen={showAddForm} onClose={e => setShowAddForm(false)} child={<AddTodo toDos={toDos} setAddedNew={setChange} />} />
                    <Modal isOpen={selectedTodo !== ""} onClose={e => setSelectedTodo("")} child={<TodoDetails toDo={selectedTodo} setSelected={setSelectedTodo} />} />
                    <Calendar isMainPage={false} toDos={toDos} handleClick={(id, type) => handleClick(id, type)} toDo={selectedTodo} programs={programs} />
                </div>

            </div>
        </>
    )
}

export default MyPage
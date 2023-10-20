import data from "../translator.json"
import ToDos from "../Components/ToDos"
import Calendar from "../Components/Calendar"
import { useState, useEffect } from "react";
import TodoDetails from "../Components/TodoDetails";
import Rewardpoints from "../Components/Rewardpoints";
import Modal from "../Components/Modal";
import AddTodo from "../Components/AddTodo";
import ProgramDetails from "../Components/ProgramDetails";
import Delete from "../Components/Delete";
import Update from "../Components/Update";
import SetLeader from "../Components/SetLeader";
import { useOutletContext } from "react-router-dom";
function MyPage() {
    const [language, setLanguage] = useOutletContext();
    const [progDetailIsOpen, setProgDetailIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [updateIsOpen, setUpdateIsOpen] = useState(false);
    const [setLeaderIsOpen, setSetLeaderIsOpen] = useState(false);
    const [toDos, setToDos] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [change, setChange] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState("");
    const [selectedProg, setSelectedProg] = useState("");
    const [programs, setPrograms] = useState([]);
    const [members, setMembers] = useState([]);
    let userId = parseInt(localStorage.getItem("userId"));
    let familyId = parseInt(localStorage.getItem("familyId"));
    const [user, setUser] = useState("");
    const isLeader = localStorage.getItem("leader") == userId;
    const fetchMembers = () =>
        fetch("/api/User", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setMembers(json);
            });
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
        fetchMembers();
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
                <h1>{data["My page"][language]}</h1>
                {isLeader || localStorage.getItem("isAdult") == "false" ? "" : <button onClick={e => setSetLeaderIsOpen(true)}>{data["Be the leader"][language]}</button>}
                <div>
                    {localStorage.getItem("isAdult") == "false" ? <Rewardpoints user={user} /> : ""}
                    <button onClick={e => setShowAddForm(true)}>{data["Add todo"][language]}</button>
                    <Modal isOpen={setLeaderIsOpen} onClose={e => setSetLeaderIsOpen(false)} child={<SetLeader userId={userId} familyId={familyId} onClose={e => setSetLeaderIsOpen(false)} />} />
                    <Modal isOpen={progDetailIsOpen} onClose={e => setProgDetailIsOpen(false)} child={<ProgramDetails program={selectedProg} setSelected={setSelectedProg} handleUpdate={e => { setProgDetailIsOpen(false); setUpdateIsOpen(true) }} handleDelete={e => { setProgDetailIsOpen(false); setDeleteIsOpen(true) }} />} />
                    <Modal isOpen={deleteIsOpen} onClose={e => setDeleteIsOpen(false)} child={<Delete toDelete={selectedProg} setSelected={setSelectedProg} type="program" change={setChange} onClose={e => setDeleteIsOpen(false)} />} />
                    <Modal isOpen={updateIsOpen} onClose={e => setUpdateIsOpen(false)} child={<Update toUpdate={selectedProg} setSelected={setSelectedProg} type="program" change={setChange} users={members} />} />
                    <Modal isOpen={showAddForm} onClose={e => setShowAddForm(false)} child={<AddTodo setAddedNew={setChange} userId={userId} todos={toDos} />} />
                    <Modal isOpen={selectedTodo !== ""} onClose={e => setSelectedTodo("")} child={<TodoDetails toDo={selectedTodo} setSelected={setSelectedTodo} />} />
                    <Calendar isMainPage={false} toDos={toDos} handleClick={(id, type) => handleClick(id, type)} toDo={selectedTodo} programs={programs} />
                </div>

            </div>
        </>
    )
}

export default MyPage
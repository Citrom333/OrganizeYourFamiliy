import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import "../Style.css"
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Calendar from "../Components/Calendar";
import Modal from "../Components/Modal";
import AddNewProgram from "../Components/AddNewProgram";
import ProgramDetails from "../Components/ProgramDetails";
function MainFamilyPage() {
    const location = useLocation();
    const [members, setMembers] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [addProgIsOpen, setAddProgIsOpen] = useState(false);
    const [progDetailIsOpen, setProgDetailIsOpen] = useState(false);
    const [change, setChange] = useState(false);
    const [selectedProg, setSelectedProg] = useState("");
    const fetchMembers = () =>
        fetch("/api/User", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setMembers(json);

            });
    const fetchPrograms = () =>
        fetch("/api/ScheduledProgram", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setPrograms(json);

            });
    const handleClick = (id, type) => {
        setSelectedProg(programs.find(p => p.id == id))
        setProgDetailIsOpen(true)
    }
    useEffect(() => {
        fetchMembers();
        fetchPrograms();
        console.log(change)
        setChange(false);
    }, [members.length, programs.length, change])
    return (
        <>
            <div>
                <Navbar />
                <div className="mainPageDiv">
                    {location.pathname == '/MainFamilyPage' ?
                        <div><div><h1>This is my family</h1>
                            <div className="memberAvatars">
                                {members.length > 0 ? members.map(mem => <div key={mem.id}><img className="avatarPic" src={mem.avatarPic} /><div>{mem.name}</div></div>) : ""}
                            </div>
                        </div>
                            <Modal isOpen={addProgIsOpen} onClose={e => setAddProgIsOpen(false)} child={<AddNewProgram users={members} setAddedNew={setChange} change={change} />} />
                            <Modal isOpen={progDetailIsOpen} onClose={e => setProgDetailIsOpen(false)} child={<ProgramDetails program={selectedProg} setSelected={setSelectedProg} handleUpdate={prog => updateFunction(prog)} handleDelete={prog => deleteFunction(prog)} />} />
                            <button onClick={e => setAddProgIsOpen(true)}>Add new program</button>
                            <div><Calendar isMainPage={true} toDos={[]} handleClick={(id, type) => handleClick(id, type)} toDo={""} programs={programs} /></div>
                        </div> :
                        ""}
                    <Outlet />
                    <Footer />
                </div>
            </div>

        </>
    )
}

export default MainFamilyPage
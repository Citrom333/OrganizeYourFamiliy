import data from "../translator.json"
import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import "../Style.css"
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Calendar from "../Components/Calendar";
import Modal from "../Components/Modal";
import AddNewProgram from "../Components/AddNewProgram";
import ProgramDetails from "../Components/ProgramDetails";
import Delete from "../Components/Delete";
import UpdateProgram from "../Components/UpdateProgram";
import UpdateMember from "../Components/UpdateMember";
import AddTodo from "../Components/AddTodo";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import RewardShopHandler from "../Components/RewardShopHandler";
import fetchGetAll from "../CostumHooks/fetchGetAll";
function MainFamilyPage() {
    const navigate = useNavigate();
    const [language, setLanguage] = useOutletContext();
    const location = useLocation();
    const [members, setMembers] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [addProgIsOpen, setAddProgIsOpen] = useState(false);
    const [progDetailIsOpen, setProgDetailIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [updateIsOpen, setUpdateIsOpen] = useState(false);
    const [rewardShopHandlerIsOpen, setRewardShopHandlerIsOpen] = useState(false);
    const [change, setChange] = useState(false);
    const [selectedProg, setSelectedProg] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateMemberForm, setShowUpdateMemberForm] = useState(false);
    const [showDeleteMember, setShowDeleteMember] = useState(false);
    const [selectedMember, setSelectedMember] = useState("");
    const [message, setMessage] = useState("");
    const [toDos, setToDos] = useState([]);
    const leader = localStorage.getItem("leader");

    const handleClick = (id, type) => {
        setSelectedProg(programs.find(p => p.id == id))
        setProgDetailIsOpen(true)
    }
    useEffect(() => {
        if (localStorage.getItem("familyId")) {
            fetchGetAll("members", setMembers);
            fetchGetAll("programs", setPrograms);
            fetchGetAll("todos", setToDos);
            setChange(false);
            setMessage("");
        }
        else navigate("/")
    }, [members.length, programs.length, change, toDos.length, language])
    return (
        <>
            <div>
                <Navbar />
                <div className="mainPageDiv">
                    {location.pathname == '/MainFamilyPage' ?
                        <div><div><h1>{data["This is my family"][language]}</h1>
                            <div className="memberAvatars">
                                {members.length > 0 ? members.map(mem => <div onClick={e => { selectedMember === mem ? setSelectedMember("") : setSelectedMember(mem); setMessage("") }} key={mem.id}><div className="avatarPicAndCrown">{leader == mem.id ? <img className="crown" src="../images/crown3.png" /> : ""}<img className="avatarPic" id={selectedMember === mem ? "chosenPicture" : ""} src={mem.avatarPic} /></div><div><h3>{mem.name}</h3></div></div>) : ""}
                            </div>
                        </div>
                            <Modal isOpen={addProgIsOpen} onClose={e => setAddProgIsOpen(false)} child={<AddNewProgram users={members} setAddedNew={setChange} change={change} />} />
                            <Modal isOpen={progDetailIsOpen} onClose={e => setProgDetailIsOpen(false)} child={<ProgramDetails program={selectedProg} setSelected={setSelectedProg} handleUpdate={e => { setProgDetailIsOpen(false); setUpdateIsOpen(true) }} handleDelete={e => { setProgDetailIsOpen(false); setDeleteIsOpen(true) }} />} isSmall={true} />
                            <Modal isOpen={deleteIsOpen} onClose={e => setDeleteIsOpen(false)} child={<Delete toDelete={selectedProg} setSelected={setSelectedProg} type="program" change={setChange} onClose={e => setDeleteIsOpen(false)} />} isSmall={true} />
                            <Modal isOpen={updateIsOpen} onClose={e => setUpdateIsOpen(false)} child={<UpdateProgram toUpdate={selectedProg} setSelected={setSelectedProg} type="program" change={setChange} users={members} />} />
                            <Modal isOpen={rewardShopHandlerIsOpen} onClose={e => setRewardShopHandlerIsOpen(false)} child={<RewardShopHandler />} isSmall={true} />
                            <Modal isOpen={showAddForm} onClose={e => setShowAddForm(false)} child={<AddTodo todos={toDos} setAddedNew={setChange} userId={selectedMember.id} />} />
                            <Modal isOpen={showUpdateMemberForm} onClose={e => setShowUpdateMemberForm(false)} child={<UpdateMember toUpdate={selectedMember} setSelected={setSelectedMember} change={setChange} />} />
                            <Modal isOpen={showDeleteMember} onClose={e => setShowDeleteMember(false)} child={<Delete toDelete={selectedMember} setSelected={setSelectedProg} type="member" change={setChange} onClose={e => setShowDeleteMember(false)} />} isSmall={true} />
                            {localStorage.getItem("isAdult") ?
                                <div><button className="candyButton" onClick={e => setAddProgIsOpen(true)}>{data["Add new program"][language]}</button>
                                    <button className="candyButton" onClick={e => setRewardShopHandlerIsOpen(true)}>{data["Handle rewardshop"][language]}</button></div> : ""}
                            {localStorage.getItem("isAdult") && selectedMember !== "" ? <div>
                                <button className="candyButton" onClick={e => setShowAddForm(true)}>{data["Add todo for "][language]}{selectedMember.name}</button>
                                <button className="candyButton" onClick={e => setShowUpdateMemberForm(true)}>{data["Update details of "][language]}{selectedMember.name} {data["Update details of 2"][language]}</button>
                                <button className="candyButton" onClick={e => setShowDeleteMember(true)}>{data["Delete member"][language]} {selectedMember.name} {data["from family"][language]}</button></div>
                                : ""}<p>{message}</p>
                            <div><Calendar isMainPage={true} toDos={[]} handleClick={(id, type) => handleClick(id, type)} toDo={""} programs={programs} /></div>
                        </div> :
                        ""}
                    <Outlet context={[language, setLanguage]} />
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default MainFamilyPage
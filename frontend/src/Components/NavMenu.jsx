import data from "../translator.json";
import { useState } from "react";
import handleLogout from "../CostumHooks/handleLogout";
export default function NavMenu({ handleLogout, language }) {
    const [selectedMember, setSelectedMember] = useState("");
    const [id, setId] = useState("")
    const [members, setMembers] = useState([]);
    return (
        <div className="navmenu">

            {localStorage.getItem("isAdult") == "false" ? "" : <div> <a href="/MainFamilyPage/AddFamilyMember"><button>{data["Add new member"][language]}</button></a></div>}
            {localStorage.getItem("userName") !== "" && localStorage.getItem("userName") !== null ?
                <div> <a href="/MainFamilyPage/MyPage"><button>{data["profile of "][language]}{localStorage.getItem("userName")}{data["'s profile"][language]}</button></a></div>
                :
                <div><a href="/MainFamilyPage/LoginAsFamilyMember"><button>{data["Member login"][language]}</button></a></div>}
            <div><button onClick={handleLogout}>{data["Logout"][language]}</button></div>
            {/* {localStorage.getItem("isAdult") == "true" ?
                <div><button >{data["Add new program"][language]}</button>
                    <button >{data["Handle rewardshop"][language]}</button></div>
                : ""} */}
            {/* <select onChange={e => { setSelectedMember(e.target.value.split(",")[1]); setId(e.target.value.split(",")[0]) }}>
                <option value=""></option>
                {members.map(member => <option key={member.id} value={[member.id, member.name]}>{member.name}</option>)}
            </select>
            {localStorage.getItem("isAdult") && selectedMember !== "" ? <div>
                <button >{data["Add todo for "][language]}{selectedMember}</button>
                <button >{data["Update details of "][language]}{selectedMember} {data["Update details of 2"][language]}</button>
                <button >{data["Delete member"][language]} {selectedMember} {data["from family"][language]}</button></div>
                : ""} */}
        </div>
    )
}
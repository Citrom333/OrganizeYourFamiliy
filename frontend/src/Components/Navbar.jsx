import data from "../translator.json"
import "../Style.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../MobileStyle.css";
import Modal from "./Modal";
import NavMenu from "./NavMenu";
import handleLogout from "../CostumHooks/handleLogout";
export default function Navbar() {
    const language = localStorage.getItem("language");
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
    }, [language])

    const navbuttons = (<><div className="navbuttons">
        {localStorage.getItem("isAdult") == "false" ? "" : <div> <a href="/MainFamilyPage/AddFamilyMember"><button>{data["Add new member"][language]}</button></a></div>}
        {localStorage.getItem("userName") !== "" && localStorage.getItem("userName") !== null ?
            <div> <a href="/MainFamilyPage/MyPage"><button>{data["profile of "][language]}{localStorage.getItem("userName")}{data["'s profile"][language]}</button></a></div>
            :
            <div><a href="/MainFamilyPage/LoginAsFamilyMember"><button>{data["Member login"][language]}</button></a></div>}
        <div><button onClick={() => handleLogout(navigate)}>{data["Logout"][language]}</button></div>
    </div></>)
    return (
        <>
            <div className="navbar">
                <div><a href="/MainFamilyPage"><p>{data["This is "][language]}{localStorage.getItem("familyName")} {data["family"][language]}</p></a></div>
                <div><h3>{data["This is the Great Family Organizer"][language]}</h3></div>
                <img onClick={setShowMenu} className="mobileMenu" src="../images/pngegg.png" />
                {navbuttons}
            </div>
            <Modal isOpen={showMenu} onClose={e => setShowMenu(false)} child={
                <NavMenu
                    handleLogout={() => handleLogout(navigate)} language={language} />} />
        </>
    )
}
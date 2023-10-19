import data from "../translator.json"
import "../Style.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Navbar() {
    const language = localStorage.getItem("language");
    const navigate = useNavigate();
    useEffect(() => {
    }, [language])
    const handleLogout = async () => {
        localStorage.clear();
        try {
            let res = await fetch("/api/Family/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                }),
            });
            if (res.status === 200) {
                localStorage.Clear();
            } else {
                console.log(data["Some error occured"][language]);
            }
        } catch (err) {
            console.log(err);
        }
        navigate("/");
    }
    return (
        <div className="navbar">
            <div><a href="/MainFamilyPage"><p>{data["This is "][language]}{localStorage.getItem("familyName")} {data["family"][language]}</p></a></div>
            <div><h3>{data["This is the Great Family Organizer"][language]}</h3></div>
            <div className="navbuttons">
                {localStorage.getItem("isAdult") == "false" ? "" : <div> <a href="/MainFamilyPage/AddFamilyMember"><button>{data["Add new member"][language]}</button></a></div>}
                {localStorage.getItem("userName") !== "" && localStorage.getItem("userName") !== null ?
                    <div> <a href="/MainFamilyPage/MyPage"><button>{data["'s profile"][language]}{localStorage.getItem("userName")}{data["'s profile"][language]}</button></a></div>
                    :
                    <div><a href="/MainFamilyPage/LoginAsFamilyMember"><button>{data["Member login"][language]}</button></a></div>}
                <div><button onClick={handleLogout}>{data["Logout"][language]}</button></div>
            </div>
        </div>
    )
}
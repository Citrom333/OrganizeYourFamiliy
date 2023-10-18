import "../Style.css";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
    const navigate = useNavigate();

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
                console.log("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
        navigate("/");
    }
    return (
        <div className="navbar">
            <div><a href="/MainFamilyPage"><p>This is {localStorage.getItem("familyName")} family</p></a></div>
            <div><h3>This is the Great Family Organizer</h3></div>
            <div className="navbuttons">
                {localStorage.getItem("isAdult") == "false" ? "" : <div> <a href="/MainFamilyPage/AddFamilyMember"><button>Add new member</button></a></div>}
                {localStorage.getItem("userName") !== "" && localStorage.getItem("userName") !== null ?
                    <div> <a href="/MainFamilyPage/MyPage"><button>{localStorage.getItem("userName")}'s profile</button></a></div>
                    :
                    <div><a href="/MainFamilyPage/LoginAsFamilyMember"><button>Member login</button></a></div>}
                <div><button onClick={handleLogout}>Logout</button></div>
            </div>
        </div>
    )
}
import "../Style.css";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div className="navbar">
            <div><p>This is {localStorage.getItem("familyName")} family</p></div>
            <div><h3>This is the Great Family Organizer</h3></div>
            <div className="navbuttons">
                <div> <a href="/MainFamilyPage/AddFamilyMember"><button>Add new member</button></a></div>
                {localStorage.getItem("userName") !== "" && localStorage.getItem("userName") !== null ?
                    <div> <a href="/MainFamilyPage/MyPage"><button>{localStorage.getItem("userName")}'s profile</button></a></div>
                    :
                    <div><a href="/MainFamilyPage/LoginAsFamilyMember"><button>Member login</button></a></div>}
                <div><button onClick={handleLogout}>Logout</button></div>
            </div>
        </div>
    )
}
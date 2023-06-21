import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import "../Style.css"
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
function MainFamilyPage() {
    const location = useLocation();
    const [members, setMembers] = useState([]);
    const fetchMembers = () =>
        fetch("/api/User", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setMembers(json);

            });

    useEffect(() => {
        fetchMembers();
        console.log(members);
        console.log(location);
    }, [members.length])
    return (
        <>
            <div>
                <Navbar />
                <div className="mainPageDiv">
                    {location.pathname !== '/MainFamilyPage/MyPage' ?
                        <div><h1>This is my family</h1>
                            <div className="memberAvatars">
                                {members.length > 0 ? members.map(mem => <div key={mem.id}><img className="avatarPic" src={mem.avatarPic} /><div>{mem.name}</div></div>) : ""}
                            </div>
                        </div> :
                        <div>
                            {members.map(mem => mem.id.toString() === localStorage.getItem("userId") ? <div key={mem.id}><img className="avatarPic" src={mem.avatarPic} /><div>{mem.name}</div></div> : "")}
                        </div>}
                    <Outlet />
                    <Footer />
                </div>
            </div>

        </>
    )
}

export default MainFamilyPage
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import "../Style.css"
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
function MainFamilyPage() {
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
    }, [members.length])
    return (
        <>
            <div>
                <Navbar />
                <h1>This is my family</h1>
                <ul>
                    {members.length > 0 ? members.map(mem => <li key={mem.id}><div><img src={mem.avatarPic} /><div>{mem.name}</div></div></li>) : ""}
                </ul>
                <Outlet />
                <Footer />
            </div>

        </>
    )
}

export default MainFamilyPage
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import "../Style.css"
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

                <h1>This is my family</h1>
                <p>{localStorage.getItem("familyName")}</p>
                <ul>
                    {members.length > 0 ? members.map(mem => <li key={mem.id}>{mem.name}</li>) : ""}
                </ul>
                <Outlet />

            </div>

        </>
    )
}

export default MainFamilyPage
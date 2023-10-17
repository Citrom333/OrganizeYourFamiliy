import { useState } from "react";
export default function SetLeader(props) {
    const [message, setMessage] = useState("")
    const setAsLeader = async () => {
        console.log(props.userId);
        try {
            let res = await fetch(`/api/Leader/${props.familyId}/${props.userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.status === 200) {
                localStorage.setItem("leader", props.userId);
                setMessage(`Ok. But don't forget: With great power comes great responsibility`)
            }
            else {
                setMessage("Some error occured");
            }
        } catch (err) {
            setMessage("ERROR");
            console.log(err)
        }
    }
    return (
        <div>
            <div>
                <h1> </h1>
                <h3>Would you like to be set</h3>
                <h3>as the leader of the family?</h3>
            </div>
            <button onClick={setAsLeader}>Yes</button>
            <button onClick={props.onClose}>No</button>
            <p>{message}</p>
        </div>
    )
}
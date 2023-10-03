import { useState, useEffect } from "react"
export default function TodoDetails(props) {
    const [isChecked, setIsChecked] = useState(props.toDo.ready)

    const handleCheckboxChange = async () => {
        console.log(isChecked);
        setIsChecked(!isChecked);
        try {
            let res = await fetch("/api/ToDo", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "id": parseInt(props.toDo.id),
                    "taskName": props.toDo.taskName,
                    "description": props.toDo.description,
                    "deadline": props.toDo.deadline,
                    "type": parseInt(props.toDo.type),
                    "rewardPoint": parseInt(props.toDo.rewardPoint),
                    "ready": !isChecked,
                    "ownerID": props.toDo.owner.id
                }),
            });
            if (res.status === 200) {
                console.log("Todo updated");

            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {

    }, [isChecked])
    return (
        <div>
            <h2>{props.toDo.taskName}</h2>
            <h3>Description: {props.toDo.description}</h3>
            <h3>Deadline: {props.toDo.deadline.split("T")[0]}</h3>
            <form>
                <label for="ready">Ready? :   </label><input type="checkbox" id="ready" checked={isChecked}// A checkbox állapotának beállítása az állapot alapján
                    onChange={handleCheckboxChange} />
            </form>
            <button onClick={e => props.setSelected("")}>Back</button>
        </div>
    )
}
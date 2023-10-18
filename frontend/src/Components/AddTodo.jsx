import { useState, useEffect } from "react";
import postTodo from "../CostumHooks/postTodo";
import mostFreqToDos from "../CostumHooks/mostFreqToDos";
export default function AddTodo(props) {
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [toDoType, setToDoType] = useState("");
    const [rewardPoint, setRewardpoint] = useState("");
    const [message, setMessage] = useState("");

    let userId = props.userId;
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`: ${taskName}, : ${description}, : ${deadline}, type: ${toDoType}, : ${userId}`);
        try {
            let res = await postTodo(taskName, description, deadline, toDoType, rewardPoint, userId);
            if (res.status === 200) {
                setTaskName("");
                setDescription("");
                setDeadline("");
                setToDoType("");
                setRewardpoint("");
                setMessage("ToDo added successfully");
                props.setAddedNew(true);
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            setMessage("Some error occured");
            console.log(err)
        }
    };
    return (
        <div className="toDos">
            <h3>Add new todo</h3>
            <h3>Or choose from the most frequents</h3>
            <select onChange={e => {
                if (e.target.value === "") {
                    setTaskName("");
                    setDescription("");
                    setDeadline("");
                    setToDoType("");
                    setRewardpoint("");
                }
                else {
                    setTaskName(props.todos.find(t => t.id == e.target.value).taskName);
                    setToDoType(props.todos.find(t => t.id == e.target.value).type);
                    setDescription(props.todos.find(t => t.id == e.target.value).description);
                    setRewardpoint(props.todos.find(t => t.id == e.target.value).rewardPoint);
                }
            }}>
                <option value={""}></option>
                {props.todos.length > 0 ? mostFreqToDos(props.todos).map(t => <option value={t.id} key={t.id}>{t.taskName}</option>) : ""}
            </select>
            <div>
                <form className="form" onSubmit={handleSubmit}>
                    <label>
                        <p>Name</p>
                        <input
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Description</p>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Deadline</p>
                        <input
                            value={deadline}
                            type="date"
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Type</p>
                        <select onChange={(e) => setToDoType(e.target.value)}>
                            <option value={toDoType}>{toDoType === 0 ? "Housework" : toDoType === 1 ? "Job" : toDoType === 2 ? "School" : toDoType === 3 ? "Other" : ""}</option>
                            <option value={0}>Housework</option>
                            <option value={1}>Job</option>
                            <option value={2}>School</option>
                            <option value={3}>Other</option>
                        </select>
                    </label>
                    <label>
                        <p>Rewardpoint</p>
                        <input
                            value={rewardPoint}
                            onChange={(e) => setRewardpoint(e.target.value)}
                        />
                    </label>
                    <div>
                        <input className="submit" type="submit" value="Add task" />
                    </div>
                </form>
            </div>

            {message ? <p>{message}</p> : ""}
        </div >
    )
}
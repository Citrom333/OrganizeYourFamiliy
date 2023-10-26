import data from "../translator.json"
import { useState } from "react";
import postTodo from "../CostumHooks/postTodo";
import mostFreqToDos from "../CostumHooks/mostFreqToDos";
import DateInput from "./DateInput";
export default function AddTodo(props) {
    const language = localStorage.getItem("language");
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
                setMessage(data["ToDo added successfully"][language]);
                props.setAddedNew(true);
            } else {
                setMessage(data["Some error occured"][language]);
            }
        } catch (err) {
            setMessage(data["Some error occured"][language]);
            console.log(err)
        }
    };
    return (
        <div className="toDos">
            <h3>{data["Add new todo"][language]}</h3>
            <h3>{data["Or choose from the most frequents"][language]}</h3>
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
                        <p>{data["Name"][language]}</p>
                        <input
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>{data["Description"][language]}</p>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>{data["Deadline"][language]}</p>
                        <DateInput value={deadline} selected={deadline} setter={setDeadline} timeNeeded={false} language={language} />
                    </label>
                    <label>
                        <p>{data["Type"][language]}</p>
                        <select onChange={(e) => setToDoType(e.target.value)}>
                            <option value={toDoType}>{toDoType === 0 ? data["Housework"][language] : toDoType === 1 ? data["Job"][language] : toDoType === 2 ? data["School"][language] : toDoType === 3 ? data["Other"][language] : ""}</option>
                            <option value={0}>{data["Housework"][language]}</option>
                            <option value={1}>{data["Job"][language]}</option>
                            <option value={2}>{data["School"][language]}</option>
                            <option value={3}>{data["Other"][language]}</option>
                        </select>
                    </label>
                    <label>
                        <p>{data["Rewardpoint"][language]}</p>
                        <input
                            value={rewardPoint}
                            onChange={(e) => setRewardpoint(e.target.value)}
                        />
                    </label>
                    <div>
                        <input className="submit" type="submit" value={data["Add todo"][language]} />
                    </div>
                </form>
            </div>

            {message ? <p>{message}</p> : ""}
        </div >
    )
}
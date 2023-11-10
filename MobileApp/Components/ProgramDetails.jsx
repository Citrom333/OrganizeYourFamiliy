import data from "../translator.json"
export default function ProgramDetails(props) {
    const language = localStorage.getItem("language");

    return (
        <div>
            <h2>{props.program.name}</h2>
            <h3>{data["Start date: "][language]}{props.program.start.split("T")[0]}</h3>
            <h3>{data["Start time: "][language]}{props.program.start.split("T")[1]}</h3>
            <h3>{data["End date: "][language]}{props.program.end.split("T")[0]}</h3>
            <h3>{data["End time: "][language]}{props.program.end.split("T")[1]}</h3>
            {props.program.place !== "" ? <h3>{data["Place: "][language]}{props.program.place}</h3> : ""}
            <h3>{data["Participants: "][language]}{" "}
                {props.program.participants.map((user, index) => (
                    <span key={user.id}>
                        {user.name}
                        {index < props.program.participants.length - 1 && ", "}
                    </span>
                ))}
            </h3>
            {props.program.cost > 0 ? <h3>{data["Cost: "][language]}{props.program.cost}</h3> : ""}
            <button className="candyButton" onClick={e => props.handleUpdate(props.program)}>{data["Update"][language]}</button>
            <button className="candyButton" onClick={e => props.handleDelete(props.program)}>{data["Delete"][language]}</button>
        </div >
    )
}
import { useState, useEffect } from "react"
export default function ProgramDetails(props) {


    return (
        <div>
            <h2>{props.program.name}</h2>
            <h3>Start date: {props.program.start.split("T")[0]}</h3>
            <h3>Start time: {props.program.start.split("T")[1]}</h3>
            <h3>End date: {props.program.end.split("T")[0]}</h3>
            <h3>End time: {props.program.end.split("T")[1]}</h3>
            {props.program.place !== "" ? <h3>Place: {props.program.place}</h3> : ""}<h3>
                Participants:{" "}
                {props.program.participants.map((user, index) => (
                    <span key={user.id}>
                        {user.name}
                        {index < props.program.participants.length - 1 && ", "}
                    </span>
                ))}
            </h3>
            {props.program.cost > 0 ? <h3>Cost: {props.program.cost}</h3> : ""}
            <button onClick={e => props.handleUpdate(props.program)}>Update</button>
            <button onClick={e => props.handleDelete(props.program)}>Delete</button>
            {/* <button onClick={e => props.setSelected("")}>Back</button> */}
        </div >
    )
}
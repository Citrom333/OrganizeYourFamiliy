import { useState } from "react"
export default function Delete(props) {
    const [confirmed, setConfirmed] = useState(false);
    const [message, setMessage] = useState("")
    const finalDelete = async () => {
        setConfirmed(true);
        try {
            let url = props.type === "program" ? `/api/ScheduledProgram/${props.toDelete.id}` : `/api/ToDo/${props.toDelete.id}`;
            let res = await fetch(url, {
                method: "DELETE"
            })
            console.log(res.status)
            if (res.status === 200) {
                props.change(true);
                setMessage("Successfully deleted")
            } else {
                setMessage("Some error occured");
            }
        }
        catch (err) {
            setMessage("Error")
        }
    }
    return (
        <div>
            {confirmed ?
                <div><h1>{message}</h1></div>
                : <div>
                    <h2>Do you really want to delete?</h2>
                    <button onClick={finalDelete}>Yes</button>
                    <button
                    // onClick={e => setConfirmed(false)}
                    >No</button>
                </div>
            }
        </div>
    )
}
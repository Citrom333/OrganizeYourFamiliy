import { useState } from "react";
import "../Style.css"
function AddMember() {
    let avatarPics = [];
    for (let i = 1; i < 63; i++) {
        if (i < 10) {
            avatarPics.push(`../images/avatar0${i}.png`)
        }
        else {
            avatarPics.push(`../images/avatar${i}.png`)
        }
    };
    const [name, setName] = useState("");
    const [password1, setPassword1] = useState("");
    const [password, setPassword] = useState("confirmation");
    const [birthDate, setBirthdate] = useState("");
    const [familyRole, setFamilyRole] = useState("");
    const [chosenPic, setChosenPic] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`name: ${name}, password: ${password}, birthDate: ${birthDate}, familyRole: ${familyRole}, chosenPic: ${chosenPic}`);
        try {
            let res = await fetch("/api/User", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    name: name,
                    password: password,
                    familyRole: familyRole,
                    birthday: birthDate.split(".").join("-"),
                    familyId: localStorage.getItem("familyId"),
                    avatarPic: chosenPic
                }),
            });
            if (res.status === 200) {
                setName("");
                setPassword("");
                setPassword1("");
                setBirthdate("");
                setChosenPic("");
                setMessage("User created successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch (err) {
            setMessage(err);
        }
    };
    return (
        <>
            <div>
                <form className="form" onSubmit={handleSubmit}>
                    <h1>New member</h1>
                    <label>
                        <p>Name</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Member pin</p>
                        <input
                            onChange={(e) => setPassword1(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Member pin confirmation</p>
                        <input
                            onChange={(e) => e.target.value === password1 ? setPassword(e.target.value) : setMessage("The passwords are different")}
                        />
                    </label>
                    <label>
                        <p>Date of birth</p>
                        <input
                            type="date"
                            onChange={(e) => setBirthdate(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Family role</p>
                        <select onChange={(e) => setFamilyRole(e.target.value)}>
                            <option value=""></option>
                            <option value={0}>Adult</option>
                            <option value={1}>Child</option>
                        </select>
                    </label>
                    <label>
                        <p>Choose an avatar picture</p>
                        <div className="avatarPics">
                            {avatarPics.map((pic, index) =>
                                <div key={index} >
                                    <img
                                        className="avatarPic"
                                        id={chosenPic === pic ? "chosenPicture" : ""}
                                        src={pic}
                                        onClick={() => setChosenPic(pic)}>
                                    </img>
                                </div>)}
                        </div>
                    </label>
                    <div>
                        <input className="submit" type="submit" value="Add member" />
                    </div>
                </form>
                <div><p>{message}</p></div>
                <div>
                    <a href="/MainFamilyPage">
                        <button >
                            Back
                        </button>
                    </a>
                </div>
            </div>

        </>
    )
}

export default AddMember;        
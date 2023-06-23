import { useNavigate } from "react-router-dom";
import { useState } from "react";
function SignUp() {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === "" || password === "" || password2 === "") {
            message === "" ? setMessage("Please fill the fields correctly") : "";
        }
        else {
            try {
                let res = await fetch("/api/Family", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        password: password2,
                        familyMembers: []
                    }),
                });
                if (res.status === 200) {
                    setName("");
                    setPassword("");
                    setPassword2("");
                    setMessage("Family created successfully");
                } else {
                    setMessage("Some error occured");
                }
            } catch (err) {
                console.log(err);
            }
        }
    };
    const handlePasswordConfim = (e) => {
        if (e.target.value === password) {
            setPassword2(e.target.value)
            setMessage("")
        }
        else {
            setMessage("The passwords are different")
        }
    }
    return (
        <>
            <div>
                <h1>Sign up</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label>
                        <p>Family identifier</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Family password</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Confirm password</p>
                        <input
                            onChange={handlePasswordConfim}
                        />
                    </label>
                    <div >
                        <input className="submit" type="submit" value="Sign up" />
                    </div>
                    <div><p>{message}</p></div>
                </form>
                <div>
                    <a href="/">
                        <button >
                            Back
                        </button>
                    </a>
                </div>
            </div>

        </>
    )
}

export default SignUp
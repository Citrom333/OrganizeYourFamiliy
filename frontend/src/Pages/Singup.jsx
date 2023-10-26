import data from "../translator.json"
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import passwordValidator from "../CostumHooks/passwordValidator";
function SignUp() {
    const [language, setLanguage] = useOutletContext();
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === "" || password === "" || password2 === "") {
            message === "" ? setMessage(data["Please fill the fields correctly"][language]) : "";
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
                        familyMembers: [],
                        rewards: []
                    }),
                });
                if (res.status === 200) {
                    setName("");
                    setPassword("");
                    setPassword2("");
                    setMessage(data["Family created successfully"][language]);
                } else {
                    setMessage(data["Some error occured"][language]);
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
            setMessage(data["The passwords are different"][language])
        }
    }
    return (
        <>
            <div>
                <h1>{data["Sign up"][language]}</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label>
                        <p>{data["Family identifier"][language]}</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>{data["Family password (Min. 6 characters letters and numbers)"][language]}</p>
                        <input
                            onChange={(e) => passwordValidator(e, setMessage, "family", setPassword, language)}
                            type="password"
                        />
                    </label>
                    <label>
                        <p>{data["Confirm password"][language]}</p>
                        <input
                            onChange={handlePasswordConfim}
                            type="password"
                        />
                    </label>
                    <div >
                        <input className="submit" type="submit" value="Sign up" />
                    </div>
                    <div><p>{message}</p></div>
                </form>
                <div>
                    <a href="/">
                        <button className="candyButton">
                            {data["Back"][language]}
                        </button>
                    </a>
                </div>
            </div>

        </>
    )
}

export default SignUp
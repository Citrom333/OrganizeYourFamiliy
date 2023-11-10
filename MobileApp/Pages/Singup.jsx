import data from "../translator.json"
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import passwordValidator from "../CostumHooks/passwordValidator";
import fetchGetAll from "../CostumHooks/fetchGetAll";
function SignUp() {
    const [language, setLanguage] = useOutletContext();
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [families, setFamilies] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === "" || password === "" || password2 === "") {
            message === "" ? setMessage(data["Please fill the fields correctly"][language]) : "";
        }
        else if (families.map(fam => fam.name).includes(name)) { setMessage(data["This name is already used"][language]) }
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
                setMessage(data["ERROR"][language]);
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
    useEffect(() => {
        fetchGetAll("families", setFamilies);
        setMessage("");
    }, [families.length, language])
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
                        <p>{data["Family password"][language]}  {data["Min6chars"][language]} </p>
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
                        <input className="submit" type="submit" value={data["Sign up"][language]} />
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
import data from "../translator.json"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import loginFunction from "../CostumHooks/loginFunction";
function Login() {
    const [language, setLanguage] = useOutletContext();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [logintry, setLogintry] = useState(false)
    useEffect(() => {
        localStorage.clear();
        if (logintry) {
            loginFunction(name, language, setMessage, password, navigate);
        }

    }, [message, logintry]);
    return (
        <>
            <div>
                <h1>{data["Login"][language]}</h1>
                <label>
                    <p>{data["Family identifier"][language]}</p>
                    <input
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    <p>{data["Family password"][language]}</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                </label>
                <div>
                    <button onClick={() => setLogintry(true)}>
                        {data["Login"][language]}
                    </button>
                </div>
                <p>{message}</p>
                <div>
                    <a href="/">
                        <button >
                            {data["Back"][language]}
                        </button>
                    </a>
                </div>
            </div>

        </>
    )
}

export default Login



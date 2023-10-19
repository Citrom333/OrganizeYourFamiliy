import data from "../translator.json"
import { useNavigate } from "react-router-dom"
import { useState } from "react";

function Login() {
    const [language, setLanguage] = useState(localStorage.getItem("language"));
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const fetchFamilyId = async () =>
        await fetch(`/api/Family/${localStorage.getItem("familyName")}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                localStorage.setItem("familyId", json.id);
                localStorage.setItem("leader", json.leaderOfFamilyId);
                localStorage.setItem("language", language);
            });
    const fetchLogin = async (familyname, password) => {
        await fetch("/api/Family/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: familyname, password: password }),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("familyName", data.name);
                data == null
                    ? navigate("/")
                    : navigate("/MainFamilyPage");
            });
    };
    const handleLogin = async () => {
        localStorage.clear();
        await fetchLogin(name, password);
        await fetchFamilyId();
    }
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
                    <button onClick={handleLogin}>
                        {data["Login"][language]}
                    </button>
                </div>
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
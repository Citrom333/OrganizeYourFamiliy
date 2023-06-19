import { useNavigate } from "react-router-dom"
import { useState } from "react";

function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const fetchTest = () =>
        fetch("/api/Family", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                console.log(json);
            });
    const fetchLogin = (familyname, password) => {
        fetch("/api/Family/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: familyname, password: password }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                localStorage.setItem("familyName", data.name);
                data == null
                    ? navigate("/")
                    : navigate("/MainFamilyPage");
            });
    };
    const handleLogin = () => {
        console.log(name);
        console.log(password);
        localStorage.clear();
        fetchTest();
        fetchLogin(name, password);
    }
    return (
        <>
            <div>
                <h1>Login</h1>
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
                <div>
                    <button onClick={handleLogin}>
                        Login
                    </button>
                </div>
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

export default Login
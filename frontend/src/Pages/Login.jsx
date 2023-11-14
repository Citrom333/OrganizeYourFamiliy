import data from "../translator.json"
import route from "../backendRoute.json"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
function Login() {
    const [language, setLanguage] = useOutletContext();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const fetchFamilyId = async () => {
        await fetch(`${route.api}/Family/${name}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                localStorage.setItem("familyId", json.id);
                localStorage.setItem("leader", json.leaderOfFamilyId);
                localStorage.setItem("language", language);
            });
    };
    const fetchLogin = async (familyname, password) => {
        try {
            const result = await fetch(`${route.api}/Family/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: familyname, password: password }),
            })
                .then((response) => {
                    if (response.status !== 200) {
                        setMessage(data["Wrong login details"][language]);
                        return null;
                    }
                    else return response.json()
                })
                .then((data) => {
                    if (data != null)
                        localStorage.setItem("familyName", data.name);
                    else setMessage(data["Wrong login details"][language]);
                    return data != null;
                });
            return result;
        }
        catch (error) {
            console.log(error)
            return false;
        }
    };
    const handleLogin = async () => {
        localStorage.clear();
        let success = await fetchLogin(name, password);
        if (!success) {
            setMessage(data["Wrong login details"][language]);
        }
        else {
            await fetchFamilyId();
            navigate("/MainFamilyPage");
        }
    };
    useEffect(() => {

    }, [message]);
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
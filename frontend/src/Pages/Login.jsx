import data from "../translator.json"
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
        await fetch(`https://familyorganizer.xyz:7176/Family/${name}`, {
            // await fetch(`http://146.190.206.130:7176/Family`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                console.log(json);
                localStorage.setItem("familyId", json.id);
                localStorage.setItem("leader", json.leaderOfFamilyId);
                localStorage.setItem("language", language);
            });
    };
    const testFetch = async () => {
        const result = await fetch('https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'cee3bd1e22msheedb98e87dec740p196316jsn6d22f5917037',
                'X-RapidAPI-Host': 'quotes-by-api-ninjas.p.rapidapi.com'
            }
        })
            .then(response => response.json())
            .then(data => {
                setMessage(data[0].quote);
                return true
            })
            .catch(error => { console.error(error); return false });
        return result
    };
    const fetchLogin = async (familyname, password) => {
        try {
            // const result = await fetch("http://localhost:7146/Family/login", {
            const result = await fetch("https://familyorganizer.xyz:7176/Family/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: "Rédei", password: "030713Roland" }),
            })
                .then((response) => {
                    console.log("Státusz:");
                    console.log(response.status);
                    if (response.status !== 200) {
                        setMessage(data["Wrong login details"][language]);
                        return null;
                    }
                    else return response.json()
                })
                .then((data) => {
                    console.log(data);
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
        let test = await testFetch();
        if (test) {
            let success = await fetchLogin(name, password);
            if (!success) {
                setMessage(data["Wrong login details"][language]);
            }
            else {
                setMessage("success");
                console.log("SUCCESS");
                await fetchFamilyId();
                navigate("/MainFamilyPage");
            }
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
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
    useEffect(() => {
        console.log(message.slice(1000, 5000));


    }, [message]);
    const fetchFamilyId = async () =>
        await fetch(`http://146.190.206.130:7176/Family/${localStorage.getItem("familyName")}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                localStorage.setItem("familyId", json.id);
                localStorage.setItem("leader", json.leaderOfFamilyId);
                localStorage.setItem("language", language);
            });
    const fetchLogin = async (familyname, password) => {
        console.log("now fetch");
        try {
            const resp = await fetch("http://146.190.206.130:7176/Family/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: "Rédei", password: "030713Roland" }),
                redirect: 'follow',
            });
            console.log(resp.status);
            if (resp.status !== 200) {
                console.log("2");
                setMessage(data["Wrong login details"][language]);
                return null;
            }
            setMessage(await resp.text());
            const fetchdata = "await resp.json();"
            console.log("3", fetchdata);

            if (fetchdata != null) {
                localStorage.setItem("familyName", fetchdata.name);
            } else {
                setMessage(data["Wrong login details"][language]);
            }

            console.log("4");
            return fetchdata != null;
        } catch (error) {
            console.error("Error during fetchLogin:", error);
            return null;
        }
        return await fetch("/api/Family/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({ name: familyname, password: password }),
            body: JSON.stringify({ name: "Rédei", password: "030713Roland" })
        })
            .then(async (response) => {
                setMessage("hello, " + await response.text());
                console.log(response.status);
                //     console.log(response.status);
                //     if (response.status !== 200) {
                //         console.log("2");
                //         setMessage(data["Wrong login details"][language]);
                //         return null;
                //     }
                //     else {

                //         console.log("HAHÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓÓ")
                //         return response.text();
                //     }
                // })
                // .then((fetchdata) => {
                //     console.log("3");
                //     console.log(fetchdata);
                //     if (fetchdata != null)
                //         localStorage.setItem("familyName", fetchdata.name);
                //     else setMessage(data["Wrong login details"][language]);
                //     console.log("4");
                return false;
            });
    };
    const handleLogin = async () => {
        localStorage.clear();
        let success = await fetchLogin(name, password);
        if (!success) {
            console.log(message.split("data)")[0]);
            // setMessage(data["Wrong login details"][language]);
        }
        else {
            await fetchFamilyId();
            // localStorage.setItem("familyName", name);
            // localStorage.setItem("familyId", "2");
            navigate("/MainFamilyPage");
        }
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
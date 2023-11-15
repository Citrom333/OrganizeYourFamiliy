import route from "../backendRoute.json";
import data from "../translator.json";

const fetchFamilyId = async (name, language) => {
    try {
        const response = await fetch(`${route.api}/Family/${name}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error(data["Wrong login details"][language]);
        }

        const json = await response.json();
        localStorage.setItem("familyId", json.id);
        localStorage.setItem("leader", json.leaderOfFamilyId);
        localStorage.setItem("language", language);

        return true;
    } catch (error) {
        console.error("Fetch Family Id Error:", error);
        return false;
    }
};

const fetchLogin = async (familyname, password, language, setMessage) => {
    try {
        const response = await fetch(`${route.api}/Family/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: familyname, password: password }),
        });

        if (!response.ok) {
            setMessage(data["Wrong login details"][language]);
            return false;
        }

        const data = await response.json();
        localStorage.setItem("familyName", data.name);
        localStorage.setItem("familyPassword", password);

        return true;
    } catch (error) {
        console.error("Fetch Login Error:", error);
        return false;
    }
};

const loginFunction = async (name, language, setMessage, password, navigate) => {
    const loginSuccess = await fetchLogin(name, password, language, setMessage);

    if (loginSuccess) {
        const familyIdSuccess = await fetchFamilyId(name, language);

        if (familyIdSuccess) {
            navigate("/MainFamilyPage");
        }
    }
};

export default loginFunction;
import data from "../translator.json";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import DateInput from "../Components/DateInput";
import passwordValidator from "../CostumHooks/passwordValidator";
export default function AddMember() {
    const [language, setLanguage] = useOutletContext();
    const [page, setPage] = useState(3);
    const [avatarPics, setAvatarpics] = useState([]);
    const [adult, setAdult] = useState(false);
    const [name, setName] = useState("");
    const [password1, setPassword1] = useState("");
    const [password, setPassword] = useState("confirmation");
    const [birthDate, setBirthdate] = useState("");
    const [familyRole, setFamilyRole] = useState("");
    const [chosenPic, setChosenPic] = useState("");
    const [message, setMessage] = useState("");
    useEffect(() => {
        let newList = [];
        for (let i = 1; i <= 9; i++) {
            newList.push(`../images/set${page}/avatar0${i}.png`);
        };
        setAvatarpics(newList);
        canBeAdult();
    }, [page, language, birthDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`name: ${name}, password: ${password}, birthDate: ${birthDate}, familyRole: ${familyRole}, chosenPic: ${chosenPic}`);
        try {
            let res = await fetch("/api/User", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    name: name,
                    password: password,
                    familyRole: familyRole,
                    birthday: birthDate.split(".").join("-"),
                    familyId: localStorage.getItem("familyId"),
                    avatarPic: chosenPic
                }),
            });
            if (res.status === 200) {
                setName("");
                setPassword("");
                setPassword1("");
                setBirthdate("");
                setChosenPic("");
                setMessage(data["Success"][language]);
            } else {
                setMessage(data["Some error occured"][language]);
            }
        } catch (err) {
            setMessage(data["ERROR"][language]);
            console.log(err);
        }
    };
    const handlePasswordConfim = (e) => {
        if (e.target.value === password1) {
            setPassword(e.target.value)
            setMessage("")
        }
        else {
            setMessage(data["The passwords are different"][language])
        }
    }
    const canBeAdult = () => {
        let date = new Date();
        if (birthDate !== "") {
            let bDay = new Date(birthDate);
            var age = date.getFullYear() - bDay.getFullYear();
            var m = date.getMonth() - bDay.getMonth();
            if (m < 0 || (m === 0 && date.getDate() < bDay.getDate())) {
                age--;
            }
            setAdult(age >= 16);
        }
    }
    return (
        <>
            <div>
                <form className="form" onSubmit={handleSubmit}>
                    <h1>{data["New member"][language]}</h1>
                    <div><p>{message}</p></div>
                    <label>
                        <p>{data["Name"][language]}</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>{data["Member pin (Min. 4 characters, just numbers)"][language]} </p>
                        <input
                            onChange={(e) => passwordValidator(e, setMessage, "member", setPassword1, language)}
                            type="password"
                        />
                    </label>
                    <label>
                        <p>{data["Member pin confirmation"][language]}</p>
                        <input
                            onChange={(e) => handlePasswordConfim(e)}
                            type="password"
                        />
                    </label>
                    <label>
                        <p>{data["Date of birth"][language]}</p>
                        <DateInput value={birthDate} selected={Date.parse(new Date(birthDate))} setter={setBirthdate} timeNeeded={false} language={language} />
                    </label>
                    <label>
                        <p>{data["Family role"][language]}</p>
                        <select onChange={(e) => setFamilyRole(e.target.value)}>
                            <option value=""></option>
                            {adult ? <option value={0}>{data["Adult"][language]}</option> : ""}
                            <option value={1}>{data["Child"][language]}</option>
                        </select>
                    </label>
                    <label>
                        <h3>{data["Choose an avatar picture"][language]}</h3>
                        <div className="pagination">
                            <img onClick={e => page > 1 ? setPage(page - 1) : ""} className={page === 1 ? "arrow left paginationElement inactive" : "arrow left paginationElement"} src="../images/arrow.png" />
                            <p className="pageNumber paginationElement">{page}</p>
                            <img onClick={e => page < 10 ? setPage(page + 1) : ""} className={page === 10 ? "arrow right paginationElement inactive" : "arrow right paginationElement"} src="../images/arrow.png" />
                        </div>
                        <div className="avatarPics">
                            {avatarPics.map((pic, index) =>
                                <div key={index} >
                                    <img
                                        className="avatarPic"
                                        id={chosenPic === pic ? "chosenPicture" : ""}
                                        src={pic}
                                        onClick={() => setChosenPic(pic)}>
                                    </img>
                                </div>)}
                        </div>
                    </label>
                    <div>
                        <input className="submit" type="submit" value={data["Add member"][language]} />
                    </div>
                </form>
                <div><p>{message}</p></div>
                <div>
                    <a href="/MainFamilyPage">
                        <button>
                            {data["Back"][language]}
                        </button>
                    </a>
                </div>
            </div>

        </>
    );
}

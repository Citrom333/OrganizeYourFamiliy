import data from "../translator.json";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import DateInput from "../Components/DateInput";
import passwordValidator from "../CostumHooks/passwordValidator";
export default function AddMember() {
    const [language, setLanguage] = useOutletContext();
    const [page, setPage] = useState(3);
    const [avatarPics, setAvatarpics] = useState([]);
    useEffect(() => {
        let newList = [];
        for (let i = 1; i <= 9; i++) {
            newList.push(`../images/set${page}/avatar0${i}.png`);
        };
        setAvatarpics(newList);
    }, [page, language]);
    const [name, setName] = useState("");
    const [password1, setPassword1] = useState("");
    const [password, setPassword] = useState("confirmation");
    const [birthDate, setBirthdate] = useState("");
    const [familyRole, setFamilyRole] = useState("");
    const [chosenPic, setChosenPic] = useState("");
    const [message, setMessage] = useState("");

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
            setMessage(err);
        }
    };
    return (
        <>
            <div>
                <form className="form" onSubmit={handleSubmit}>
                    <h1>{data["New member"][language]}</h1>
                    <label>
                        <p>{data["Name"][language]}</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>{data["Member pin"][language]}</p>
                        <input
                            onChange={(e) => setPassword1(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>{data["Member pin confirmation"][language]}</p>
                        <input
                            onChange={(e) => e.target.value === password1 ? setPassword(e.target.value) : setMessage("The passwords are different")}
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
                            <option value={0}>{data["Adult"][language]}</option>
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

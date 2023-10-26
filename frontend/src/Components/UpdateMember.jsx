import data from "../translator.json"
import React from 'react';
import { useState, useEffect } from 'react';
import DateInput from "./DateInput";
import passwordValidator from "../CostumHooks/passwordValidator";
const UpdateMember = (props) => {
    const language = localStorage.getItem("language");
    const [page, setPage] = useState(3);
    const [avatarPics, setAvatarpics] = useState([]);
    const [name, setName] = useState(props.toUpdate.name);
    const [password1, setPassword1] = useState(props.toUpdate.password);
    const [password, setPassword] = useState("confirmation");
    const [birthDate, setBirthdate] = useState(props.toUpdate.birthday);
    const [familyRole, setFamilyRole] = useState(props.toUpdate.familyRole);
    const [chosenPic, setChosenPic] = useState(props.toUpdate.avatarPic);
    const [changeAvatar, setChangeAvatar] = useState(false);
    const [message, setMessage] = useState("");
    useEffect(() => {
        let newList = [];
        for (let i = 1; i <= 9; i++) {
            newList.push(`../images/set${page}/avatar0${i}.png`);
        };
        setAvatarpics(newList);
    }, [page, language]);
    const fetchUpdateMember = async () => {
        try {
            let res = await fetch("/api/User", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: props.toUpdate.id,
                    name: name,
                    password: password,
                    familyRole: familyRole,
                    birthday: birthDate.split(".").join("-"),
                    familyId: localStorage.getItem("familyId"),
                    avatarPic: chosenPic
                }),
            });
            if (res.status === 200) {
                setMessage(data["Success"][language]);
                props.change(true);
            } else {
                setMessage(data["Some error occured"][language]);
            }
        } catch (err) {
            setMessage(err);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchUpdateMember();
    };

    return (
        <>
            <div>
                {changeAvatar ? <> <div className="pagination ">
                    <img onClick={e => page > 1 ? setPage(page - 1) : ""} className={page === 1 ? "arrow left paginationElement inactive" : "arrow left paginationElement"} src="../images/arrow.png" />
                    <p className="pageNumber paginationElement">{page}</p>
                    <img onClick={e => page < 10 ? setPage(page + 1) : ""} className={page === 10 ? "arrow right paginationElement inactive" : "arrow right paginationElement"} src="../images/arrow.png" />
                </div>
                    <div className="avatarPics wrapper">
                        {avatarPics.map((pic, index) => <div key={index}>
                            <img
                                className="avatarPic"
                                id={chosenPic === pic ? "chosenPicture" : ""}
                                src={pic}
                                onClick={() => setChosenPic(pic)}>
                            </img>
                        </div>)}
                    </div>
                    <button onClick={e => setChangeAvatar(false)}>{data["Back"][language]}</button></> :
                    <div>
                        <form className="form" onSubmit={handleSubmit}>
                            <h1>{data["Update"][language]}</h1>
                            <div><p>{message}</p></div>

                            <label>
                                <p>{data["Name"][language]}</p>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </label>
                            <label>
                                <p>{data["Member pin"][language]}</p>
                                <input
                                    onChange={(e) => passwordValidator(e, setMessage, "member", setPassword1, language)}
                                    type="password"
                                />
                            </label>
                            <label>
                                <p>{data["Date of birth"][language]}</p>
                                <DateInput value={birthDate.split("T")[0]} selected={new Date(Date.parse(birthDate))} setter={setBirthdate} timeNeeded={false} language={language} />
                            </label>
                            <label>
                                <p>{data["Family role"][language]}</p>
                                <select onChange={(e) => setFamilyRole(e.target.value)}>
                                    <option value={familyRole}></option>
                                    <option value={0}>{data["Adult"][language]}</option>
                                    <option value={1}>{data["Child"][language]}</option>
                                </select>
                            </label>
                            <label >
                                <div className="centralize">
                                    <h3>{data["Choose an avatar picture"][language]}</h3>
                                    <div> <img
                                        className="avatarPic"
                                        id={chosenPic}
                                        src={chosenPic}
                                        onClick={() => setChangeAvatar(true)}>
                                    </img></div>
                                </div>
                            </label>
                            <div>
                                <input className="submit" type="submit" value={data["Update"][language]} />
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
                    </div>}
            </div>
        </>
    );
};

export default UpdateMember;
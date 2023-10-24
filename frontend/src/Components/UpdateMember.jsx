import data from "../translator.json"
import React from 'react';
import { useState, useEffect } from 'react';
import ReactDatePicker from "react-datepicker";
import { enGB, fr, de, it, es, } from 'date-fns/esm/locale';
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const UpdateMember = (props) => {
    registerLocale('English', enGB);
    registerLocale("Français", fr);
    registerLocale("Español", es);
    registerLocale("Italiano", it);
    registerLocale("Deutsch", de);
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
        console.log(birthDate.split("T")[0]);
        console.log(new Date(Date.parse(birthDate)));
        let newList = [];
        for (let i = 1; i <= 9; i++) {
            newList.push(`../images/set${page}/avatar0${i}.png`);
        };
        setAvatarpics(newList);
    }, [page, language]);
    const fetchUpdateMember = async () => {
        // console.log(`id: ${props.toUpdate.id}, name: ${name}, start: ${start}, end: ${end}, place: ${place}, cost: ${cost}, participants: ${participants.map(participant => participant.id)}`)
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
                            <label>
                                <p>{data["Name"][language]}</p>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </label>
                            <label>
                                <p>{data["Member pin"][language]}</p>
                                <input
                                    value={password1}
                                    onChange={(e) => setPassword1(e.target.value)} />
                            </label>
                            <label>
                                <p>{data["Date of birth"][language]}</p>
                                {language === "Hungarian" ?
                                    <input
                                        value={birthDate.split("T")[0]}
                                        type="date"
                                        onChange={(e) => setBirthdate(e.target.value)}
                                    /> :
                                    <ReactDatePicker
                                        selected={new Date(Date.parse(birthDate))}
                                        onChange={(date) => setBirthdate(date)}
                                        dateFormat={language === "Deutsch" ? "yyyy.MM.dd " : "dd.MM.yyyy "}
                                        locale={language}
                                    />}
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
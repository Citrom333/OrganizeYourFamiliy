import data from "../translator.json"
import { useState, useEffect } from "react";
import postTodo from "../CostumHooks/postTodo";
import fetchRewardpoints from "../CostumHooks/fetchRewardpoints";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
export default function RewardShop(props) {
    const [language, setLanguage] = useOutletContext();
    const navigate = useNavigate();
    let userId = localStorage.getItem("userId");
    const [user, setUser] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const handleCheckboxChange = (option) => {
        setSelectedOption(option);
    };
    const rewards = { "Choose dinner for next friday": 300, "Popcorn after dinner": 300, "Exchange 500 to pocket money": 500, "Exchange 1000 to pocket money": 1000, "30 minutes of X-Box": 1000, "20 minutes playing on cellpohone": 1000, "Invite a friend to sleepover": 3000 };
    const fetchUser = async () =>
        await fetch(`/api/User/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setUser(json);

            });
    useEffect(() => {
        if (localStorage.getItem("isAdult") == "true") {
            navigate("/Wrongpage");
        }
        fetchUser();

    }, [])
    const sendExchangeToLeader = async () => {
        await postTodo(`${data["Add reward to "][language]}${localStorage.getItem("userName")}`, selectedOption, new Date(), 3, 0, localStorage.getItem("leader"))
    }
    const handleRemovingpoints = (price) => {
        let pointToRemoveFromHousework = 0;
        let pointToRemoveFromSchool = 0;
        let pointToRemoveFromJob = 0;
        let pointToRemoveFromOther = 0;
        while (price > 0) {
            if (user.rewardPointHousework > pointToRemoveFromHousework && price > 0) {
                pointToRemoveFromHousework++;
                price--;
            }
            if (user.rewardPointSchool > pointToRemoveFromSchool && price > 0) {
                pointToRemoveFromSchool++;
                price--;
            }
            if (user.rewardPointJob > pointToRemoveFromJob && price > 0) {
                pointToRemoveFromJob++;
                price--;
            }
            if (user.rewardPointOther > pointToRemoveFromOther && price > 0) {
                pointToRemoveFromOther++;
                price--;
            }
        }
        let pointsToRemove = [pointToRemoveFromHousework, pointToRemoveFromSchool, pointToRemoveFromJob, pointToRemoveFromOther]
        return pointsToRemove;
    }

    const handleSubmit = async () => {
        for (let i = 0; i < handleRemovingpoints(rewards[selectedOption]).length; i++) {
            await fetchRewardpoints(-1, handleRemovingpoints(rewards[selectedOption])[i], i);
        }
        sendExchangeToLeader();
    }
    const points = user.rewardPointHousework + user.rewardPointJob + user.rewardPointSchool + user.rewardPointOther;
    return (
        <div>
            <h3>{data["You can spend your points to rewards"][language]}</h3>
            <p>{data["You have "][language]}{points} {data["total rewardpoints"][language]}</p>
            <div className="shopitems">
                {Object.keys(rewards).map((key, index) => (
                    <div className={`shopitem ${points < rewards[key] ? "disabled" : ""}`}>
                        <label>
                            <input
                                disabled={points < rewards[key]}
                                type="checkbox"
                                checked={selectedOption === key}
                                onChange={() => handleCheckboxChange(key)}
                            />
                            {key} : {rewards[key]} {data["points"][language]}
                        </label>
                    </div>
                ))}
            </div>
            <p>{data["Selected Option: "][language]}{selectedOption}</p>
            <button onClick={handleSubmit}>{data["Submit"][language]}</button>
            <div> <a href="/MainFamilyPage/MyPage"><button>{data["Back"][language]}</button></a></div>

        </div>
    );
};


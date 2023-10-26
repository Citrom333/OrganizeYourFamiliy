import data from "../translator.json"
import { useState, useEffect } from "react";
import postTodo from "../CostumHooks/postTodo";
import fetchRewardpoints from "../CostumHooks/fetchRewardpoints";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import fetchGetAll from "../CostumHooks/fetchGetAll";
export default function RewardShop(props) {
    const [language, setLanguage] = useOutletContext();
    const navigate = useNavigate();
    let userId = localStorage.getItem("userId");
    let familyId = localStorage.getItem("familyId");
    const [user, setUser] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [message, setMessage] = useState("");
    const [change, setChange] = useState(false);
    const handleCheckboxChange = (option) => {
        setSelectedOption(option);
    };
    const [rewards, setRewards] = useState([]);
    useEffect(() => {
        if (localStorage.getItem("isAdult") == "true") {
            navigate("/Wrongpage");
        }
        fetchGetAll("rewards", setRewards, `/${familyId}`);
        fetchGetAll("members", setUser, `/${userId}`);
        setChange(false);
    }, [change])
    const sendExchangeToLeader = async () => {
        await postTodo(`${data["Add reward to "][language]}${localStorage.getItem("userName")}`, selectedOption.name, new Date(), 3, 0, localStorage.getItem("leader"))
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
        if (localStorage.getItem("leader") === undefined) {
            setMessage(data["There is no leader of the family, You can' exchange rewards at the moment."][language]);
        }
        else {
            for (let i = 0; i < handleRemovingpoints(selectedOption.cost).length; i++) {
                await fetchRewardpoints(-1, handleRemovingpoints(selectedOption.cost)[i], i);
            }
            sendExchangeToLeader();
            setMessage(data["Reward request was sent."][language])
            setChange(true);
        }

    }
    const points = user.rewardPointHousework + user.rewardPointJob + user.rewardPointSchool + user.rewardPointOther;
    return (
        <div>
            <h3>{data["You can spend your points to rewards"][language]}</h3>
            <p>{data["You have "][language]}{points} {data["total rewardpoints"][language]}</p>
            <div className="shopitems">
                {rewards.sort((a, b) => a.cost - b.cost).map(reward => (
                    <div key={reward.id} className={`shopitem ${points < reward.cost ? "disabled" : ""}`}>
                        <label>
                            <input
                                className="checkbox"
                                disabled={points < reward.cost}
                                type="checkbox"
                                checked={selectedOption === reward}
                                onChange={() => handleCheckboxChange(reward)}
                            />
                            {reward.name} : {reward.cost} {data["points"][language]}
                        </label>
                    </div>
                ))};
            </div>
            <p>{data["Selected Option: "][language]}{selectedOption == "" ? "" : selectedOption.name}</p>
            <button className="candyButton" onClick={handleSubmit}>{data["Submit"][language]}</button>
            <div> <a href="/MainFamilyPage/MyPage"><button className="candyButton">{data["Back"][language]}</button></a></div>
            <p>{message}</p>
        </div>
    );
};


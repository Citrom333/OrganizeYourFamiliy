import { useState, useEffect } from "react";
export default function RewardShop() {
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
        fetchUser();

    }, [])
    const fetchRewardpoints = async () => {
        let point = -1 * rewards[selectedOption];
        try {
            let res = await fetch(`/api/user/RewardPoint/${localStorage.getItem("userId")}/${point}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: props.toDo.type.toString(),
            });
            if (res.status === 200) {
                console.log("Reward added");
            } else {
                console.log("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }
    }
    const handleSubmit = () => {
        fetchRewardpoints();
    }
    const points = user.rewardPointHousework + user.rewardPointJob + user.rewardPointSchool + user.rewardPointOther;
    return (
        <div>
            <h3>You can spend your points to rewards</h3>
            <p>You have {points} total rewardpoints</p>
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
                            {key} : {rewards[key]} points
                        </label>
                    </div>
                ))}
            </div>
            <p>Selected Option: {selectedOption}</p>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};


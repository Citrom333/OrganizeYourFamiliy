import data from "../translator.json"
import route from "../backendRoute.json"
export default async function fetchRewardpoints(multiplier, rewardpoint, type) {
    const language = localStorage.getItem("language");
    let point = multiplier * rewardpoint;
    try {
        let res = await fetch(`${route.api}/user/RewardPoint/${localStorage.getItem("userId")}/${point}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: type.toString(),
        });
        if (res.status === 200) {
            console.log(data["Reward added"][language]);
        } else {
            console.log(data["Some error occured"][language]);
        }
    } catch (err) {
        console.log(err);
    }
}
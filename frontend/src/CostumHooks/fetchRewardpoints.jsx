export default async function fetchRewardpoints(multiplier, rewardpoint, type) {
    let point = multiplier * rewardpoint;
    try {
        let res = await fetch(`/api/user/RewardPoint/${localStorage.getItem("userId")}/${point}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: type.toString(),
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
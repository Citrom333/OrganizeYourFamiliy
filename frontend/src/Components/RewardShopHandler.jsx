import data from "../translator.json"
import { useState, useEffect } from "react";
import fetchGetAll from "../CostumHooks/fetchGetAll";
export default function RewardShopHandler() {
    const language = localStorage.getItem("language");
    const [message, setMessage] = useState("")
    const [creator, setCreator] = useState(false);
    const [updater, setUpdater] = useState(false);
    const [deleter, setDeleter] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [rewards, setRewards] = useState([]);
    const [selected, setSelected] = useState("");
    const [rewardName, setRewardName] = useState("");
    const [rewardCost, setRewardCost] = useState("");
    const [changed, setChanged] = useState(false);
    const familyId = localStorage.getItem("familyId");

    const deleteReward = async () => {
        setConfirmed(true);
        try {
            let res = await fetch(`/api/Reward/${selected.id}`, {
                method: "DELETE"
            })
            console.log(res.status)
            if (res.status === 200) {
                setMessage(data["Successfully deleted"][language])
                setConfirmed(true);
                setSelected("");
                setChanged(true);
            } else {
                setMessage(data["Some error occured"][language]);
            }
        }
        catch (err) {
            setMessage(data["Error"][language])
        }
    };
    const updateReward = async (e) => {
        e.preventDefault();
        setUpdater(false);
        setChanged(true);
        try {
            const response = await fetch(`/api/Reward/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "id": selected.id,
                    "name": rewardName,
                    "cost": parseInt(rewardCost),
                    "familyId": parseInt(familyId)
                }),
            });
            if (response.ok) {
                setRewardName("");
                setRewardCost("");
                setSelected("");
                return response;
            } else {
                throw new Error(`Error status: ${response.status}`);
            }
        } catch (error) {
            throw error;
        };
    };
    const createReward = async (e) => {
        e.preventDefault();
        setChanged(true);
        setCreator(false);
        try {
            const response = await fetch(`/api/Reward`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "name": rewardName,
                    "cost": parseInt(rewardCost),
                    "familyId": parseInt(familyId)
                }),
            });
            if (response.ok) {
                setRewardName("");
                setRewardCost("");
                setMessage(data["New reward added"][language])
                return response;
            } else {
                throw new Error(`Error status: ${response.status}`);
            }
        } catch (error) {
            throw error;
        }
    };
    useEffect(() => {
        fetchGetAll("rewards", setRewards, `/${parseInt(familyId)}`);
        setChanged(false);
    }, [rewards.length, selected, creator, changed])
    return (
        <div>
            {creator ?
                <div >
                    <h2>{data["Create new reward"][language]}</h2>
                    <form onSubmit={createReward}>
                        <label> <p>{data["Name"][language]}</p><input onChange={e => setRewardName(e.target.value)} /></label>
                        <label> <p>{data["Cost"][language]}</p><input onChange={e => setRewardCost(e.target.value)} /></label>
                        <div>
                            <label><input className="submit" type="submit" value={data["Add new reward"][language]} /></label>
                        </div>
                    </form>
                </div> :
                updater ?
                    <div>
                        <form onSubmit={updateReward}>
                            <label> <p>{data["Name"][language]}</p><input value={rewardName} onChange={e => setRewardName(e.target.value)} /></label>
                            <label> <p>{data["Cost"][language]}</p><input value={rewardCost} onChange={e => setRewardCost(e.target.value)} /></label>
                            <div>
                                <label><input className="submit" type="submit" value={data["Update reward"][language]} /></label>
                            </div>
                        </form>
                    </div> :
                    deleter ?
                        <div>
                            {confirmed ?
                                <div>
                                </div>
                                : <div>
                                    <h2>{data["Do you really want to delete?"][language]}</h2>
                                    <button onClick={deleteReward}>{data["Yes"][language]}</button>
                                    <button
                                        onClick={e => { setDeleter(false); setSelected("") }}
                                    >{data["No"][language]}</button>
                                </div>
                            }
                        </div> :
                        <div>
                            {rewards.length > 0 ?
                                <div>
                                    <h1> </h1>
                                    <h2>{data["Theese are the rewards:"][language]}</h2>
                                    <div >
                                        {rewards.map(reward => <div key={reward.id} className="gridContainer"><p className="grindContent">{reward.name} {data["for"][language]} {reward.cost} {data["points"][language]}{data["ért"][language]} </p><button className="grindContent gridbutton" onClick={e => { setUpdater(true); setSelected(reward); setRewardName(reward.name); setRewardCost(reward.cost) }}>{data["Update"][language]}</button><button className="grindContent gridbutton" onClick={e => { setDeleter(true); setSelected(reward) }}>{data["Delete"][language]}</button></div>)}</div>
                                </div> :
                                <div>
                                    <h1> </h1>
                                    <h3>{data["Your family doesn't have any rewards yet. Create some to motivate the children!"][language]}</h3>
                                </div>}
                            <button onClick={e => setCreator(true)}>{data["Create new reward"][language]}</button>
                        </div>}
            <p>{message}</p>
        </div>
    )
}
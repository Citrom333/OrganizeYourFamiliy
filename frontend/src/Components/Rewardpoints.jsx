import { useState, useEffect } from "react";
export default function Rewardpoints(props) {


    return (
        <div>
            <h2>Rewardpoints</h2>
            <div className="rewardpoints">
                <h3 className="point">Housework: {props.user.rewardPointHousework}</h3>
                <h3 className="point">Job: {props.user.rewardPointJob}</h3>
                <h3 className="point">School: {props.user.rewardPointSchool}</h3>
                <h3 className="point">Other: {props.user.rewardPointOther}</h3>
            </div>
            <a href="/MainFamilyPage/RewardShop"><button>Go shop some reward</button></a>
        </div>
    )
}
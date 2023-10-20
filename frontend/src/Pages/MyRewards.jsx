import data from "../translator.json"
import { useOutletContext } from "react-router-dom";
function MyRewards() {
    const [language, setLanguage] = useOutletContext();

    return (
        <>
            <div>
                <h1>Month (Pagination)</h1>
                <label>
                    <p>Rewards</p>

                </label>

                <div>
                    <a href="/MainFamilyPage/MyPage">
                        <button >
                            Back
                        </button>
                    </a>
                </div>
            </div>

        </>
    )
}

export default MyRewards
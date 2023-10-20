import data from "../translator.json"
import { useOutletContext } from "react-router-dom";
export default function WrongPage() {
    const [language, setLanguage] = useOutletContext();
    return (
        <div>
            <h1>{data["Wrong page"][language]}</h1>
            <a href="/MainFamilyPage"><button>{data["Back to main page"][language]}</button></a>
        </div>
    )
}
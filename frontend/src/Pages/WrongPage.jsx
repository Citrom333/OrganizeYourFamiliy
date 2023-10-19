import data from "../translator.json"
export default function WrongPage() {
    const language = localStorage.getItem("language");
    return (
        <div>
            <h1>{data["Wrong page"][language]}</h1>
            <a href="/MainFamilyPage"><button>{data["Back to main page"][language]}</button></a>
        </div>
    )
}
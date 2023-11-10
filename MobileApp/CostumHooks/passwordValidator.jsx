import data from "../translator.json";
export default function passwordValidator(e, setMessage, passwordType, setPassword, language) {
    let minLength = passwordType === "family" ? 6 : 4;
    let number = false;
    let letter = false;
    if (e.target.value.length < minLength) {
        setMessage(`${data["passwordLength1"][language]} ${minLength} ${data["passwordLength2"][language]}`);
    }
    else {
        for (let i = 0; i < e.target.value.length; i++) {
            if (!isNaN(e.target.value[i])) {
                number = true;
            }
            if (typeof e.target.value[i] === 'string' && isNaN(e.target.value[i])) {
                letter = true;
            }
        }
        if ((passwordType !== "family" && number && !letter) || (passwordType === "family" && number && letter)) {
            setPassword(e.target.value);
            setMessage(data["Good password"][language]);
        }
        else setMessage(passwordType === "family" ? data["Password must contain at least one number and one letter"][language] : data["Password must only contain numbers"][language]);
    }
}
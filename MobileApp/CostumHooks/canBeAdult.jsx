export default function canBeAdult(setAdult, birthDate) {
    let date = new Date();
    if (birthDate !== "") {
        let bDay = new Date(birthDate);
        var age = date.getFullYear() - bDay.getFullYear();
        var m = date.getMonth() - bDay.getMonth();
        if (m < 0 || (m === 0 && date.getDate() < bDay.getDate())) {
            age--;
        }
        setAdult(age >= 16);
    };
};
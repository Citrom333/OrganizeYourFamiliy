export default function isWinterTime() {
    let dateNow = new Date();
    if (dateNow > thisYearsAutumnChangeDate || dateNow < thisYearsSummerChangeDate) {
        return true;
    }
    return false;
}
const thisYearsAutumnChangeDate = (dateNow) => {
    const sundaysInOctober = [];
    for (let i = 24; i <= 31; i++) {
        let date = new Date(dateNow.getFullYear(), dateNow.getMonth(), i, 3, 0, 0);
        if (date.getDay() === 0) {
            sundaysInOctober.push(date)
        }
    }
    return sundaysInOctober[sundaysInOctober.length - 1];
}
const thisYearsSummerChangeDate = (dateNow) => {
    const sundaysInMarch = [];
    for (let i = 24; i <= 31; i++) {
        let date = new Date(dateNow.getFullYear(), dateNow.getMonth(), i, 3, 0, 0);
        if (date.getDay() === 0) {
            sundaysInOctober.push(date)
        }
    }
    return sundaysInMarch[sundaysInMarch.length - 1];
}
import data from "../translator.json"
import ReactDatePicker from "react-datepicker";
import { enGB, fr, de, it, es, } from 'date-fns/esm/locale';
import { registerLocale } from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import isWinterTime from "../CostumHooks/handleWinterOrSummerTime";
registerLocale('English', enGB);
registerLocale("Français", fr);
registerLocale("Español", es);
registerLocale("Italiano", it);
registerLocale("Deutsch", de);
export default function DateInput({ value, selected, setter, timeNeeded, language }) {
    const [tempDate, setTempDate] = useState(selected);
    return (
        <>
            {language === "Hungarian" ?
                <input
                    value={value}
                    type={timeNeeded ? "datetime-local" : "date"}
                    onChange={(e) => setter(e.target.value)}
                />
                :
                <ReactDatePicker
                    selected={tempDate}
                    onChange={date => setTempDate(date)}
                    onBlur={() => {
                        const updatedDate = isWinterTime
                            ? new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate(), tempDate.getHours() + 1, tempDate.getMinutes())
                            : tempDate;
                        setter(updatedDate);
                    }}
                    dateFormat={timeNeeded && language === "Deutsch" ? "yyyy.MM.dd HH:mm" : timeNeeded && language != "Deutsch" ? "dd.MM.yyyy HH:mm" : !timeNeeded && language === "Deutsch" ? "yyyy.MM.dd " : "dd.MM.yyyy "}
                    timeInputLabel={data["Time"][language]}
                    showTimeInput={timeNeeded ? true : false}
                    locale={language}
                />
            }
        </>
    )
}
import data from "../translator.json"
import ReactDatePicker from "react-datepicker";
import { enGB, fr, de, it, es, } from 'date-fns/esm/locale';
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
registerLocale('English', enGB);
registerLocale("Français", fr);
registerLocale("Español", es);
registerLocale("Italiano", it);
registerLocale("Deutsch", de);
export default function DateInput({ value, selected, setter, timeNeeded, language }) {

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
                    selected={selected}
                    onChange={(date) => setter(date)}
                    dateFormat={timeNeeded && language === "Deutsch" ? "yyyy.MM.dd HH:mm" : timeNeeded && language != "Deutsch" ? "dd.MM.yyyy HH:mm" : !timeNeeded && language === "Deutsch" ? "yyyy.MM.dd " : "dd.MM.yyyy "}
                    timeInputLabel={data["Time"][language]}
                    showTimeInput={timeNeeded ? true : false}
                    locale={language}
                />
            }
        </>
    )
}
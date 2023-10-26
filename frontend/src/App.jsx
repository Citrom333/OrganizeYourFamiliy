import data from "./translator.json"
import './App.css'
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import "./Flags.css"
function App() {
  const [language, setLanguage] = useState(localStorage.getItem("language") ? localStorage.getItem("language") : "English");
  const [showFlags, setShowFlags] = useState(false);
  const flags = ["English", "Hungarian", "Deutsch", "Français", "Italiano", "Español"]
  const location = useLocation();
  useEffect(() => {
    console.log(language);
    localStorage.setItem("language", language);
  }, [language]);
  return (
    <>
      <div className="flag-dropdown-content" onMouseEnter={() => setShowFlags(true)}
        onMouseLeave={() => setShowFlags(false)}>
        <img className="flag language" src={`../images/flags/${language}.png`} ></img>
        {showFlags ? flags.map(flag => <img key={flag} className={language === flag ? "flag hidden" : "flag other"} onClick={e => setLanguage(flag)} src={`../public/images/flags/${flag}.png`} ></img>) : ""}
      </div>
      <div>
        {location.pathname === "/" || location.pathname === "" ? <div>
          <h1>{data["HelloThisistheGreatFamilyOrganizer"][language]}</h1>
          <h3>{data["Doesyourfamilyhaveanaccount?"][language]}</h3>
          <a href="/login">
            <button type="button">{data["Log in"][language]}</button>
          </a>
          <h3>{data["If not, register now"][language]}</h3>
          <div>
            <a href="/signup">
              <button type="button">{data["Sign up"][language]}</button>
            </a>
          </div>
        </div> :
          <Outlet context={[language, setLanguage]} />
        }
      </div>

    </>
  )
}

export default App


import './App.css'
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';

function App() {
  const location = useLocation();
  // useEffect(() => {
  //   console.log(location);
  // }, []);
  return (
    <>
      <div>
        {location.pathname === "/" || location.pathname === "" ? <div>
          <h1>Hello! This is the Great Family Organizer</h1>
          <h3>Does your family have an account?</h3>
          <a href="/login">
            <button type="button">Log in</button>
          </a>
          <h3>If not, register now</h3>
          <div>
            <a href="/signup">
              <button type="button">Sign up</button>
            </a>
          </div>
        </div> :
          <Outlet />
        }
      </div>

    </>
  )
}

export default App

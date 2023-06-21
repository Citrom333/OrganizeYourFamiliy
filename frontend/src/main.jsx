import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Pages/Login.jsx';
import SignUp from './Pages/Singup.jsx';
import MainFamilyPage from './Pages/MainFamilyPage.jsx';
import AddMember from './Pages/AddFamilyMember.jsx';
import MyPage from './Pages/MyPage.jsx';
import MyRewards from './Pages/MyRewards.jsx';
import LoginAsFamilyMember from './Pages/LoginAsFamilyMember.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "MainFamilyPage",
        element: <MainFamilyPage />,
        children: [
          {
            path: "AddFamilyMember",
            element: <AddMember />
          },
          {
            path: "LoginAsFamilyMember",
            element: <LoginAsFamilyMember />
          },
          {
            path: "MyPage",
            element: <MyPage />
          },
          {
            path: "MyRewards",
            element: <MyRewards />
          },
        ]
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

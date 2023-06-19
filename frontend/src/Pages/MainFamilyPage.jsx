import { Outlet } from "react-router-dom"

function MainFamilyPage() {


    return (
        <>
            <div>
                <h1>This is my family</h1>
                <Outlet />
            </div>

        </>
    )
}

export default MainFamilyPage
import ToDos from "../Components/ToDos"
import Calendar from "../Components/Calendar"
function MyPage() {


    return (
        <>
            <div className="myPage">
                <h1>My page</h1>
                <ToDos />
                <Calendar />
            </div>

        </>
    )
}

export default MyPage
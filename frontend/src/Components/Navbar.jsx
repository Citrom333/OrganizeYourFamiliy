export default function Navbar() {

    return (
        <div>
            <div><p>This is {localStorage.getItem("familyName")} family</p></div>
            <div><h3>This is the Great Family Organizer</h3></div>
            <div> <a href="/MainFamilyPage/AddFamilyMember"><button>Add new member</button></a></div>
            {localStorage.ActualUser != null ?
                <div> <a href="/MyPage"><button>{localStorage.ActualUser}'s profile</button></a></div>
                :
                <div><a href="/MainFamilyPage/LoginAsFamilyMember"><button>Member login</button></a></div>}
            <div><button>Logout</button></div>
        </div>
    )
}
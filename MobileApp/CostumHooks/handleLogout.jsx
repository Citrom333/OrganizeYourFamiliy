export default async function handleLogout(navigate) {
    try {
        let res = await fetch("/api/Family/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            }),
        });
        if (res.status === 200) {
            localStorage.clear();
        } else {
            console.log(data["Some error occured"][language]);
        }
    } catch (err) {
        console.log(err);
    }
    navigate("/");
}
import route from "../backendRoute.json"
export default async function fetchGetAll(toGet, setter, param = "") {
    const routing = toGet === "rewards" ?
        "Reward" :
        toGet === "members" ?
            "User" :
            toGet === "todos" ?
                "ToDo" :
                toGet === "programs" ?
                    "ScheduledProgram" :
                    toGet === "families" ?
                        "Family" : "";
    let result = await fetch(`${route.api}/${routing}${param}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }).then((response) => response.json())
        .then((json) => {
            setter(json);
        });
};
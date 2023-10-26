export default async function fetchGetAll(toGet, setter, param = "") {
    const route = toGet === "rewards" ?
        "Reward" :
        toGet === "members" ?
            "User" :
            toGet === "todos" ?
                "ToDo" :
                toGet === "programs" ?
                    "ScheduledProgram" :
                    toGet === "families" ?
                        "Family" : "";
    let result = await fetch(`/api/${route}${param}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    }).then((response) => response.json())
        .then((json) => {
            setter(json);
        });
};
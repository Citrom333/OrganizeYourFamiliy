export default async function postTodo(taskName, description, deadline, toDoType, rewardPoint, userId) {
    try {
        const response = await fetch(`/api/ToDo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "taskName": taskName,
                "description": description,
                "deadline": deadline,
                "type": parseInt(toDoType),
                "rewardPoint": rewardPoint,
                "ready": false,
                "ownerID": userId
            }),
        });

        if (response.ok) {
            return response;
        } else {
            throw new Error(`Error status: ${response.status}`);
        }
    } catch (error) {
        throw error;
    }
}
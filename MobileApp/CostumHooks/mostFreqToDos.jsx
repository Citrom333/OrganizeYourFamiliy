export default function mostFreqToDos(todos) {
    let result = [];
    const frequencyMap = todos.reduce((map, todo) => {
        if (map[todo.taskName]) {
            map[todo.taskName]++;
        } else {
            map[todo.taskName] = 1;
        }
        return map;
    }, {});

    const sortedObjects = todos.sort((a, b) => {
        return frequencyMap[b.taskName] - frequencyMap[a.taskName];
    });
    const key = 'taskName';

    const arrayUniqueByKey = [...new Map(sortedObjects.map(item =>
        [item[key], item])).values()];

    result = arrayUniqueByKey;

    return result.slice(0, 8);
}
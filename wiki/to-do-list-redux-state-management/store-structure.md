# 1 Slice Store
```json
[
        {
            "id": 1,
            "task": "Design store",
            "completed": false
        }
    ]
```

# 2 Slices Store
```json
{
    "tasks": [
        {
            "id": 1,
            "task": "Design store",
            "completed": false
        }
    ],
    "employees": [ {...}, {...}, {...}]
}
```

# Actions
- `ADD_TASK`
- `REMOVE_TASK`
- `TASK_COMPLETED`

Actions say what to do, so in Redux actions are objects, and the structure of this object is fixed.

```js
const addTaskAction = {
    type: 'ADD_TASK',
    payload: {
        task: "This is a new task"
    }
}

const removeTaskAction = {
    type: 'REMOVE_TASK',
    payload: {
        id: 1
    }
}
```
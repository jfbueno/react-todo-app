import axios from "axios"

const URL = "http://localhost:3003/api/todos"

export const changeDescription = event => ({
    type: "DESCRIPTION_CHANGED",
    payload: event.target.value
})

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description
        const search = description ? `&description__regex=/${description}/` : ''
        
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(r => dispatch({ type: "TODO_SEARCHED", payload: r.data }))
    }    
}

// export const add = description => {
//     const request = axios.post(URL, { description })
//     return [
//         { type: "TODO_ADDED", payload: request },
//         search()
//     ]
// }

export const add = description => {
    const request = axios.post(URL, { description })
    return dispatch => {
        request
            .then(r => dispatch(clearForm()))
            .then(r => dispatch(search()))
    }
}

export const markAsDone = task => {
    return dispatch => {
        axios.put(`${URL}/${task._id}`, { ...task, done: true })
            .then(r => dispatch({ type: "TASK_MARKED_AS_DONE", payload: r.data }))
            .then(() => dispatch(search()))
    }
}

export const markAsPending = task => {
    return dispatch => {
        axios.put(`${URL}/${task._id}`, { ...task, done: false })
            //.then(r => dispatch({ type: "TASK_MARKED_AS_PENDING", payload: r.data }))
            .then(() => dispatch(search()))
    }
}

export const remove = task => {
    return dispatch => {
        axios.delete(`${URL}/${task._id}`)
            .then(() => dispatch(search()))
    }
}

export const clearForm = () => {
    return [
        { type: "TODO_FORM_CLEARED" }, 
        search() 
    ]
}
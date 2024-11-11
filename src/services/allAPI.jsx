import commonAPI from "./commonAPI";
import SEVERURL from "./serverURl";

// saveTodoAPI -post http request when user click on add button
export const saveTodoAPI = async (todoDetails) => {
    return await commonAPI("POST", `${SEVERURL}/uploadTodos`, todoDetails);
}
// getAllTodosAPI - get http request when component displayed in the browser
export const getAllTodosAPI = async () => {
    return await commonAPI("GET", `${SEVERURL}/uploadTodos`, "");
}
// deleteTodoAPI - delete http request when user click on the button 
export const deleteTodoAPI = async (id) => {
    return await commonAPI("DELETE", `${SEVERURL}/uploadTodos/${id}`, {})
}
// editTodoAPI -

export const editTodoAPI = async (id, title) => {
    return await commonAPI("PATCH", `${SEVERURL}/uploadTodos/${id}`,{
        "title":title
    })
}
// editTaskAPI - patch the status task completed or not
export const editTaskAPI = async (id, status) => {
    return await commonAPI("PATCH", `${SEVERURL}/uploadTodos/${id}`, {
        "status": status
    })
}
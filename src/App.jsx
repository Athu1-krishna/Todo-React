import { useEffect, useState } from 'react'
import './App.css'
import { deleteTodoAPI, editTaskAPI, editTodoAPI, getAllTodosAPI, saveTodoAPI } from './services/allAPI'

function App() {
  const [allTodos, setAllTodos] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [editId, setEditId] = useState('')
  const [taskComplete, setTaskComplete] = useState(false)

  useEffect(()=>{
    getAllTodos()
  },[allTodos])
  
  // post todos to api
  const handleUploadTodo = async ()=> {
    if(newTitle){

      let newTodoItem = {
        title : newTitle,
        status : false,
        date : ""
      }
      console.log(newTodoItem);
      const sysDateTime = new Date();
      const timeStamp = sysDateTime.toLocaleString('en-US');
      newTodoItem.date = timeStamp
      let updateTodoArr = [...allTodos]
      updateTodoArr.push(newTodoItem)
      console.log(`new todo item ${JSON.stringify(newTodoItem)}`);
      
      if (updateTodoArr !== "") {
        try {
          const result = await saveTodoAPI(newTodoItem)
          console.log(result);

        } catch (err) {
          console.log(err);

        }
      }
      setNewTitle("")
    }
  }
//  edit todo from api
  const handleEditTodo = async ()=>{
    if (editId) {
      // setUpdatedTodo(newTitle)
      const editTodo = allTodos.find((todo) => todo.id == editId)
      const updateTodo = allTodos.map((to) => to.id === editTodo.id
        ? (to = { id: to.id, title: editTodo.id })
        : (to = { id: to.id, title: to.title }))
      console.log(`edittodo ${JSON.stringify(editTodo)}`);
      console.log(`updateTodo ${JSON.stringify(updateTodo)}`);

      //  setAllTodos(updateTodo)
      setEditId(0)
      setNewTitle("")
    }
    if (editId) {
      try {
        const res = await editTodoAPI(editId, newTitle)
        console.log(`res : ${JSON.stringify(res)}`);
      }
      catch (err) {
        console.log(err);
      }
    }
  }
  
  // get todos from api
  const getAllTodos = async ()=> {
    try{
      const result = await getAllTodosAPI()
      if(result.status>=200 && result.status<300){
        
        setAllTodos(result.data)
      }
    }
    catch(err){
      console.log(err); 
    }
  }

// delete todos from api
  const deleteTodo = async (id) => {
    try{
      await deleteTodoAPI(id);
      
    }
    catch(err){
      console.log(err);
      
    }
  }
  // edit todo
  const onEdit = (id) => {
    const editTodo = allTodos.find((todo)=>todo.id === id)
    setNewTitle(editTodo.title)
    setEditId(editTodo.id)
    console.log(`${editId}editId`);
    
    
  }
  

  // task complete button
  const onComplete = async (id) => {
     allTodos.map((todo)=>{
      if(todo.id === id){
          setTaskComplete(!taskComplete)
      }
      
    })
    // task complete button api
    try {
      const res = await editTaskAPI(id, taskComplete)
      console.log(`res : ${JSON.stringify(res)}`);
    }
    catch (err) {
      console.log(err);
    }


  }
  return (
    <div className='app'>
      <h1>Todo List🎉</h1>
      <div className="todo-wrapper">
        <h2 className='heading'>Todo</h2>
        <div className="todo-input">
          <div className="todo-input-item">
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Enter the task?" />
          </div>
          <div className="todo-input-item">
            <button type='button' onClick={editId ? handleEditTodo : handleUploadTodo} className='primaryBtn'>{editId?'EDIT':'ADD'}</button> 
          </div>
        </div>
        <div className="todo-list">
          {
            allTodos.length>0?
            allTodos.map((todo,index)=>(
              <div className="todo-list-item" key={index}>
                <div>
                  <i className="fa-solid fa-check check-icon" onClick={()=>onComplete(todo.id)}></i>
                </div>
                <div id={todo.status&&'todo'}>
                  <p>{todo?.date}</p>
                  <h3>{todo?.title}</h3>
                </div>
                <div>
                  <i class="fa-regular fa-pen-to-square icon edit-icon" onClick={()=>onEdit(todo.id)}></i>
                  <i onClick={()=>deleteTodo(todo?.id)} className="fa-regular fa-trash-can icon delete-icon"></i>
                  
                </div>
              </div>
            ))
            :
            <div></div>
          }
        </div>
      </div>
      
    </div>
  )
}

export default App

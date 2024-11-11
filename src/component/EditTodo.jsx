import React from 'react'

const EditTodo = () => {
  return (
    <div>
          <div className="todo-input-item">
              <label >title</label>
              <input type="text"  placeholder="what's the task title?" />
          </div>
          {/* <div className="todo-input-item">
            <label >description</label>
            <input type="text" value={newDescription}  onChange={(e)=>setNewDescription(e.target.value)} placeholder="what's the task title?" />
          </div> */}
          <div className="todo-input-item">
              <button type='button' onClick={handleUploadTodo}  >EDIT</button>
          </div>
    </div>
  )
}

export default EditTodo
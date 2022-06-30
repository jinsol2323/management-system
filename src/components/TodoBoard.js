import React from "react";
import TodoItem from "./TodoItem";


function TodoBoard(props){

    return(
        <div className="todo-board">
            <div className="title">Todo List</div>
            {props.todoList.map((item)=><TodoItem item={item}/>)}
        </div>
    )
}

export default TodoBoard
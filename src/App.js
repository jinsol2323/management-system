import React, {useState} from 'react';
import './App.css';
import TodoBoard from './components/TodoBoard';

function App() {
  const [inputValue,setInputValue] = useState('')
  const [todoList, setTodoList] = useState([])
  
  const addItem =() =>{
      console.log(inputValue)
      setTodoList([...todoList,inputValue])
  }
    
  return (
     <main className='todo-main'>
        <div className='todo-main_box'>
          <input value={inputValue} type="text" onChange={(event)=>setInputValue(event.target.value)}  className="todo-text"/>
          <button onClick={addItem} className="todo-btn">추가</button>
        </div>
        <TodoBoard todoList={todoList}/>
     </main>
  );
}

export default App;

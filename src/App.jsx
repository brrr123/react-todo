import './App.css'
import TodoList from "./components/TodoList.jsx";
import AddTodoForm from "./components/AddTodoForm.jsx";
import React from 'react';



function App() {
    //const [newTodo , setNewTodo] = React.useState("");
    const [todoList, setTodoList ] = React.useState([]);
    const addTodo = (newTodo  ) =>{
        setTodoList([newTodo, ...todoList ]);
    }
    return (
        <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo}></AddTodoForm>
            <TodoList todoList={todoList }/>
        </>
    )

}

export default App

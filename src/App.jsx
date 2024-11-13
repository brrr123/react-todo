import './App.css'
import TodoList from "./components/TodoList.jsx";
import AddTodoForm from "./components/AddTodoForm.jsx";
import React from 'react';

function App() {
    const [newTodo , setNewTodo] = React.useState("")
    return (
        <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={setNewTodo}></AddTodoForm>
            <p>{newTodo}</p>
            <TodoList/>
        </>
    )
}

export default App

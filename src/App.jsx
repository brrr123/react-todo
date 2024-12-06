import './App.css'
import TodoList from "./components/TodoList.jsx";
import AddTodoForm from "./components/AddTodoForm.jsx";
import React from 'react';

const useSemiPersistentState = () => {
    const [todoList, setTodoList ] = React.useState(JSON.parse( localStorage.getItem('savedTodoList')) || []);
    React.useEffect (()=>{localStorage.setItem('savedTodoList',JSON.stringify(todoList))},[todoList]);

    return [todoList, setTodoList];
}
function App() {
    const [todoList, setTodoList ] = useSemiPersistentState( );
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

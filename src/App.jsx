import './App.css'
import TodoList from "./components/TodoList.jsx";
import AddTodoForm from "./components/AddTodoForm.jsx";
import React from 'react';


function App() {
    const [todoList, setTodoList ] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        new Promise((resolve) =>{
            setTimeout( ()=>resolve ({data: {
                todoList: JSON.parse( localStorage.getItem('savedTodoList'))
            }}),2000);
        }).then((result)=>{
            setTodoList(result.data.todoList);
            setIsLoading(false);
        });

    }, []);
    React.useEffect (()=> {
        if (!isLoading) {
            localStorage.setItem('savedTodoList', JSON.stringify(todoList));
        }
    },[todoList]);
    const addTodo = (newTodo) =>{
        setTodoList([newTodo, ...todoList ]);
    }
    const removeTodo = (id) => {
        setTodoList(todoList.filter((data)=>data.id!==id));
    }
    return (
        <>

        {isLoading ? (
            <p>Loading...</p>
            ) : (
                <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            <TodoList  onRemoveTodo={removeTodo} todoList={todoList }/>
                </>
            )
        }
        </>
    )

}

export default App

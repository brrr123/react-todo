import './App.css'
import TodoList from "./components/TodoList.jsx";
import AddTodoForm from "./components/AddTodoForm.jsx";
import React from 'react';


function App() {
    const [todoList, setTodoList ] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const fetchData  = async() => {
        const options = {
            method: 'GET',
            headers: {'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`}
        };
        const url= `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
        try {

            const response = await
                fetch(url, options);

            if (!response.ok) {
                const message = `Error: ${response.status}`;
                throw new Error(message);
            }

            const data = await response.json();

            const todos = data.records.map((todo) => {

                const newTodo = {
                    id: todo.id,
                    title: todo.fields.title
                }

                return newTodo

            });

            setTodoList(todos);
            setIsLoading(false);

        } catch (error) {
            console.log(error.message)
        }
    }
    React.useEffect( () => {
        fetchData();
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

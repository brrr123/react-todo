import TodoList from "./components/TodoList.jsx";
import AddTodoForm from "./components/AddTodoForm.jsx";
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import styles from './components/TodoListItem.module.css'
import { sortBy } from 'lodash';




function App() {
    const [todoList, setTodoList ] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const SORT = {
        NONE: (todoList) => todoList,
        TITLE: (todoList) => sortBy(todoList, 'title'),
        DATE: (todoList) => sortBy(todoList, 'createdTime')

    }
    const [sort, setSort] = React.useState({sortKey: 'NONE', isReverse: false});
    const handleSort = (sortKey) => {
        const isReverse = sort.sortKey === sortKey && !sort.isReverse;
        setSort({sortKey,isReverse});
    }
    const sortFunction = SORT[sort.sortKey];
    const fetchData  = async() => {
        const options = {
            method: 'GET',
            headers: {'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`}
        };
        const url= `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;
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
                    title: todo.fields.title,
                    createdTime: todo.createdTime
                }

                return newTodo

            });
           // todos.sort((a,b) => a.title.localeCompare(b.title)).reverse();
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
    const sortedTodoList = sort.isReverse? sortFunction(todoList).reverse() : sortFunction(todoList);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <>


                    {isLoading ? (
                        <>
                            <p>Loading...</p>
                        </>
                        ) : (
                        <>
                            <h1 className={styles.TodoH1}>Todo List</h1>

                            <AddTodoForm onAddTodo={addTodo}/>
                            <p>
                            <div><strong>Sort by:</strong>
                                <span>
                                    <button type="button" onClick={() => handleSort('TITLE')}>
                                    Title {sort.sortKey === 'TITLE' && (sort.isReverse ? '↓' : '↑')}
                                    </button>
                                </span>
                                <span>
                                    <button type="button" onClick={() => handleSort('DATE')}>
                                    Date {sort.sortKey === 'DATE' && (sort.isReverse ? '↓' : '↑')}
                                    </button>
                                </span>
                            </div>
                            </p>
                            <TodoList onRemoveTodo={removeTodo} todoList={sortedTodoList}/>
                        </>
                    )
                    }
                    </>
                }/>
                <Route path='/new' element={<h1>New Todo List</h1>}/>
            </Routes>
        </BrowserRouter>
    )

}

export default App

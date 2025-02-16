import React from 'react';
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";
import styles from './TodoList.module.css';
import { sortBy } from 'lodash';
import PropTypes from "prop-types";


const TodoContainer = ({tableName}) =>{

    const [todoList, setTodoList ] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const SORT = {
        NONE: (todoList) => todoList,
        TITLE: (todoList) => sortBy(todoList, (todo) => todo.title.toLowerCase()),
        DATE: (todoList) => sortBy(todoList, 'createdTime')

    }
    const [sort, setSort] = React.useState({sortKey: 'NONE', isReverse: false});
    const handleSort = (sortKey) => {
        const isReverse = sort.sortKey === sortKey && !sort.isReverse;
        setSort({sortKey,isReverse});
    }
    const sortFunction = SORT[sort.sortKey];

    React.useEffect( () => {
        const fetchData  = async() => {
            const options = {
                method: 'GET',
                headers: {'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`}
            };
            const url= `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;
            try {

                const response = await
                    fetch(url, options);

                if (!response.ok) {
                    const message = `Error: ${response.status}`;
                    throw new Error(message);
                }

                const data = await response.json();
                const todos = data.records.map((todo) => {

                    return  {
                        id: todo.id,
                        title: todo.fields.title,
                        createdTime: todo.createdTime
                    }
                });
                setTodoList(todos);
                setIsLoading(false);

            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData();
    }, [tableName]);
    React.useEffect (()=> {
        if (!isLoading) {
            localStorage.setItem('savedTodoList', JSON.stringify(todoList));
        }
    },[todoList]);
    const addTodo = (title) =>{
        setTodoList([title, ...todoList ]);
    }
    const removeTodo = (id) => {
        const removeAirtableRow = async (id) => {
            const options = {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
                }
            };
            const url= `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;
            try {
                const response = await fetch(url, options );

                if (!response.ok) {
                    const message = `Error has occurred:
                             ${response.status}`;
                    throw new Error(message);
                }
                return await response.json();

            } catch (error) {
                console.log(error.message);
                return null;
            }
        };
        removeAirtableRow(id).then(  (data) => data?.deleted && setTodoList(todoList.filter((item)=>item.id!==data.id)));

    }
    const sortedTodoList = sort.isReverse? sortFunction(todoList).reverse() : sortFunction(todoList);

    const SortButton = ({ sortKey, label }) => (
        <button
                className={`${styles.SortButton} ${sort.sortKey === sortKey && styles.Active}`}
                type="button"
                onClick={() => handleSort(sortKey)}>
                {label} {sort.sortKey === sortKey && (sort.isReverse ? '↓' : '↑')}
            </button>
    );
    SortButton.propTypes = {
        sortKey: PropTypes.string,
        label: PropTypes.string
    }


    return (
        <>
            {isLoading ? (
                <>
                    <div className={styles.LoadingMessage}>Loading...</div>
                </>
            ) : (
                <>
                    <h1>{tableName}</h1>
                    <AddTodoForm onAddTodo={addTodo}/>

                    <div className={styles.SortContainer}>
                        <span className={styles.SortLabel}>Sort by:</span>
                        <SortButton sortKey="TITLE" label="Title" />
                        <SortButton sortKey="DATE" label="Date" />

                    </div>
                    <TodoList onRemoveTodo={removeTodo} todoList={sortedTodoList}/>
                </>
            )
            }
        </>
    )
}
TodoContainer.propTypes = {
    tableName: PropTypes.string
}
export default TodoContainer;



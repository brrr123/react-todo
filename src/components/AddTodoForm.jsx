import React from "react";
import PropTypes from "prop-types";
import InputWithLabel from "./InputWithLabel.jsx";
import styles from './AddForm.module.css'
import Add  from '../assets/add.svg?react';

const AddTodoForm = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle ] = React.useState("");
    const handleTitleChange = event =>{
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }
    const handleAddTodo =event =>{
        event.preventDefault();
        if (!todoTitle) return;
        const postTodo = async (todo) => {
            const airtableData = {
                fields: {
                    title: todo,
                },
            };
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
                },
                body: JSON.stringify(airtableData)
            };
            const url= `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
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
        postTodo( todoTitle).then((data)=> onAddTodo({id:data.id, title:todoTitle, createdTime: data.createdTime}));
        setTodoTitle("");
    }
    return (
        <div className={styles.TodoCard}>
        <form onSubmit={handleAddTodo} className={styles.TodoForm}>
            <InputWithLabel isFocused={true} onInputChange={handleTitleChange} value={todoTitle} id="todoTitle">Add New Todo:</InputWithLabel>
            <button className={styles.AddButton}><Add className={styles.PlusIcon}/> <span>Add Todo</span></button>
        </form>
        </div>
    )
}
AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func
}
export default AddTodoForm;
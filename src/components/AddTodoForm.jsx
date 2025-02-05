import React from "react";
import PropTypes from "prop-types";
import InputWithLabel from "./InputWithLabel.jsx";
import styles from './TodoListItem.module.css'
import Add  from '../assets/add.svg?react';

const AddTodoForm = ({onAddTodo}) => {
    AddTodoForm.propTypes = {
        onAddTodo: PropTypes.func
    }
    const [todoTitle, setTodoTitle ] = React.useState("");
    const handleTitleChange = event =>{
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }
    const handleAddTodo =event =>{
        event.preventDefault();
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
                    const message = `Error has ocurred:
                             ${response.status}`;
                    throw new Error(message);
                }

                const dataResponse = await response.json();
                return dataResponse;
            } catch (error) {
                console.log(error.message);
                return null;
            }
        };
    postTodo( todoTitle).then((data)=> onAddTodo({id:data.id, title:todoTitle}));

        setTodoTitle("");
    }
    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel isFocused={true} onInputChange={handleTitleChange} value={todoTitle} id="todoTitle">Title</InputWithLabel>
            <button><Add className={styles.TodoButton} /></button>
        </form>

    )
}

export default AddTodoForm;
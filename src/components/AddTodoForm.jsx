import React from "react";
import InputWithLabel from "./InputWithLabel.jsx";

const AddTodoForm = ({onAddTodo}) => {
    const [todoTitle, setTodoTitle ] = React.useState("");
    const handleTitleChange = event =>{
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }
    const handleAddTodo =event =>{
        event.preventDefault();
        onAddTodo({id:Date.now(), title:todoTitle});
        setTodoTitle("");
    }
    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel isFocused={true} onInputChange={handleTitleChange} value={todoTitle} id="todoTitle">Title</InputWithLabel>
            <button>Add</button>
        </form>

    )
}

export default AddTodoForm;
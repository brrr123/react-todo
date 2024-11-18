import React from "react";

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
            <div>
                <label htmlFor="todoTitle">Title</label>
            </div>
            <div>
                <input name="title" onChange={handleTitleChange } value={todoTitle } id="todoTitle"></input>
            </div>
            <button>Add</button>
        </form>

    )
}

export default AddTodoForm;
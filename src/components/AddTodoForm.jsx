const AddTodoForm = (props) => {

    const handleAddTodo =event =>{
        event.preventDefault();
        const todoTitle = event.target.elements.title.value;
         console.log(todoTitle);
         props.onAddTodo(todoTitle);
         event.target.elements.title.value ="";
    }
    return (
        <form onSubmit={handleAddTodo}>
            <div>
                <label htmlFor="todoTitle">Title</label>
            </div>
            <div>
                <input name="title" id="todoTitle"></input>
            </div>
            <button>Add</button>
        </form>

    )
}

export default AddTodoForm;
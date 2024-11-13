const AddTodoForm = (props) => {

    const handleAddTodo =event =>{
        event.preventDefault();
         console.log(event.target.elements[0].value);
         props.onAddTodo(event.target.elements[0].value);
         event.target.elements[0].value ="";
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

export { AddTodoForm }
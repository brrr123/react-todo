const AddTodoForm = () => {
    return (
        <form>
            <div>
                <label htmlFor="todoTitle">Title</label>
            </div>
            <div>
                <input id="todoTitle"></input>
            </div>
            <button>Add</button>
        </form>

    )
}

export { AddTodoForm }
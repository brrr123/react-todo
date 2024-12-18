const TodoListItem = ({id,title,onRemoveTodo}) =>
    (
        <li>{title} <button type="button" onClick={()=>onRemoveTodo(id)}>Remove</button></li>
    )


export default TodoListItem
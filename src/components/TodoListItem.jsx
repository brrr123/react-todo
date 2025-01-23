import styles from '../TodoListItem.module.css'
import Delete  from '../assets/delete.svg?react';


const TodoListItem = ({id,title,onRemoveTodo}) =>
    (
        <li  className = {styles.ListItem}>{title} <button type="button" onClick={()=>onRemoveTodo(id)}>
            <Delete className = {styles.TodoButton}/>
        </button></li>
    )


export default TodoListItem
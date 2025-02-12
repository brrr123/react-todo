import styles from './TodoListItem.module.css'
import Delete  from '../assets/delete.svg?react';
import PropTypes from "prop-types";

const TodoListItem = ({id,title,onRemoveTodo}) => {
    TodoListItem.propTypes = {
        id: PropTypes.string,
        title: PropTypes.string,
        onRemoveTodo: PropTypes.func
    }
    return (
        <li className={styles.ListItem}>{title}
            <button type="button" onClick={() => onRemoveTodo(id)}>
                <Delete className={styles.TodoButton}/>
            </button>
        </li>
    )
}

export default TodoListItem
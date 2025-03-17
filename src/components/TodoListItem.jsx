import styles from './TodoList.module.css'
import PropTypes from "prop-types";

const TodoListItem = ({id,title,onRemoveTodo,createdTime}) => {

    return (
        <li className={styles.ListItem}>
            <input
                title="Remove"
                type="checkbox"
                className={styles.Checkbox}
                onChange={() => onRemoveTodo(id)}
            /> {title}
            {createdTime && (
                <span className={styles.TodoDate}>
                {new Date(createdTime).toLocaleDateString()}
              </span>
            )}
        </li>
    )
}
TodoListItem.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    onRemoveTodo: PropTypes.func,
    createdTime: PropTypes.string

}
export default TodoListItem
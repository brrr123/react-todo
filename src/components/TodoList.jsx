import TodoListItem from "./TodoListItem.jsx";
import PropTypes from "prop-types";
import styles from './TodoList.module.css';

const TodoList = ({todoList,onRemoveTodo }) => {
    return (
        <ul className={styles.TodoList}>
            {todoList.map(item =>  <TodoListItem onRemoveTodo={onRemoveTodo}  key={item.id} {...item}/> )}
        </ul>
    )
}
TodoList.propTypes = {
    todoList: PropTypes.array,
    onRemoveTodo: PropTypes.func
}
export default  TodoList ;
import TodoListItem from "./TodoListItem.jsx";
import PropTypes from "prop-types";

const TodoList = ({todoList,onRemoveTodo }) => {
    TodoList.propTypes = {
        todoList: PropTypes.array,
        onRemoveTodo: PropTypes.func
    }
    return (
        <ul>

            {todoList.map(item =>  <TodoListItem onRemoveTodo={onRemoveTodo}  key={item.id} {...item}/> )}
        </ul>
    )
}

export default  TodoList ;
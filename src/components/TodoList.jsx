import TodoListItem from "./TodoListItem.jsx";


// eslint-disable-next-line react/prop-types
const TodoList = ({todoList,onRemoveTodo }) => (
        <ul>

            {todoList.map(item =>  <TodoListItem onRemoveTodo={onRemoveTodo}  key={item.id} {...item}/> )}
        </ul>
    )

export default  TodoList ;
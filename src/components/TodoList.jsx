import TodoListItem from "./TodoListItem.jsx";

//const todoData =[{id:1,title:"Finish the assignment"},{id:2,title:"Cook"}, {id:3,title:"Do laundry"}];

const TodoList = ({todoList }) => (
        <ul>

            {todoList.map(item =>  <TodoListItem  key={item.id} {...item}/> )}
        </ul>
    )

export default  TodoList ;
const todoData =[{id:1,title:"Finish the assignment"},{id:2,title:"Cook"}, {id:3,title:"Do laundry"}];

const TodoList = () =>{
    return (
        <ul> 
            {todoData.map(item => <li key={item.id}>{item.title}</li>)}
        </ul>
    )
}

export { TodoList };
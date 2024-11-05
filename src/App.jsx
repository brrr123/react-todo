import './App.css'

const todoList =[{id:1,title:"Finish the assignment"},{id:2,title:"Cook"}, {id:3,title:"Do laundry"}];


function App() {


  return (
    <>
        <h1>Todo List</h1> 
      <ul>
          { todoList.map(item => <li key={item.id}>{item.title}</li>)}
      </ul>
    </>
  )
}

export default App

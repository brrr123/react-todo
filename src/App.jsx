import './App.css'
import TodoList from "./components/TodoList.jsx";
import AddTodoForm from "./components/AddTodoForm.jsx";


function App() {


  return (
    <>
        <h1>Todo List</h1>
        <AddTodoForm />
        <TodoList />
    </>
  )
}

export default App

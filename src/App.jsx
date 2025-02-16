import { BrowserRouter, Routes, Route} from 'react-router-dom';
import styles from './components/App.module.css'
import TodoContainer from './components/TodoContainer.jsx';
import Nav from "./components/Nav.jsx";
import About from "./components/About.jsx";



function App() {

    return (
        <BrowserRouter>
            <Nav/>
            <div className={ styles.MainContent}>
            <Routes>
                <Route path='/' element={
                    <>

                        <TodoContainer tableName={import.meta.env.VITE_TABLE_NAME} />
                    </>
                }/>
                <Route path="/about" element={<About />} />

            </Routes>
            </div>
        </BrowserRouter>
    )

}

export default App

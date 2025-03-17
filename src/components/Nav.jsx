import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => {
    return (
        <nav className={styles.Nav}>
            <ul>
                <li>
                    <NavLink to="/">Todo list</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;
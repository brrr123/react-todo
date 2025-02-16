import styles from './About.module.css';

const About = () => {
    return (
        <div className={styles.TextContainer}>
            <h1>About</h1>
            <p>
                This project is my final assignment for the React course. It is a simple and efficient to-do list
                application that leverages Airtable as its backend. Users can seamlessly add, remove, and sort tasks,
                making task management easier. The app also integrates React Router to enable smooth navigation
                between the Home and About pages.
            </p>
        </div>
    );
};

export default About;
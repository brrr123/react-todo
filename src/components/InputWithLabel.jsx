import React from "react";
import styles from './TodoListItem.module.css'
import PropTypes from "prop-types";

const InputWithLabel = ({
                            id,
                            value,
                            isFocused=true,
                            onInputChange,
                            children,
                        }) => {
    InputWithLabel.propTypes = {
        id: PropTypes.string,
        value: PropTypes.string,
        isFocused: PropTypes.bool,
        onInputChange: PropTypes.func,
        children: PropTypes.string
    }
    const inputRef = React.useRef();
    React.useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);
return    (
        <>
            <label htmlFor={id}>{children}</label>
            <input className={styles.NewItem} ref={inputRef} onChange={onInputChange} value={value} id={id}/>
        </>
    )

}
export default InputWithLabel;
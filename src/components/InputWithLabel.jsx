import React from "react";
import styles from './AddForm.module.css'
import PropTypes from "prop-types";

const InputWithLabel = ({
                            id,
                            value,
                            isFocused=true,
                            onInputChange,
                            children,
                        }) => {

    const inputRef = React.useRef();
    React.useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);
return    (
        <>
            <div  className={ styles.InputGroup}>
                <label htmlFor={id} className={styles.InputLabel}>{children}</label>
                <input className={styles.InputField} ref={inputRef} onChange={onInputChange} value={value} id={id}/>
            </div>
        </>
    )

}
InputWithLabel.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    isFocused: PropTypes.bool,
    onInputChange: PropTypes.func,
    children: PropTypes.string
}
export default InputWithLabel;
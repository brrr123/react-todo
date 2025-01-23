import React from "react";
import styles from '../TodoListItem.module.css'

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
            <label htmlFor={id}>{children}</label>
            <input className={styles.NewItem} ref={inputRef} onChange={onInputChange} value={value} id={id}/>
        </>
    )

}
export default InputWithLabel;
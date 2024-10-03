import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function SelectInput(
    { children, className = "", isFocused = false, options = [], ...props },
    ref
) {
    const selectRef = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            selectRef.current.focus();
        }
    }, [isFocused]);

    return (
        <select
            {...props}
            className={
                "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md " +
                className
            }
            ref={selectRef}
        >
            {/* {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))} */}
            {children}
        </select>
    );
});

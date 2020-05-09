import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

/*const LogEffect=() => {
    const [text, setText]=useState('');

    useEffect(() => {
        console.log('último valor:', text);
    });

    return (
        <input
            value={text}
            onChange={e => setText(e.target.value)}
        />
    );
};*/

function App() {
    // Almacenar una referencia al nodo DOM del input
    const inputRef=useRef();

    // Almacenar el valor del input en el state
    const [value, setValue]=useState("");

    useEffect(
        () => {
            // Esto se ejecuta DESPUÉS del primer render, 
            // por lo que la referencia ya está establecida.
            console.log("render");
            inputRef.current.focus();
        },
        // El efecto "depende de" inputRef
        [inputRef]
    );

    return (
        <input
            ref={inputRef}
            value={value}
            onChange={e => setValue(e.target.value)}
        />
    );
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)
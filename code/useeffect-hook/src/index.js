import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const LogEffect=() => {
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
};

ReactDOM.render(
    <LogEffect />,
    document.querySelector('#root')
)
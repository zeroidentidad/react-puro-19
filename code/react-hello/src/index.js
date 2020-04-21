import React from "react";
import ReactDOM from "react-dom";

function HelloWorld() {
    return [<Hello key="h" />, <World key="m" />];
}

function Hello(){
    return <span>Hola </span>
}

function World(){
    return <span> mundo</span>
}

ReactDOM.render(
    <HelloWorld/>,
    document.querySelector('#root')
)
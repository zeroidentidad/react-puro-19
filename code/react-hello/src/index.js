import React from "react";
import ReactDOM from "react-dom";

function HelloWorld() {
    return [<Hello key="h" first-Name="Zero" last-Name="Identidad" />, <World key="m" />];
}

const Hello= props => (
    <span> Hello, {props['first-Name']} {props['last-Name']} </span>
);

function World(){
    return <span> mundo</span>
}

ReactDOM.render(
    <HelloWorld/>,
    document.querySelector('#root')
)
import React from "react";
import ReactDOM from "react-dom";

function HelloWorld(params) {
    return(
        <div>Hola mundo</div>
    )
}

ReactDOM.render(
    <HelloWorld/>,
    document.querySelector('#root')
)
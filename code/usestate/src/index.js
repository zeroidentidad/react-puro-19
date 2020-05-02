import React from 'react';
import ReactDOM from 'react-dom';

/*
class OneTimeButton extends React.Component {
    state={
        clicked: false
    }

    handleClick=() => {
        // No se llamará al controlador si el botón
        // está deshabilitado, así que si llega aquí, es seguro
        // para activar el clic.
        this.props.onClick();
        // Ok, no más clics.
        this.setState({ clicked: true });
    }

    render() {
        return (
            <button
                onClick={this.handleClick}
                disabled={this.state.clicked}
            >
            Solo puedes hacer clic aqui una vez
            </button>
        );
    }

}
*/

function OneTimeButton({ onClick }) {
    const [clicked, setClicked]=React.useState(false);

    const handleClick=() => {
        onClick();
        // Ok, no más clics.
        setClicked(true);
    };

    return (
        <button 
        onClick={handleClick} 
        disabled={clicked} 
        >
        Solo puedes hacer clic aqui una vez
        </button>
    );
}

ReactDOM.render(
    <OneTimeButton onClick={() => alert("kepex")} />,
    document.querySelector('#root')
);
import React from 'react'
import PropTypes from 'prop-types';

function Message({ text }) {
    return (
        <div className="message" >
            {text}
        </div>        
    );
}

Message.propTypes={
    text: PropTypes.string
};

export default Message
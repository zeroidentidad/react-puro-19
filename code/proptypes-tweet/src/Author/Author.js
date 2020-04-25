import React from 'react'
import PropTypes from 'prop-types';

function Author({ author }) {
    const { name, handle }=author;
    return (
        <span className="author" >
            <span className="name" >{name}</span>
            <span className="handle" >@{handle}</span>
        </span>        
    );
}

Author.propTypes={
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        handle: PropTypes.string.isRequired
    }).isRequired
};

export default Author
import React from 'react'
import PropTypes from 'prop-types';

function Avatar({ hash }) {
    const url=`https://www.gravatar.com/avatar/${hash}`;
    return (
        <img
            src={url}
            className="avatar"
            alt="avatar" />
    );
}

Avatar.propTypes={
    hash: PropTypes.string
};


export default Avatar
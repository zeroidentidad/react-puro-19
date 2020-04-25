import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import './index.css';
import Avatar from "./Avatar/Avatar";
import Author from "./Author/Author";
import Message from "./Message/Message";

// agregar prop {tweet}, desestructurado
function Tweet({ tweet }) {
    return (
        <div className="tweet" >
            <Avatar hash={tweet.gravatar} />
            <div className="content">
                <Author author={tweet.author} />
                <Time time={tweet.timestamp} />
                <Message text={tweet.message} />
                <div className="buttons" >
                    <ReplyButton />
                    <RetweetButton count={tweet.retweets} />
                    <LikeButton count={tweet.likes} />
                    <MoreOptionsButton />
                </div>
            </div>
        </div>
    );
}

const Time=({ time }) => {
    const timeString=moment(time).fromNow();
    return (
        <span className="time" >
            {timeString}
        </span>
    );
};

RetweetButton.propTypes={
    time: PropTypes.string
};

const ReplyButton=() => (
    <i className="fa fa-reply reply-button" />
);

const RetweetButton=({ count }) => (
    <span className="retweet-button" >
        <i className="fa fa-retweet" />
        {getRetweetCount(count)}
    </span>
);

RetweetButton.propTypes={
    count: PropTypes.number
};

function getRetweetCount(count) {
    if (count>0) {
        return (
            <span className="retweet-count" >
                {count}
            </span>
        );
    } else {
        return null;
    }
}

const LikeButton=({ count }) => (
    <span className="like-button" >
        <i className="fa fa-heart" />
        {count>0&&
            <span className="like-count" >
                {count}
            </span>}
    </span>
);

LikeButton.propTypes={
    count: PropTypes.number
};

const MoreOptionsButton=() => (
    <i className="fa fa-ellipsis-h more-options-button" />
);

// ...

const testTweet={
    message: "Something about cats.",
    gravatar: "xyz",
    author: {
        handle: "catperson",
        name: "IAMA Cat Person"
    },
    likes: 2,
    retweets: 20,
    timestamp: "2016-07-30 21:24:37"
};

ReactDOM.render(<Tweet tweet={testTweet}/>,
    document.querySelector('#root'));
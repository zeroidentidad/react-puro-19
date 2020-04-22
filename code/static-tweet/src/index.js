import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Avatar from "./Avatar/Avatar";
import Author from "./Author/Author";
import Message from "./Message/Message";

function Tweet() {
    return (
        <div className="tweet" >
            <Avatar />
            <div className="content">
                <Author /><Time />
                <Message />
                <div className="buttons" >
                    <ReplyButton />
                    <RetweetButton />
                    <LikeButton />
                    <MoreOptionsButton />
                </div>
            </div>
        </div>
    );
}

const Time=() => (
    <span className="time" > 3h ago </span>
);

const ReplyButton=() => (
    <i className="fa fa-reply reply-button" />
);

const RetweetButton=() => (
    <i className="fa fa-retweet retweet-button" />
);

const LikeButton=() => (
    <i className="fa fa-heart like-button" />
);

const MoreOptionsButton=() => (
    <i className="fa fa-ellipsis-h more-options-button" />
);

ReactDOM.render(<Tweet />,
    document.querySelector('#root'));
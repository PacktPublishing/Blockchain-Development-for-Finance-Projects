import React from 'react';

function addressBar(props) {
    return (
        <p className={props.tx ? "is-hidden" : "panel-heading has-text-centered is-clipped is-size-7"}>
            Account:
            <strong>{props.account}</strong>
        </p>
    )
}

export default addressBar;

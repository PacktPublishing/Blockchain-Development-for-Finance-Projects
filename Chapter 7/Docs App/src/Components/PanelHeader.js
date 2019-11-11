import React from 'react';

function PanelHeader(props) {
    return (
        <p className={props.tx ? "is-hidden" : "panel-heading has-text-centered is-clipped is-size-7"}>
            Root Directory:
            <strong>{props.DirPath}</strong>
        </p>
    )
}

export default PanelHeader;
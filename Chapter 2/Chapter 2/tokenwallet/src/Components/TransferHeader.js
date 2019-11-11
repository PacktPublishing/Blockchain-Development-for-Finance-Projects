import React from 'react';

function TransferHeader(props) {
    return (
        <div className="panel-block">
            <div className="content">
                <h1 className="title is-size-5 is-uppercase">Send {props.token.symbol}</h1>
                <h2 className="subtitle is-size-6  has-text-grey-light">
                    Only send {props.token.symbol.toUpperCase()} to an Ethereum address.
                </h2>
            </div>
        </div>
    )
}

export default TransferHeader;
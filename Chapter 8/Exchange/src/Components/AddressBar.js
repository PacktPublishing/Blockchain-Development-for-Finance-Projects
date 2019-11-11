import React from 'react';

function addressBar(props) {
 
	
    return (
        
		<div>
		<p className={"panel-heading has-text-centered is-clipped is-size-7"}>
            ETH Account:
            {props.account}
        </p>
		<p className={"panel-heading has-text-centered is-clipped is-size-7"}>
            Fiat Balance:
            <strong>{props.USDBalance} USD </strong>
             Asset Balance:
			<strong>{props.AuBalance} Gold</strong>
        </p>
		</div>
    )
}

export default addressBar;
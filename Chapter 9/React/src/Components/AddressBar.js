import React from 'react';

function addressBar(props) {
 	
    return (
        
		<div>
		<p className={"panel-heading has-text-centered is-clipped is-size-7"}>
            Stellar Account:
            {props.account}
        </p>
		<p className={"panel-heading has-text-centered is-clipped is-size-7"}>
            USD Balance:
            <strong>${props.USDBalance}  </strong>
        	GBP Balance:
			<strong>£{props.GBPBalance} </strong>    
			EUR Balance:
			<strong>€{props.EURBalance} </strong>
        </p>
		</div>
    )
}

export default addressBar;
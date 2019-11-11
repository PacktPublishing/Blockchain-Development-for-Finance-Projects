import React from 'react';

function addressBar(props) {
 	
    return (
        
		<div>
		<p className={"panel-heading has-text-centered is-clipped is-size-7"}>
            Account ID:
            {props.account}
        </p>
		<p className={"panel-heading has-text-centered is-clipped is-size-7"}>
            Balance:
            <strong>${props.balance}  </strong>
       </p>
		</div>
    )
}

export default addressBar;
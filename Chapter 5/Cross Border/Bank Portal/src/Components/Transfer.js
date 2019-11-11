import React from 'react';
import InputField from './InputField';

function Transfer(props) {
		console.log("txid",props.txid);
    	console.log("txstatus",props.txstatus);
        return (
            <div className="panel-block is-paddingless is-6" >
                <div className="column" >
				
                     
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="receiver" placeholder="Receiver Friendly ID"/>
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="amount" placeholder="Amount (In USD)"/>
				
			<p className="control ">
				<a className="button is-info" onClick={() => props.payment()}>
                            Transfer
                        </a>
                    </p>
			
			<div className="column" >
				<div className="column" >
						<p>
						<span className="tag is-grey">	
						<strong>Tx Status</strong> : {props.txstatus}
						</span>
						</p>
				</div>
				<div className="column" >
						<p>
						<span className="tag is-grey">	
						<strong>Tx Hash</strong>: {props.txid}
						</span>
						</p>
				</div>
				</div>	
					
			</div>
			</div>
		)

    }


export default Transfer;
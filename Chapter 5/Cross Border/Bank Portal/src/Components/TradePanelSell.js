import React from 'react';
import InputField from './InputField';

function Transfer(props) {
    
        return (
            <div className="panel-block is-paddingless is-6" >
                <div className="column is-6" >
				
					<span className="tag is-info">
								Sell
					</span>
                     
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="receiver" placeholder="Receiver Friendly ID"/>
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="amount" placeholder="Amount (In USD)"/>
			
			<p className="control">
                        <a className="button is-light" onClick={() => props.Payment()}>
                            Submit
                        </a>
                    </p>
			</div>
			</div>
		)

    }


export default TradePanelSell;
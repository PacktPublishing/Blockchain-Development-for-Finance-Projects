import React from 'react';
import InputField from './InputField';

function TradePanel(props) {
    
        return (
            <div className="panel-block is-paddingless is-12" >
			
			
			<div className="column is-6" >				
				
				<span className="tag is-medium is-link" >
								Buy
					</span>
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="buyprice" placeholder="Price"/>
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="buyamount" placeholder="Amount"/>
			
			<p className="control">
                        <a className="button is-info" onClick={() => props.Buy()} >
                            Submit
                        </a>
                    </p>
			</div>
			<div className="column is-6" >
				
					<span className="tag is-medium is-link">
								Sell
					</span>
                     
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="sellprice" placeholder="Price"/>
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="sellamount" placeholder="Amount"/>
			
			<p className="control">
                        <a className="button is-info" onClick={() => props.Sell()}>
                            Submit
                        </a>
                    </p>
			</div>
			</div>
		)

    }



export default TradePanel;

import React from 'react';
import InputField from './InputField';

function BankTabCreate(props) {
	
    return (
		<div>
        <div className="panel-block is-paddingless is-12">
            <div className="column is-12" id="token-lists">
				
				<div className="field is-grouped ">	
				<p className="control">
				<a className="button is-primary" onClick={() => props.BankSessionCreate()}>    
									Create LC
									</a>
									</p>
		
				<p className="control">
				<a className="button is-primary " onClick={() => props.BankSessionView()}>    
									View LC
									</a>
									</p>
				
				</div>
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="BuyerAccount" placeholder="Buyer Account"/>
		
				                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="SellerAccount"  placeholder="Seller Account"/>
						
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="Amount" placeholder="Amount"addon="USD"/>
		
							<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="DOExpiry" placeholder="Date of Expiry (YYYYMMDD)"/>

		</div>
		</div>
		<div className="panel-block is-paddingless is-12 ">
		<div className="column has-text-centered ">
				
				<div className="button" onClick={() => props.createLC()}>    
									Submit 
									</div>
									
				
				<div className="button" onClick={() => props.closeTab()}>    
									Back 
									</div>
									
				
									
        </div>
		</div>
		
		</div>
    )
}

export default BankTabCreate;
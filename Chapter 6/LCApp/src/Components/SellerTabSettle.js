import React from 'react';
import InputField from './InputField';

function SellerTabSettle(props) {
	
    return (
		<div>
        <div className="panel-block is-paddingless is-12">
            <div className="column is-12" id="token-lists">
				
				<div className="field is-grouped ">	
				<p className="control">
				<a className="button is-primary " onClick={() => props.SellerSessionSettle()}>    
									Settle LC
									</a>
									</p>	
		
				<p className="control">
				<a className="button is-primary " onClick={() => props.SellerSessionView()}>    
									View LC
									</a>
									</p>	
				</div>

				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="LCNo" placeholder="LC Number"/>
								
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="Amount" placeholder="Amount" addon="USD"/>
		
							<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="DocHash" placeholder="Document Hash"/>

		</div>
		</div>
		<div className="panel-block is-paddingless is-12 ">
		<div className="column has-text-centered ">
				
				<div className="button" onClick={() => props.settleLC()}>    
									Submit  
									</div>
									
				
				<div className="button"	onClick={() => props.SellerSessionView()} >    
									Back 
									</div>
									
				
									
        </div>
		</div>
		
		</div>
    )
}

export default SellerTabSettle;
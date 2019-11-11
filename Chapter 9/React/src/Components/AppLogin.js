import React from 'react';
import InputField from './InputField';

function AppLogin(props){
    	
		
		return (
            <div className="panel-block is-paddingless is-12" >
                <div className="column is-12" id="token-lists">
                    
                                
                <div className="column has-text-centered">
                Enter secret key:
                </div>
									
			    <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                 fields={props.fields} name="secretkey" placeholder="Secret Key"/>
			
			<div className="column has-text-centered">
			<span className="button is-medium is-warning" onClick={() => props.setAccount()}>
             Submit
			</span >
            </div>
			</div>
			</div>
				)
                    }
        


export default AppLogin;
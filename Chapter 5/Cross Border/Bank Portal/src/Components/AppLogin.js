import React from 'react';
import InputField from './InputField';

function AppLogin(props){
    	
		
		return (
            <div className="panel-block is-paddingless is-12" >
                <div className="column is-12" id="token-lists">
                    
                                
                <div className="column has-text-centered">
                Enter Friendly ID:
                </div>
									
			    <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                 fields={props.fields} name="friendlyid" placeholder="Friendly ID"/>
			
			
			<div className="column has-text-centered">
			<span className="button is-medium is-warning" onClick={() => props.setAccount()}>
             Submit
			</span >
			</div>
			<div className="column has-text-centered">
			<span className="button is-medium is-info" onClick={() => props.setBank()}>
             Bank User
			</span >
			
            </div>
			</div>
			</div>
				)
                    }
        


export default AppLogin;
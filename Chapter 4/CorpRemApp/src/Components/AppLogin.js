import React from 'react';
import InputField from './InputField';

function AppLogin(props){
    	
		
		return (
            <div className="panel-block is-paddingless is-12" >
                <div className="column is-12" id="token-lists">
                   
			<div className="column has-text-centered">
			<span className="button is-medium is-success" onClick={() => props.setAccount(1)}>
             Login as Acme Inc.
			</span >
			</div>
			<div className="column has-text-centered">
			<span className="button is-medium is-info" onClick={() => props.setAccount(2)}>
             Login as Apex Corp
			</span >
			
            </div>
			</div>
			</div>
				)
                    }
        


export default AppLogin;
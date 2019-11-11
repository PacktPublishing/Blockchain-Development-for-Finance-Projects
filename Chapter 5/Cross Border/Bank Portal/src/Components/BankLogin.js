import React from 'react';

function AppLogin(props){
    	
		
		return (
            <div className="panel-block is-paddingless is-12" >
                <div className="column is-12" id="token-lists">
                    
                                
                <div className="column has-text-centered">
                Enter account Friendly ID:
                </div>
									
			    <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                 fields={props.fields} name="friendlyID" placeholder="Friendly ID"/>
			
			<div className="column has-text-centered">
			<span className="button is-medium is-warning" onClick={() => props.setAccount()}>
             Submit
			</span >
            </div>
				)
                    }
        


export default AppLogin;
import React from 'react';

function BankLogin(props){
    
	
	
	
		
		
		return (
            <div className="panel-block is-paddingless is-12" >
                <div className="column is-12" id="token-lists">
                    
                                
                                    <div className="column has-text-centered">
                                        Login as:
                                    </div>
			
									<div className="column has-text-centered">
									<span className="button is-medium is-warning" onClick={() => props.BuyerSessionView()}>
                                        Buyer
									</span >
                                    </div>
	
									<div className="column has-text-centered">
									<span className="button is-medium is-primary is-6" onClick={() => props.BankSessionCreate()}>
                                        GreenGables Bank
                                    </span>
									</div>
	
									<div className="column has-text-centered">
                                    <span className="button is-medium is-danger is-6" onClick={() => props.SellerSessionSettle()}>    
									Seller
									</span>
                                    </div>
									    
                        
                </div>
            </div>
			)
                    }
        


export default BankLogin;
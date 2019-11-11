import React from 'react';


class WalletMain extends React.Component {


		

	
	render() {
		

		
        return (
							
                <div className="column" id="item-lists">
                    {
                        this.props.accounts.map((account,index) => {
							
                            return (
                                
								<div key={index} className="columns">
                                        
									<div className="column is-7 "  >
										
                                        {account.address}
										
                                    </div>
									
									<div className="column is-2 ">
                                        {account.balance} ETH
                                    </div> 
								{
									
								<div className="column is-1 ">
										<a class="button is-info" onClick={() => this.props.getAccountTransactions(account.address)}>
                                            View Transactions
                                        </a>
									</div>
								}
									</div> 		 
								 
                            )
                        })
                    }
                </div>
            
			
        )
    }
}

export default WalletMain;
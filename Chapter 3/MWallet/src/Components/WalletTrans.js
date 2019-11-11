import React from 'react';


class WalletTrans extends React.Component {
	
	render() {
		

		
        return (
			
					<div className="panel-block is-paddingless" >
						
						<div className="column is-full" id="item-lists">
                    	{			
                        this.props.transactions.map((tx,index) => {
						
                            return (
                                
								
								
								<div key={index} className="columns tx">
                                        
									<div className="column is-small"  >
								{tx.transactionIndex}
                                    </div>
								<div className="column is-small"  >
								<span className="tag is-spaced">
                                        {tx.hash}
									</span>
                                    </div>
								<div className="column is-small"  >
                                        {tx.blockNumber}
                                    </div>
								<div className="column is-small"  >
								
                                        {tx.from}
								
                                    </div>
								<div className="column is-small"  >
                                        {tx.value} ETH
                                    </div>
								<div className="column is-small"  >
                                        {tx.confirmations}
                                    </div>
								<div className="column is-small is-size-8"  >
                                        {tx.cflag}
                                    </div>
								
								
								</div>					
									
									 		 
								
								 
                            )
                        })}
                    
                
				</div>
				</div>
				
        )
    }
}

export default WalletTrans;
import React from 'react';

function Trades(props)  {
    	
        return (
			<div>
			<div className="panel-block is-paddingless" >
			
			<div className="column has-text-centered" >
			<span className="tag is-large is-info" >
			Trades
			</span>
			</div>
			
			</div>
            
			<div className="panel-block is-paddingless" >
							
					
					
                <div className="column" id="token-lists">
                    {
						
                        props.tradesList.map((trade,index) => {
                            return (
								
                                <div key={index} className="columns token">
									
                                    <div className="column has-text-centered">
                         
									{(trade.base_asset_code)}
									
                                    </div>
									<div className="column has-text-centered">
                                   
									{(trade.base_amount)}
                                   
									</div>
									<div className="column has-text-centered">
                         
									{(trade.counter_asset_code)}
									
                                    </div>
									<div className="column has-text-centered">
                         
									{(trade.counter_amount)}
									
                                    </div>
								                                    
								 </div>
                            )
                        })
						}
						</div>	
						
                	</div>
            		</div>
       
	)
    }


export default Trades;
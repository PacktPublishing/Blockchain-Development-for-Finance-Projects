import React from 'react';

function Orderbook(props)  {
    	
        return (
			<div>
			<div className="panel-block is-paddingless is-12" >

			<div className="column is-6 has-text-centered" >
			<span className="tag is-large is-success" >
			Buys
			</span>
			</div>
			
			<div className="column is-6 has-text-centered" >
			<span className="tag is-large is-danger" >
			Sells
			</span>
			</div>
			</div>
            <div className="panel-block is-paddingless is-6" >
				
					
					
                <div className="column is-6" id="token-lists">
                    {
						
                        props.buys.map((buy,index) => {
                            return (
                                <div key={index} className="columns token">
                                    <div className="column has-text-centered">
                                    Price:   $ {buy.Price}
                                    </div>
									<div className="column has-text-centered">
                                    Amount:   {buy.Amount} Au
                                    </div>
                                    
								 </div>
                            )
                        })
						}
						</div>	
						
					<div className="column is-6" id="token-lists">
                    {
						props.sells.map((sell,index) => {
                            return (
                                <div key={index} className="columns token">
                                    <div className="column has-text-centered">
                                    Price:   $ {sell.Price}
                                    </div>
									<div className="column has-text-centered">
                                    Amount:   {sell.Amount} Au
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


export default Orderbook;
import React from 'react';

function Orderbook(props)  {
    	
	var bids;
	var asks;
	var Asymbol;
	var Psymbol;
	
	
	if(props.counter.code == 'USD' && props.base.code == 'GBP')
	   {
		  
	   	bids = props.bidsUSDGBP;
	    asks = props.asksUSDGBP;
		Asymbol = props.assets[0].symbol;
	    Psymbol = props.assets[1].symbol;   
		   
	   }
	  else if(props.counter.code == 'USD' && props.base.code == 'EUR')
	   {
	   	bids = props.bidsUSDEUR;
	    asks = props.asksUSDEUR;
		Asymbol = props.assets[0].symbol;
	    Psymbol = props.assets[2].symbol;   
	   }
	  else if(props.counter.code == 'GBP' && props.base.code == 'EUR')
	   {
	   	bids = props.bidsGBPEUR;
	    asks = props.asksGBPEUR;
		Asymbol = props.assets[1].symbol;
	    Psymbol = props.assets[2].symbol;   
	   }
	  else
	   {
	   console.log ("Invalid Pair");
		}
	
	   
        return (
			<div>
			<div className="panel-block is-paddingless is-12" >
			
			
			<div className="column is-4 is-offset-1 has-text-centered" >
			<p className="control">
                        <a className="button is-link is-small is-rounded" onClick={() => props.setOrderbookPair(1)} >
                            USD - GBP
                        </a>
                    </p>
			</div>
			
			<div className="column is-4 has-text-centered" >
			<p className="control">
                        <a className="button is-link is-small is-rounded" onClick={() => props.setOrderbookPair(2)} >
                            GBP - EUR
                        </a>
                    </p>
			</div>
			
			<div className="column is-4 has-text-centered" >
			<p className="control">
                        <a className="button is-link is-small is-rounded" onClick={() => props.setOrderbookPair(3)} >
                            USD - EUR
                        </a>
                    </p>
			</div>
			</div>
			
			<div className="panel-block is-paddingless is-12" >
			
			
			<div className="column is-6 has-text-centered" >
			<span className="tag is-large is-success" >
			Bids
			</span>
			</div>
			
			<div className="column is-6 has-text-centered" >
			<span className="tag is-large is-danger" >
			Asks
			</span>
			</div>
			</div>
            <div className="panel-block is-paddingless is-6" >
							
					
					
                <div className="column is-6" id="token-lists">
                    {
						
                        bids.map((bid,index) => {
                            return (
								
                                <div key={index} className="columns token">
									
                                    <div className="column has-text-centered">
                         
									Price:  {Psymbol} {(Number(bid.price)).toFixed(2)}
									
                                    </div>
									<div className="column has-text-centered">
                                   
									Amount: {Asymbol}  {((Number(bid.amount)).toFixed(2)/(Number(bid.price)).toFixed(2))} 
                                   
									</div>
								                                    
								 </div>
                            )
                        })
						}
						</div>	
						
					<div className="column is-6" id="token-lists">
                    {
						asks.map((ask,index) => {
                            return (
                                <div key={index} className="columns token">
                                    <div className="column has-text-centered">
                                    Price:   {Psymbol} {(Number(ask.price)).toFixed(2)}
                                    </div>
									<div className="column has-text-centered">
                                    Amount:   {Asymbol} {(Number(ask.amount)).toFixed(2)} 
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
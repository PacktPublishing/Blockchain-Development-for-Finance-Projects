import React from 'react';
import Timer from './Timer';


function Payment(props) {
	
	
	
					  
	let a = props.PaymentDetail.price / props.Conv;		
	let amount = a.toFixed(4);
	
					   
	return (
		
        <div className="panel-block is-paddingless is-12">
        
		<div className="column is-12" id="item-lists">
		
		<div className="column is-12 has-text-centered is-centered">
	  		                            Eth address
   		</div> 
		
		<div className="column is-12 has-text-centered "> 
		<span className="tag is-light is-medium">{props.mAddress}</span>
									
		</div>
									<div className=" column is-12 has-text-centered ">
		
                                        Amount
									</div>
		
		<div className="column is-12 has-text-centered"> 
		<span className="tag is-light is-medium">{amount}
		</span>
		</div>
		
		<Timer
		minutes={props.minutes}
        seconds={props.seconds}
		startTimer={props.startTimer}
		/>
		
		
		<div className="column is-8 is-offset-2">
		<div className="field is-grouped has-text-centered">
		
                    <p className="control">
                        <a className="button is-danger " 
                           onClick={() => props.closePayment()}>			
							Back</a>
                    </p>
			
                    <p className="control">
                        <a className="button is-warning " 
                            onClick={() => props.MMaskTransfer(props.mAddress,amount)}>
								Metamask Pay </a>
                    </p>
		
					<p className="control">
                        <a className="button is-info" 
                            onClick={() => props.PaymentWait(props.mAddress,amount)}>
								Other Wallets </a>
                    </p>					
		
		</div>
		</div>
		</div>
		</div>
		)
		
}

        

export default Payment;
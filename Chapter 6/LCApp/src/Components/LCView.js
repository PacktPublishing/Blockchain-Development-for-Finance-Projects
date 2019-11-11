import React from 'react';


function LCView(props) {
     //var DOI = props.LC[0].DOI*1000;
	 //var DOE = props.LC[0].DOE*1000;
	 var DOI = (new Date(props.LC[0].DOI*1000)).toISOString();
	 var DOE = (new Date(props.LC[0].DOE*1000)).toISOString();
	 var DOIssue=DOI.split("T",1);
	 var DOExpiry=DOE.split("T",1);
	return (
		<div>
        <div className="panel-block is-paddingless ">
            <div className="column is-24" id="token-lists">				
		
                                                                    
									<div className="column is-24 has-text-centered is-centered">
									
									SNo: {props.LC[0].LCNo}
                                    
									</div>	
									
									<div className="column is-12 has-text-centered is-centered">
									Buyer: {props.LC[0].BuyerAcc}
                                    </div>
									
									<div className="column is-12 has-text-centered is-centered">
									Seller: {props.LC[0].SellerAcc}
                                    </div>
									
									<div className="column is-12 has-text-centered is-centered">
									Current Amount: {props.LC[0].Amount} USD
                                    </div>
									
									<div className="column is-12 has-text-centered is-centered">
									Inital Amount: {props.LC[0].IniAmount} USD
                                    </div>
									
									<div className="column is-12 has-text-centered is-centered">
									Status: {props.LC[0].Status}
                                    </div>
									
									<div className="column is-12 has-text-centered is-centered">
									Date of Issue: {DOIssue}
                                    </div>
									
									<div className="column is-12 has-text-centered is-centered">
									Date of Expiry: {DOExpiry}
                                    </div>
									
									<div className="column is-12 has-text-centered is-centered">
									Document Hash Signature: {props.LC[0].DocHash}
                                    </div>
                                    
								 
						</div>
						</div>
						

<div className="panel-block is-paddingless is-12 ">
		<div className="column has-text-centered ">
				
			<div className="button" >    
									Submit 
									</div>
									
				<div className="button" onClick={() => props.closeViewTab()}>    
									Back 
									</div>
									
				
									
        </div>
		</div>
		</div> 
						
)
}
export default LCView;
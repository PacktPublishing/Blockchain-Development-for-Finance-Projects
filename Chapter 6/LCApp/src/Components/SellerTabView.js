import React from 'react';


function SellerTabView(props) {
    
	return (
		<div>
        <div className="panel-block is-paddingless">
            <div className="column is-24" id="token-lists">
			<div className="field is-grouped ">	
				<p className="control">
				<a className="button is-primary " onClick={() => props.SellerSessionSettle()}>    
									Settle LC
									</a>
									</p>	
		
				<p className="control">
				<a className="button is-primary " onClick={() => props.SellerSessionView()}>    
									View LC
									</a>
									</p>		
				
				
		</div>
				{
                        props.LCNew.map((LC,index) => {
							var DOI = (new Date(LC.DOI*1000)).toISOString();
	 						var DOE = (new Date(LC.DOE*1000)).toISOString();
	 						var DOIssue=DOI.split("T",1);
	 						var DOExpiry=DOE.split("T",1);							
							return (
                                <div key={index} className="columns token">
                                    
									<div className="column has-text-centered ">
									SNo: {LC.LCNo}
                                    </div>
									<div className="column has-text-centered">
									Buyer: 
									<span className="tag is-spaced">
									{LC.BAcc}
									</span>
                                    </div>
									<div className="column has-text-centered">
									Seller: 
									<span className="tag is-spaced">
									{LC.SAcc}
									</span>
                                    </div>
									<div className="column has-text-centered">
									Amount: {LC.Amount} USD
                                    </div>
									<div className="column has-text-centered">
									Status: {LC.Status}
                                    </div>
									<div className="column has-text-centered">
									Date of Issue: 
									<span className="tag is-spaced">
									{DOIssue}
                                    </span>
									</div>
									<div className="column has-text-centered">
									Date of Expiry: 
									<span className="tag is-spaced">
									{DOExpiry}
									</span>
                                    </div>
                                    <div className="column has-text-centered">
                                        <button onClick={() => props.viewSingleLC(LC.LCAdd) } className="button is-outlined is-small">
                                            View Details
                                        </button>
									</div>
									
									
                                    <div className="column has-text-centered">
                                        <button onClick={() => props.SellerSessionVSettle(LC.LCNo) } className="button is-outlined is-small">
                                            Settle LC
                                        </button>
									</div>	
								 </div>
                              )
})
}
						</div>
						</div>

<div className="panel-block is-paddingless is-12 ">
		<div className="column has-text-centered ">
				
				<div className="button" >    
									Submit 
									</div>
									
				
				<div className="button" onClick={() => props.closeTab()}>    
									Back 
									</div>
									
				
									
        </div>
		</div>
						</div> 
)
}
export default SellerTabView;
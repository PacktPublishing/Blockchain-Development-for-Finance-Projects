import React from 'react';


class TransHeader extends React.Component {

	
		

	
	render() {
	
	return (
	
<div className="columns">
					<div className="column is-small"  >
					<span className="tag is-info">
								Index
					</span>
                    </div>                
		
					<div className="column is-small"  >						
					<span className="tag is-info">
								
                                        Hash
					</span>		
					</div>
                                   
						<div className="column is-small is-1"  >
						<span className="tag is-info">
                                        Block No.
						</span>
                        </div>
						
						<div className="column is-small is-offset-1"  >
						<span className="tag is-info">		
                                        From
						</span>		
                                    </div>
								<div className="column is-small "  >
								<span className="tag is-info">
                                        Value
								</span>
			<span className="tag is-info">     
									Blocks
                                </span>
		
		<span className="tag is-info">
										Status
                                </span>    
                                    </div>
								
									</div>
									)
									}
									}
export default TransHeader;
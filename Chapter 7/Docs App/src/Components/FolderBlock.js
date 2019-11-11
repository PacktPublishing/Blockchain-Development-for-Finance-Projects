import React from 'react';

function FolderBlock(props) {
	props.startTimer();
    return (
		
        <div className="panel-block">
            <div className="panel-block is-paddingless is-12" >					
                <div>
                    {
                        props.files.map((file,index) => {
							
							var splitString = file.split("/"); 
    						var reverseArray = splitString.reverse();
							
                            return (
								<div className="panel-block is-multiline">
								<div className="column">
								
                                <div key={index} className="columns token">
                                		<div className="column">
										<strong>FileName </strong> 
								         : {reverseArray[0]}    
										</div>
										<div className="column">
										<strong> Path</strong> 
								         : {file}
                                    </div>
									</div>
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

export default FolderBlock;
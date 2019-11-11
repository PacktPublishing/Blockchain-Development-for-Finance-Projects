import React from 'react';

function FolderBlockChkStatus(props) {
	
    return (
		<div>
		<div className="panel-block">
		<div className="columns ">
                    <p className="column control">
                        <a className="button is-light" 
                           onClick={() => props.changeBView(1)}>
                            All Files
                        </a>
                    </p>
                    <p className="column control">
                        <a className="button is-light" 
                           onClick={() => props.changeBView(2)}>
                            Added Files
                        </a>
                    </p>
					<p className="column control">
                        <a className="button is-light" 
                           onClick={() => props.changeBView(3)}>
                            Removed Files
                        </a>
                    </p>
					<p className="column control">
                        <a className="button is-light" 
                           onClick={() => props.changeBView(4)}>
                            Tampered Files
                        </a>
                    </p>
                </div>
				</div>
{
          props.BView == 1?
			  
        <div className="panel-block">
            <div className="panel-block is-paddingless " >					
                <div>
                    {
                        props.verfile.map((f,index) => {
							
							var splitString = f.file.split("/"); 
    						var reverseArray = splitString.reverse();
							
                            return (
								<div className={f.status == 'Tampered' ? "has-background-danger" : "has-background-white"}>
			  					<div className="panel-block is-multiline">
								<div className="column">
								
                                <div key={index} className="columns token">
                                		<div className="column">
										<strong>FileName </strong> 
								         : {reverseArray[0]}    
										</div>
										<div className="column">
										<strong> Path</strong> 
								         : {f.file}
                                    	</div>
										<div className="column">
										<strong>Status </strong> 
								         : {f.status}
                                    	</div>
										<div className="column">
										<p className="control">
                        				<a className="button is-light" 
                           				onClick={() => props.changeBView(4)}>
                            			View in Folder
                        				</a>
                    					</p>
										<p className="control">
                        				<a className="button is-light" 
                           				onClick={() => props.changeBView(4)}>
                            			Accept Changes
                        				</a>
                    					</p>
										</div>
								</div>
								</div>
                                </div>
								</div>									
                            )
                        })
                    }
                </div>
            </div>
        </div>:

		props.BView == 2?
			  
        <div className="panel-block">
            <div className="panel-block is-paddingless " >					
                <div>
                    {
                        props.addFile.map((file,index) => {
							
							var splitString =  file.split("/"); 
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
										<div className="column">
										<p className="control">
                        				<a className="button is-light" 
                           				onClick={() => props.changeBView(4)}>
                            			View in Folder
                        				</a>
                    					</p>
										<p className="control">
                        				<a className="button is-light" 
                           				onClick={() => props.changeBView(4)}>
                            			Accept Changes
                        				</a>
                    					</p>
										</div>
										
								</div>
								</div>
								</div>
                            )
                        })
                    }
                </div>
            </div>
        </div>:	

		props.BView == 3?
			  
        <div className="panel-block">
            <div className="panel-block is-paddingless " >					
                <div>
                    {
                        props.remFile.map((file,index) => {
							
							var splitString =  file.split("/"); 
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
										<div className="column">
										<p className="control">
                        				<a className="button is-light" 
                           				onClick={() => props.changeBView(4)}>
                            			View in Folder
                        				</a>
                    					</p>
										<p className="control">
                        				<a className="button is-light" 
                           				onClick={() => props.changeBView(4)}>
                            			Accept Changes
                        				</a>
                    					</p>
										</div>

								</div>
								</div>
								</div>									
                            )
                        })
                    }
                </div>
            </div>
        </div>:	

			  
        <div className="panel-block">
            <div className="panel-block is-paddingless " >					
                <div>
                    {
                        props.verfile.map((f,index) => {
							
							var splitString = f.file.split("/"); 
    						var reverseArray = splitString.reverse();
							
                return (
								<div className={f.status == 'Not Tampered' ? "is-hidden" : 
												"has-background-white" }>
								<div className="panel-block is-multiline">
								<div className="column">
								 
                                <div key={index} className="columns token">
                                		<div className="column">
										<strong>FileName </strong> 
								         : {reverseArray[0]}    
										</div>
										<div className="column">
										<strong> Path</strong> 
								         : {f.file}
                                    	</div>
										<div className="column">
										<strong>Status </strong> 
								         : {f.status}
                                    	</div>
										<div className="column">
										<p className="control">
                        				<a className="button is-light" 
                           				onClick={() => props.changeBView(4)}>
                            			View in Folder
                        				</a>
                    					</p>
										<p className="control">
                        				<a className="button is-light" 
                           				onClick={() => props.changeBView(4)}>
                            			Accept Changes
                        				</a>
                    					</p>
										</div>
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
          }
          </div>
)
		                  
}
    
export default FolderBlockChkStatus;
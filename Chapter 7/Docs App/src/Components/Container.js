import React, { Component } from 'react';
import PathMapper from './PathMapper';
import FolderBlock from './FolderBlock';
import FolderBlockChkStatus from './FolderBlockChkStatus';
import PanelHeader from './PanelHeader';
import GlowBar from './GlowBar';

class Container extends Component {
	

    render(){
		//console.log(this);
        return (
            <section className="container">
                <div className="columns">
                    <div className="column">
                        <div className="panel ">
                            

                            
                            {
                                this.props.DirPath == null?
                                    <div>
                                    <PathMapper setDir={this.props.setDir} 
								  	fields={this.props.fields}
									hashFile={this.props.hashFile}
									onInputChangeUpdateField={this.props.onInputChangeUpdateField}/>
                                    </div> :
			
									this.props.vstatus == true?
									<div>
										<PanelHeader DirPath={this.props.DirPath} />
										<GlowBar fstatus={this.props.fstatus} />
                                        <FolderBlockChkStatus verfile={this.props.verfile}
													 addFile={this.props.addFile}
													 remFile={this.props.remFile}
													 BView={this.props.BView}
													 changeBView={this.props.changeBView}
												     DirPath={this.props.DirPath} /> 
									</div>:    
			
									<div>
										<PanelHeader DirPath={this.props.DirPath} />
										<GlowBar fstatus={this.props.fstatus} />
                                        <FolderBlock files={this.props.files}
												     DirPath={this.props.DirPath} 
													startTimer ={this.props.startTimer} />								/> 
									</div>
                                    
                            }
                            
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Container;
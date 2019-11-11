import React, { Component } from 'react';
import AddressBar from './AddressBar';
import TokenBlock20 from './TokenBlock20';
import TokenBlock721 from './TokenBlock721';
import SortTokenBlock from './SortTokenBlock';
import TransferHeader from './TransferHeader';
import TransferToken from './TransferToken';
import MintHeader from './MintHeader';
import MintToken from './MintToken';
import ApproveHeader from './ApproveHeader';
import ApproveToken from './ApproveToken';
import SuccessTransaction from './SuccessTransaction';

class Container extends Component {


    render(){
        return (
            <section className="container">
                <div className="columns"> 
                    <div className="is-half column">
                        <div className="panel is-multiline">
                            {
                                this.props.tx20 ?
                                    <SuccessTransaction tx20={this.props.tx20} /> :
                                    ''
                            }

                            <AddressBar account={this.props.account} tx20={this.props.tx20}/>
                            {
                                this.props.transferDetail20.hasOwnProperty('name') ?
									
                                    <div>
                                        <TransferHeader token={this.props.transferDetail20} />
                                        <TransferToken closeTransfer={this.props.closeTransfer}
                                                       transferDetail20={this.props.transferDetail20}
                                                       fields={this.props.fields}
                                                       account={this.props.account}
                                                       Transfer={this.props.Transfer}
                                                       inProgress={this.props.inProgress}
                                                       defaultGasPrice={this.props.defaultGasPrice}
                                                       defaultGasLimit={this.props.defaultGasLimit}
                                                       onInputChangeUpdateField={this.props.onInputChangeUpdateField}/>
									</div> :
								
								this.props.mintDetail20.hasOwnProperty('name') ?
									
									<div>
                                        <MintHeader token={this.props.mintDetail20} />
                                        <MintToken closeTransfer={this.props.closeTransfer}
                                                       mintDetail20={this.props.mintDetail20}
                                                       fields={this.props.fields}
                                                       account={this.props.account}
                                                       Mint={this.props.Mint}
                                                       inProgress={this.props.inProgress}
                                                       defaultGasPrice={this.props.defaultGasPrice}
                                                       defaultGasLimit={this.props.defaultGasLimit}
                                                       onInputChangeUpdateField={this.props.onInputChangeUpdateField}/>
									</div> :
								
								this.props.approveDetail20.hasOwnProperty('name') ?
							
									<div>
                                        <ApproveHeader token={this.props.approveDetail20} />
                                        <ApproveToken closeTransfer={this.props.closeTransfer}
                                                       approveDetail20={this.props.approveDetail20}
                                                       fields={this.props.fields}
                                                       account={this.props.account}
                                                       Approve={this.props.Approve}
                                                       inProgress={this.props.inProgress}
                                                       defaultGasPrice={this.props.defaultGasPrice}
                                                       defaultGasLimit={this.props.defaultGasLimit}
                                                       onInputChangeUpdateField={this.props.onInputChangeUpdateField}/>
									</div> :
								
							
                                    <div className={this.props.tx20 ? 'is-hidden' : ''}>
                                        
										<SortTokenBlock />
                                        <TokenBlock20 newTransfer20={this.props.newTransfer20} newApprove20={this.props.newApprove20} newMint20={this.props.newMint20} tokens20={this.props.tokens20}/>					
                                    </div>
                            }
							
                            
                        </div>
                        </div>
						<div className="is-half is-offset-one-half column">
                        <div className="panel">
							{
                                this.props.tx721 ?
                                    <SuccessTransaction tx721={this.props.tx721} /> :
                                    ''
                            }

                            <AddressBar account={this.props.account} tx721={this.props.tx721}/>
								{
                            	this.props.transferDetail721.hasOwnProperty('name') ?
									
                                    <div>
                                        <TransferHeader token={this.props.transferDetail721} />
                                        <TransferToken closeTransfer={this.props.closeTransfer}
                                                       transferDetail721={this.props.transferDetail721}
                                                       fields={this.props.fields}
                                                       account={this.props.account}
                                                       Transfer={this.props.Transfer}
                                                       inProgress={this.props.inProgress}
                                                       defaultGasPrice={this.props.defaultGasPrice}
                                                       defaultGasLimit={this.props.defaultGasLimit}
                                                       onInputChangeUpdateField={this.props.onInputChangeUpdateField}/>
									</div>:
									
								this.props.mintDetail721.hasOwnProperty('name') ?

									<div>
                                        <MintHeader token={this.props.mintDetail721} />
                                        <MintToken closeTransfer={this.props.closeTransfer}
                                                       mintDetail721={this.props.mintDetail721}
                                                       fields={this.props.fields}
                                                       account={this.props.account}
                                                       Mint={this.props.Mint}
                                                       inProgress={this.props.inProgress}
                                                       defaultGasPrice={this.props.defaultGasPrice}
                                                       defaultGasLimit={this.props.defaultGasLimit}
                                                       onInputChangeUpdateField={this.props.onInputChangeUpdateField}/>
									</div>:
								
								this.props.approveDetail721.hasOwnProperty('name')?
								
									<div>
                                        <ApproveHeader token={this.props.approveDetail721} />
                                        <ApproveToken closeTransfer={this.props.closeTransfer}
                                                       approveDetail721={this.props.approveDetail721}
                                                       fields={this.props.fields}
                                                       account={this.props.account}
                                                       Approve={this.props.Approve}
                                                       inProgress={this.props.inProgress}
                                                       defaultGasPrice={this.props.defaultGasPrice}
                                                       defaultGasLimit={this.props.defaultGasLimit}
                                                       onInputChangeUpdateField={this.props.onInputChangeUpdateField}/>
									</div>:
															
                                    <div className={this.props.tx721 ? 'is-hidden' : ''}>
                                        
										<SortTokenBlock />
                                        <TokenBlock721 newTransfer721={this.props.newTransfer721} newApprove721={this.props.newApprove721} newMint721={this.props.newMint721} tokens721={this.props.tokens721}/>					
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
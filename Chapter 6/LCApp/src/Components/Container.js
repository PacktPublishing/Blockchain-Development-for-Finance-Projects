import React, { Component } from 'react';
import AddressBar from './AddressBar';
import BankLogin from './BankLogin';
import BuyerTabView from './BuyerTabView';
import BankTabCreate from './BankTabCreate';
import BankTabView from './BankTabView';
import LCView from './LCView';
import SellerTabView from './SellerTabView';
import SellerTabSettle from './SellerTabSettle';


class Container extends Component {

	
    render(){
		
        return (
            <section className="container">
                <div className="columns">
                    <div className="column">
                        <div className="panel">
		
						<AddressBar account={this.props.account} />
						
                            		
									 
							
			{
			

							this.props.role == 'Buyer' && this.props.option == 'View'?
									<div>   
                                        <BuyerTabView onInputChangeUpdateField={this.props.onInputChangeUpdateField}
								   				   BuyerSessionView = {this.props.BuyerSessionView}
													viewSingleLC = {this.props.viewSingleLC}
													LCNew={this.props.LCNew}
													closeTab={this.props.closeTab}
					               				   />
                					</div>:
			
							this.props.role == 'Bank' && this.props.option == 'Create'?
									<div>   
                                        <BankTabCreate onInputChangeUpdateField={this.props.onInputChangeUpdateField}
								   				   BankSessionCreate = {this.props.BankSessionCreate}
												   BankSessionView = {this.props.BankSessionView}
												   createLC={this.props.createLC}
												   fields={this.props.fields}
												   closeTab={this.props.closeTab}											
					               				   />
                					</div>:
							this.props.role == 'Bank' && this.props.option == 'View'?
									<div>   
                                        <BankTabView onInputChangeUpdateField={this.props.onInputChangeUpdateField}
								   				   BankSessionCreate = {this.props.BankSessionCreate}
												   BankSessionView = {this.props.BankSessionView}
												   viewSingleLC = {this.props.viewSingleLC}
												   LCNew={this.props.LCNew}
													closeTab={this.props.closeTab}
					               				   />
                					</div>:
							this.props.role == 'Seller' && this.props.option == 'View'?
									<div>   
                                        <SellerTabView onInputChangeUpdateField={this.props.onInputChangeUpdateField}
								   				   SellerSessionSettle = {this.props.SellerSessionSettle}
												   SellerSessionVSettle = {this.props.SellerSessionVSettle}
												   SellerSessionView = {this.props.SellerSessionView}
												   closeTab={this.props.closeTab}
												   viewSingleLC = {this.props.viewSingleLC}
												   LCNew={this.props.LCNew}
											       />
									</div>:
							this.props.role == 'Seller' && this.props.option == 'Settle'?
									<div>   
                                        <SellerTabSettle onInputChangeUpdateField={this.props.onInputChangeUpdateField}
								   				   SellerSessionSettle = {this.props.SellerSessionSettle}
													SellerSessionView = {this.props.SellerSessionView}
													LC = {this.props.LC}
													settleLC={this.props.settleLC}
													fields={this.props.fields}
												/>
									</div>:
							this.props.option == 'ViewSingleLC'?
									<div>   
                                        <LCView onInputChangeUpdateField={this.props.onInputChangeUpdateField}
								   				   
												   LC = {this.props.LC}	
												   viewSingleLC = {this.props.viewSingleLC}
													closeViewTab={this.props.closeViewTab}
					               				   />
                					</div>:
                                    <div>   
                                        <BankLogin BuyerSessionView ={this.props.BuyerSessionView}
								   				   BankSessionCreate = {this.props.BankSessionCreate}
					               				   SellerSessionSettle = {this.props.SellerSessionSettle}/>
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
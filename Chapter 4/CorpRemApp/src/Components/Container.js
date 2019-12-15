import React, { Component } from 'react';
import AddressBar from './AddressBar';
import Transfer from './Transfer';
import AppLogin from './AppLogin';
import ViewTransactions from './ViewTransactions';


class Container extends Component {
	

	
    render(){
		
        return (
            <section className="container">
                <div className="columns is-12"> 
                    <div className="column is-12">
                        <div className="panel is-multiline is-12">
                            <AddressBar account={this.props.account}
								   balance={this.props.balance}/>
			{
			
			this.props.account && this.props.ViewFlag == 1?
			<div>
				<Transfer payment = {this.props.payment}
				TabView={this.props.TabView}
				onInputChangeUpdateField={this.props.onInputChangeUpdateField}
				fields={this.props.fields}
				txstatus={this.props.txstatus}
				onChangeHandlerBOE={this.props.onChangeHandlerBOE}
			    onChangeHandlerInv={this.props.onChangeHandlerInv}
			    onChangeHandlerDoc={this.props.onChangeHandlerDoc}
			    DocFname={this.props.DocFname}
			    InvFname={this.props.InvFname}
			    BOEFname={this.props.BOEFname}/>
			</div>:
			this.props.account && this.props.ViewFlag == 2?
			<div>
			<ViewTransactions TabView={this.props.TabView}
			TransFlag={this.props.TransFlag}
			TransSet={this.props.TransSet}
			trans={this.props.trans}/>
			</div>:
			<div>
			<AppLogin setAccount = {this.props.setAccount}
			onInputChangeUpdateField={this.props.onInputChangeUpdateField}
			fields={this.props.fields}/>
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
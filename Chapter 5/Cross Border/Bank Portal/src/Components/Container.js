import React, { Component } from 'react';
import AddressBar from './AddressBar';
import Transfer from './Transfer';
import AppLogin from './AppLogin';
import BankUser from './BankUser';


class Container extends Component {


    render(){
		
        return (
            <section className="container">
                <div className="columns"> 
                    <div className="is-half is-offset-3 column">
                        <div className="panel is-multiline">
                            <AddressBar account={this.props.account}
								   balance={this.props.balance}/>
			{
			this.props.receivedtx?
			<div>
				<BankUser receivedtx = {this.props.receivedtx}
				/>
			</div>:
			this.props.account?
			<div>
				<Transfer payment = {this.props.payment}
				chkaddr = {this.props.chkaddr}			
				onInputChangeUpdateField={this.props.onInputChangeUpdateField}
				fields={this.props.fields}
				txstatus={this.props.txstatus}
			    txid={this.props.txid}/>
			</div>:
			<div>
			<AppLogin setAccount = {this.props.setAccount}
					  setBank = {this.props.setBank}	
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
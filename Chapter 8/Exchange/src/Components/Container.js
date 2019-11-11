import React, { Component } from 'react';
import AddressBar from './AddressBar';
import TradePanel from './TradePanel';
import Orderbook from './Orderbook';



class Container extends Component {


    render(){
		
        return (
            <section className="container">
                <div className="columns"> 
                    <div className="is-half is-offset-one-quarter column">
                        <div className="panel is-multiline">
                            <AddressBar account={this.props.account}
										setBalance={this.props.setBalance}
										AuBalance={this.props.AuBalance}
										USDBalance={this.props.USDBalance}/>
							<div>
							<Orderbook buys={this.props.buys} 
									   sells={this.props.sells}/>
							<TradePanel onInputChangeUpdateField={this.props.onInputChangeUpdateField}
											fields={this.props.fields}
											Buy={this.props.Buy}
											Sell={this.props.Sell}/>
							</div>
                            
                        </div>
                        </div>
						</div>
            </section>
        )
    }
}

export default Container;
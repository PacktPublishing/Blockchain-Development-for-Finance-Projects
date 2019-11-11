import React, { Component } from 'react';
import AddressBar from './AddressBar';
import TradePanel from './TradePanel';
import Orderbook from './Orderbook';
import Trades from './Trades';
import AppLogin from './AppLogin';


class Container extends Component {


    render(){
		
        return (
            <section className="container">
                <div className="columns"> 
                    <div className="is-half is-offset-1 column">
                        <div className="panel is-multiline">
                            <AddressBar account={this.props.account}
								   GBPBalance={this.props.GBPBalance}
								   USDBalance={this.props.USDBalance}
								   EURBalance={this.props.EURBalance}/>
			{
			this.props.account?
			<div>
			<Orderbook
			assets = {this.props.assets}
			bids = {this.props.bids}
			asks = {this.props.asks}
			base = {this.props.base}
		    counter = {this.props.counter}
			setOrderbookPair = {this.props.setOrderbookPair}
			bidsUSDGBP={this.props.bidsUSDGBP}
			asksUSDGBP={this.props.asksUSDGBP}
			bidsUSDEUR={this.props.bidsUSDEUR}
			asksUSDEUR={this.props.asksUSDEUR}
			bidsGBPEUR={this.props.bidsGBPEUR}
			asksGBPEUR={this.props.asksGBPEUR}/>
			<TradePanel 
			onInputChangeUpdateField={this.props.onInputChangeUpdateField}
				fields={this.props.fields}
				Buy = {this.props.Buy}
				Sell = {this.props.Sell}/>
			</div>:
			<div>
			<AppLogin setAccount = {this.props.setAccount}
				onInputChangeUpdateField={this.props.onInputChangeUpdateField}
				fields={this.props.fields}/>
			</div>
			}
						
                            
                        </div>
                        </div>
			
	<div className="column is-4">
             <div className="panel">
			<Trades tradesList={this.props.tradesList}/>
			</div>
			</div>
			</div>
            </section>
        )
    }
}

export default Container;
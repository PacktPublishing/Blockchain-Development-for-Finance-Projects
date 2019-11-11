import React, { Component } from 'react';
import StellarSdk from 'stellar-sdk';
import Nav from './Components/Nav';
import Description from './Components/Description';
import Container from './Components/Container';
import assets from './Components/Assets';



class App extends Component {
    constructor(){
        super();
        this.appName = 'Currency Exchange';
		this.onInputChangeUpdateField = this.onInputChangeUpdateField.bind(this);
        this.assets = assets;
		this.USD = new StellarSdk.Asset(this.assets[0].code,this.assets[0].issuer);
		this.GBP = new StellarSdk.Asset(this.assets[1].code,this.assets[1].issuer);
		this.EUR = new StellarSdk.Asset(this.assets[2].code,this.assets[2].issuer);
		
		this.state = {
            	
            network: 'Private Testnet',
            account: null,
			
			bidsUSDGBP: [], 
			asksUSDGBP: [],
			bidsGBPEUR: [], 
			asksGBPEUR: [],
			bidsUSDEUR: [], 
			asksUSDEUR: [],
			tradesList: [],
			counter: this.USD,
			base: this.GBP,	 

			
            GBPBalance: 0,
			USDBalance: 0,
			EURBalance: 0,
			     fields: {
				friendlyid: null,	 
				buyprice: null,
                buyamount: null,
				sellprice: null,
                sellamount: null,
				            }
		}
            
       
		}
		
  
  
	
Buy = () => {
	
	let app = this;
	let amount = this.state.fields.buyamount;
	let price = this.state.fields.buyprice;
	
	
app.server.fetchBaseFee()
	.then(function(fee){

	app.server.loadAccount(app.state.account)
.then(function(account){
	console.log(app.state.base);
	console.log(app.state.counter);
	
		
	var transaction = new StellarSdk.TransactionBuilder(account,{ fee, networkPassphrase: app.passphrase})
						.addOperation(StellarSdk.Operation.manageBuyOffer({
        					selling: app.state.base,
							buying: app.state.counter,
        					buyAmount: amount,
        					price: price,
							offerId : 0
      					}))
						.setTimeout(100)
        				.build();	
	
						let keypair = StellarSdk.Keypair.fromSecret(app.state.fields.secretkey);
						console.log(transaction);
						transaction.sign(keypair);
    					return app.server.submitTransaction(transaction)}).
						then(function(response,error)
			{
				if(response)
				{
					console.log("Transaction response", response);
					app.setBalance(app.state.account)
				}
				else
				{
					console.log("Error",error);
				}
	})});

}

Sell = () => {
	
	let app = this;
	let amount = this.state.fields.sellamount;
	let price = this.state.fields.sellprice;
	
	
app.server.fetchBaseFee()
	.then(function(fee){

	app.server.loadAccount(app.state.account)
.then(function(account){
	console.log(app.state.base);
	console.log(app.state.counter);
	console.log(app.passphrase);	
		
	var transaction = new StellarSdk.TransactionBuilder(account,{ fee, networkPassphrase: app.passphrase})
						.addOperation(StellarSdk.Operation.manageSellOffer({
        					selling: app.state.counter,
							buying: app.state.base,
        					amount: amount,
        					price: price,
							offerId : 0
      					}))
						.setTimeout(100)
        				.build();	
	
						let keypair = StellarSdk.Keypair.fromSecret(app.state.fields.secretkey);
						console.log(transaction);
						transaction.sign(keypair);
    					return app.server.submitTransaction(transaction)}).
						then(function(response,error)
			{
				if(response)
				{
					console.log("Transaction response", response);
					app.setBalance(app.state.account)
				}
				else
				{
					console.log("Error",error);
				}
	})});

}


setAccount = () => {
        
	var account = 
		StellarSdk.Keypair.fromSecret(this.state.fields.secretkey).publicKey()
	
        this.setState({
            account
        });
    this.setBalance(account);
	this.setOrderbook();
	this.setTrades();

	};    


setOrderbookPair = (pair) => {

	if(pair == 1)
	{
		
		this.setState
		({
            counter: this.USD,
			base: this.GBP
        });
	}
		else if	(pair == 2)
    {
		
		this.setState
		({
            counter: this.GBP,
			base: this.EUR
        });
	}
		else if	(pair == 3)
    {
		
		this.setState
		({
            counter: this.USD,
			base: this.EUR
        });
	}
	
	else
	{
		console.log("Invalid Orderbook Pair");
	}	
this.setOrderbook();	
}

setTrades = () => {
       
let app = this;
	
	var tradeHandler = function (traderesponse) {
									var tradesList = app.state.tradesList; 
										tradesList.push(traderesponse);
									
									
								app.setState
	                            ({
            					tradesList	
        						});
								
							};
	
	
	
var es = this.server.trades()
  .cursor('now')
  .stream({	  
    onmessage: tradeHandler
  })

 };


setOrderbook = () => {
       
let app = this;
	
	var orderbookHandler = function (orderbookResponse) {
								
								if (orderbookResponse.base.asset_code == 'USD' && orderbookResponse.counter.asset_code == 'GBP')
								{
								var bidsUSDGBP = orderbookResponse.bids;
								var asksUSDGBP = orderbookResponse.asks;
								app.setState
	                            ({
            					bidsUSDGBP,
								asksUSDGBP	
        						});
								}
								else if (orderbookResponse.base.asset_code == 'USD' && orderbookResponse.counter.asset_code == 'EUR')
								{
								var bidsUSDEUR = orderbookResponse.bids;
								var asksUSDEUR = orderbookResponse.asks;
								app.setState
	                            ({
            					bidsUSDEUR,
								asksUSDEUR	
        						});
								}
								else if (orderbookResponse.base.asset_code == 'GBP' && orderbookResponse.counter.asset_code == 'EUR')
								{
								var bidsGBPEUR = orderbookResponse.bids;
								var asksGBPEUR = orderbookResponse.asks;
								app.setState
	                            ({
            					bidsGBPEUR,
								asksGBPEUR	
        						});
								}
								else
								{
									console.log("Invalid orderbook pair");
								}
							};
	
	
var es1 = this.server.orderbook(app.USD,app.GBP)
  .cursor('now')
  .stream({
    onmessage: orderbookHandler
  })

var es2 = this.server.orderbook(app.GBP,app.EUR)
  .cursor('now')
  .stream({
    onmessage: orderbookHandler
  })
var es3 = this.server.orderbook(app.USD,app.EUR)
  .cursor('now')
  .stream({
    onmessage: orderbookHandler
  })
  
 };


setBalance = (account) => {
	let app=this;

	var d = new URL(account,'http://127.0.0.1:8000/accounts/');
	
    (async function  main(){
		await fetch(d)
		.then(response => response.json())
		.then(data => {
			var balance = data.balances
			console.log("data",data);
			balance.forEach((balance) => {
				if(balance.asset_code == 'GBP')
				{
				
				let GBPBalance = Number(balance.balance).toFixed(2);	
				app.setState({
            		GBPBalance
        				});
						}	
				else if(balance.asset_code == 'EUR')
				{
				let EURBalance = Number(balance.balance).toFixed(2);
				app.setState({
            		EURBalance
        				});
						}	
				else if(balance.asset_code == 'USD')
				{
				let USDBalance = Number(balance.balance).toFixed(2);
				app.setState({
            		USDBalance
        				});
						}
				else
				console.log("Native Asset");
				})
								
		});
	})();	
}



onInputChangeUpdateField = (name,value) => {
        let fields = this.state.fields;

        fields[name] = value;

        this.setState({
            fields
        });
    };

    componentDidMount(){
		
		this.server = new StellarSdk.Server('http://127.0.0.1:8000', {allowHttp: true});
		this.passphrase = 'Standalone Network ; February 2017';
		
		
			
		
	}
							   
		
		 
						   
						   
    render() {
        
       
                return (
                    <div>
                        <Nav appName={this.appName} network={this.state.network} />
                        <Description />
                        <Container onInputChangeUpdateField={this.onInputChangeUpdateField}
                                   account={this.state.account}
								   base={this.state.base}
								   counter={this.state.counter}
								   setBalance={this.setBalance}
								   assets={this.assets}
								   tradesList={this.state.tradesList}
								   GBPBalance={this.state.GBPBalance}
								   USDBalance={this.state.USDBalance}
								   EURBalance={this.state.EURBalance}
								   bidsUSDGBP={this.state.bidsUSDGBP}
								   asksUSDGBP={this.state.asksUSDGBP}
					               bidsUSDEUR={this.state.bidsUSDEUR}
								   asksUSDEUR={this.state.asksUSDEUR}
					               bidsGBPEUR={this.state.bidsGBPEUR}
								   asksGBPEUR={this.state.asksGBPEUR}
								   setOrderbookPair = {this.setOrderbookPair}
								   Buy={this.Buy}
								   Sell={this.Sell}	
								   fields={this.state.fields}
								   setAccount={this.setAccount}/>
								   
								                       </div>
                )
            
    }
}
export default App;

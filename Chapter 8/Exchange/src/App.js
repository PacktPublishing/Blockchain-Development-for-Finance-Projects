import React, { Component } from 'react';
import Web3 from 'web3'

import Nav from './Components/Nav';
import Description from './Components/Description';
import Container from './Components/Container';
import OrderbookABI from './Contracts/OrderbookABI';
import Gold from './Contracts/Gold';
import USD from './Contracts/USD';


class App extends Component {
    constructor(){
        super();
        this.appName = 'Exchange';
		this.watchweb3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'))
        this.isWeb3 = true;
		this.OrderbookABI = OrderbookABI;
		this.Gold = Gold;
		this.USD = USD;
        this.onInputChangeUpdateField = this.onInputChangeUpdateField.bind(this);
		this.setBalance = this.setBalance.bind(this);
        this.state = {
            
			
            network: 'Checking...',
            account: null,
			buys: [],
			sells: [],
			AuBalance: 0,
			USDBalance: 0,
            lastBlock: 0,			
			     fields: {
				buyprice: null,
                buyamount: null,
				sellprice: null,
                sellamount: null
            }
            
        };
		}
  
    		
	
	
	
    setNetwork = () => {
        let networkName,that = this;

        this.web3.eth.net.getNetworkType(function (err, networkId) {
            switch (networkId) {
                case "1":
                    networkName = "Main";
                    break;
                case "2":
                    networkName = "Morden";
                    break;
                case "3":
                    networkName = "Ropsten";
                    break;
                case "4":
                    networkName = "Rinkeby";
                    break;
                case "42":
                    networkName = "Kovan";
                    break;
                default:
                    networkName = networkId;
            }

            that.setState({
                network: networkName
            })
        });
    };





	closeTransfer = () => {
        	this.setState({
            transferDetail20: {},
            fields: {},
        })
	};



setBalance = () => {
	
	let app = this;
	
    var contractUSD = new this.web3.eth.Contract(app.USD.abi,app.USD.address); 			
	contractUSD.methods.balanceOf(app.web3.eth.defaultAccount).call().then(function(response){
	
		if(response)
		{
			let USDBalance = response;
	app.setState({
            USDBalance
        })
		}
	})
												
	var contractGold = new this.web3.eth.Contract(app.Gold.abi,app.Gold.address);

	contractGold.methods.balanceOf(app.web3.eth.defaultAccount).call().then(function(response){
	
	if(response)
		{
			let AuBalance = response;
	app.setState({
            AuBalance
        })
		}
	})
}




    resetApp = () => {
      this.setState({            			
			     fields: {
                price: null,
                amount: null,				
                gasPrice: null,
                gasLimit: null,
            }
	  })
		
    };

	Sell = () => {
		console.log(" Sell Fired");
		
		let app = this;
		let amount = this.state.fields.sellamount;
		let price = this.state.fields.sellprice;
		var contractGold = new this.web3.eth.Contract(app.Gold.abi,app.Gold.address);
		var contractOB = new this.web3.eth.Contract(app.OrderbookABI.abi,app.OrderbookABI.address);
		var buys = app.state.buys; 
		
		if(buys.length == 0 )
		{

		contractGold.methods.approve(app.OrderbookABI.address,amount*100)
				.send({from: app.web3.eth.defaultAccount}).then(function(response){
				
					if(response) {
					contractOB.methods.addSell(amount,price)
					.send({from: app.web3.eth.defaultAccount}).then(function(response){
							console.log(response);
							app.setBalance();
							app.resetApp();
					})
					}
				})
		}
		
		else
		{
		
		var i = 0;
		let OrderPrice = buys[i].Price;
			
		if ( price > OrderPrice)
			{
			
			contractGold.methods.approve(app.OrderbookABI.address,amount*100)
				.send({from: app.web3.eth.defaultAccount}).then(function(response){
				
					if(response) {
					contractOB.methods.addSell(amount,price)
					.send({from: app.web3.eth.defaultAccount}).then(function(response){
							console.log(response);
							app.setBalance();
							app.resetApp();
					})
					}
				})			
			}
		else	
			{
			
				contractGold.methods.approve(app.OrderbookABI.address,amount*100)
				.send({from: app.web3.eth.defaultAccount}).then(function(response){
					
					if(response) {

		while ( i < buys.length)
		{
			var counter = i;
			OrderPrice = buys[i].Price;
			var OrderAmount = buys[i].Amount;
			
			if (amount >= OrderAmount)
			{
						
					contractOB.methods.trade(buys[counter].OrderNo,OrderAmount
								 			,OrderPrice, 2)
					.send({from: app.web3.eth.defaultAccount}).then(function(response){
							console.log(response);
							app.setBalance();
							app.resetApp();
					})
				
				amount = amount - OrderAmount;
			}
			
			else 
			{
						
					contractOB.methods.trade(buys[counter].OrderNo,amount
								 			,OrderPrice, 2)
					.send({from: app.web3.eth.defaultAccount}).then(function(response){
							console.log(response);
							app.setBalance();
							app.resetApp();
					})
				
			amount = 0;
			}			
				
			i++;
			
			
			
			if ( i < app.state.buys.length)
			{
			OrderPrice = buys[i].Price;	
			if (price > OrderPrice && amount > 0 )
			{
				
					contractOB.methods.addSell(amount,price)
					.send({from: app.web3.eth.defaultAccount}).then(function(response){
							console.log(response);
							app.setBalance();
							app.resetApp();
					})
			}
				
					
			if (amount == 0 || price > OrderPrice)
			{
			 	i = app.state.buys.length;
		  	}
			}	
		}
		}
		})
		}
		}
	}
		
		Buy = () => {
		console.log(" Buy Fired");
		
		let app = this;
		let amount = this.state.fields.buyamount;
		let price = this.state.fields.buyprice;
		var contractUSD = new this.web3.eth.Contract(app.USD.abi,app.USD.address);
		var contractOB = new this.web3.eth.Contract(app.OrderbookABI.abi,app.OrderbookABI.address);
		var sells = app.state.sells; 
		
		if(sells.length == 0 )
		{

		contractUSD.methods.approve(app.OrderbookABI.address,amount*price*100)
				.send({from: app.web3.eth.defaultAccount}).then(function(response){
				
					if(response) {
					contractOB.methods.addBuy(amount,price)
					.send({from: app.web3.eth.defaultAccount}).then(function(response){
							console.log(response);
							app.setBalance();
							app.resetApp();
					})
					}
				})
		}
		
		else
		{
		var i = 0;
		let OrderPrice = sells[i].Price;
			
		if (OrderPrice > price)
			{
			
					
			contractUSD.methods.approve(app.OrderbookABI.address,amount*price*100)
				.send({from: app.web3.eth.defaultAccount}).then(function(response){
				
					if(response) {
					contractOB.methods.addBuy(amount,price)
					.send({from: app.web3.eth.defaultAccount}).then(function(response){
							console.log(response);
							app.setBalance();
							app.resetApp();
					})
					}
				})			
			}
		else	
			{
				
		contractUSD.methods.approve(app.OrderbookABI.address,
											amount*price*100)
				.send({from: app.web3.eth.defaultAccount}).then(function(response){
				if(response) {
		while ( i < sells.length  )
		{
			var counter = i;
			OrderPrice = sells[i].Price;
			var OrderAmount = sells[i].Amount; 
			
			if (amount >= OrderAmount)
			{
				
					contractOB.methods.trade(sells[counter].OrderNo,OrderAmount
								 			,OrderPrice, 1)
					.send({from: app.web3.eth.defaultAccount}).then(function(response){
							console.log(response);
							app.setBalance();
							app.resetApp();
					})
					
			amount = amount - OrderAmount;
			
			}
				
	
			else 
			{
				
			
			contractOB.methods.trade(sells[counter].OrderNo,amount
								 			,OrderPrice, 1)
					.send({from: app.web3.eth.defaultAccount}).then(function(response){
							console.log(response);
							app.setBalance();
							app.resetApp();
					})
				
			amount = 0;
			}
					
			i++;
			
			
			
			if ( i < sells.length )
			{
				OrderPrice = sells[i].Price;
			if (OrderPrice > price && amount > 0 )
			{

					contractOB.methods.addBuy(amount,price)
					.send({from: app.web3.eth.defaultAccount}).then(function(response){
							console.log(response);
							app.setBalance();
							app.resetApp();
					})
			}
			
			if (amount == 0 || OrderPrice > price)
			{
			 	i = sells.length ;
		  	}
			}
		}
		}
		})
		}
		}
		}	
		
			
		
				
		

setOrderbook = () =>
		{
		let app = this;
		var lastBuy;
		var lastSell;	
		var contract = new this.watchweb3.eth.Contract(this.OrderbookABI.abi,this.OrderbookABI.address);	
        contract.methods.viewLengthBuy().call().then(function(response){
			if(response) {
				
				lastBuy = response;
				
					 			 
			if (lastBuy >= 1)
			{
			app.setState({
                        buys: [],
                    	})	
								
				for (let i = 1; i <= lastBuy ; i++)
		{
			
			contract.methods.viewBuy(i).call().then(function(response){
			if(response) {
						
						let OrderNo = i;	
    					let Amount = Number(response[0]);
						let Price = Number(response[1]);
						let TimeStamp = Number(response[2]);	
						
						if (  Amount > 0)
						{
							
								
						
	
						let buys = app.state.buys;
							
				
						buys.push({
                        OrderNo,
						Amount,
                        Price,
                        TimeStamp
                    });
					
							
                    app.setState({
                        buys
                    })
						
				
			
			
			if (i == lastBuy)
			{
				
				let buys = app.state.buys
				buys.sort(function (a, b) {
				
					if(a.Price == b.Price)
					{
						return (a.TimeStamp > b.TimeStamp) ? 1 : (a.TimeStamp < b.TimeStamp) ? -1 : 0;
					}
    				else
    				{
        				return (a.Price < b.Price) ? 1 : -1;
    				}
				});
				
				app.setState({
                        buys
                    })
				 
				
			}
			}
				
			}
			})	
		
		
		}
		}		
		}
		})
				
		contract.methods.viewLengthSell().call().then(function(response){
			if(response) {
				lastSell = response;
				
				 
				
			if (lastSell >= 1)
			{
					app.setState({
                        sells: [],
                    	})	
					
			for (let i = 1; i <= lastSell ; i++)
		{
		
			contract.methods.viewSell(i).call().then(function(response){
			if(response) {
						
						let OrderNo = i;	
    					let Amount = Number(response[0]);
						let Price = Number(response[1]);
						let TimeStamp = Number(response[2]);	
						
						if (  Amount > 0)
						{
							
						
						let sells = app.state.sells;
						
						sells.push({
                        OrderNo,
						Amount,
                        Price,
                        TimeStamp
                    });

                    app.setState({
                        sells
                    })
						
					
			if (i == lastSell)
			{
				let sells = app.state.sells
				
				sells.sort(function (a, b) {
				
					if(a.Price == b.Price)
					{
						return (a.TimeStamp > b.TimeStamp) ? -1 : (a.TimeStamp < b.TimeStamp) ? 1 : 0;
					}
    				else
    				{
        				return (a.Price < b.Price) ? -1 : 1;
    				}
				});
				
				app.setState({
                        sells
                    })

			}
			}
			
			
			
			
			}
			})
			
			
			
		}
		}		
		}
		})
		}


watchOrderbook() {
        
		let app = this;
	
		var contractOB = new app.watchweb3.eth.Contract(this.OrderbookABI.abi,this.OrderbookABI.address);
		
	
		app.watchweb3.eth.getBlockNumber(function(error,response){
			if(response)
			{
		
				let lastBlock = response;
				
		
		contractOB.events.allEvents({
            fromBlock: lastBlock+1
			
        }, function(error, event){ 
				
				console.log("Event",event); 
				app.setOrderbook();
			}).on('error', console.error);
									  
		}
		})
}

    onInputChangeUpdateField = (name,value) => {
        let fields = this.state.fields;

        fields[name] = value;

        this.setState({
            fields
        });
    };

    componentDidMount(){
	
		var account;
		
		if (window.ethereum) {
        const ethereum = window.ethereum;
   
	    this.web3 = new Web3(ethereum);
	
		ethereum.enable().then((accounts) => {
  		
		account = accounts[0];
 		this.web3.eth.defaultAccount = account ;
		
		let app = this;
		
		this.setState({
            account
        });

        this.setNetwork();
		this.setBalance();
		this.setOrderbook();	
		this.watchOrderbook();	
		})		
		}
	}
							   
		
		 
						   
						   
    render() {
        
       
                return (
                    <div>
                        <Nav appName={this.appName} network={this.state.network} />
                        <Description />
                        <Container onInputChangeUpdateField={this.onInputChangeUpdateField}
                                   account={this.state.account}
								   buys={this.state.buys}
								   sells={this.state.sells}
								   setBalance={this.setBalance}
								   AuBalance={this.state.AuBalance}
								   USDBalance={this.state.USDBalance}
								   Buy={this.Buy}
								   Sell={this.Sell}	
								   fields={this.state.fields}/>
								   
								                       </div>
                )
            
    }
}
export default App;

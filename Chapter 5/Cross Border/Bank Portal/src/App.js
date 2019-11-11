import React, { Component } from 'react';
import StellarSdk from 'stellar-sdk';
import Nav from './Components/Nav';
import Description from './Components/Description';
import Container from './Components/Container';
import assets from './Components/Assets';
var toml = require('toml');
var concat = require('concat-stream');
var fs = require('fs');
const requestObj = require('request');
const DBServer = 'localhost:3602';


class App extends Component {
    constructor(){
        super();
        this.appName = 'Remittance App';
		this.onInputChangeUpdateField = this.onInputChangeUpdateField.bind(this);
        this.assets = assets;
		this.USD = new StellarSdk.Asset(this.assets[0].code,this.assets[0].issuer);
		this.GBP = new StellarSdk.Asset(this.assets[1].code,this.assets[1].issuer);
		this.EUR = new StellarSdk.Asset(this.assets[2].code,this.assets[2].issuer);
		
		this.state = {
            	
            network: 'Private Testnet',
            account: null,
			balance: 0,
			name: '',
			

			     fields: {
				friendlyid: null,	 
				receiver: null,
                amount: null,
				sellprice: null,
                sellamount: null,
				            }
		}
            
       
		}
		
  
  



setAccount = () => {
        
	var account = this.state.fields.friendlyid;
	console.log("account",account);
	let app = this;
	var url = 'http://'+ DBServer +'/userdet'; 
	
	fetch(url,{
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Content-Type':'application/json',
	},
	body: JSON.stringify({
							friendlyid: account
						})
	}).then(function(response,error){
		if(response)
		{
			return response.json();
		}
		else 
		{
			console.log(error);
		}
	}).then(function(data){
	
        app.setState({
            account,
			name: data.name,
			balance: data.balance
        });
	})
}
    

	    


payment = () => {
	
	console.log(this.state.fields.receiver);
	console.log(this.state.fields.amount);
	
	console.log(this.state.account);
	let app =this;
	var url = 'http://'+DBServer+'/payment'; 
	
	fetch(url,{
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Content-Type':'application/json',
	},	
	body: JSON.stringify({
							receiver: this.state.fields.receiver,
							amount: this.state.fields.amount,
							account: this.state.account
						})
	}).then(function(response,error){
		if(response)
		{
			return response.json();
		}
		else 
		{
			console.log(error);
		}
	}).then(function(data){
	console.log(data);
	if(data.msg == "SUCCESS!")
	{
	console.log("Tx hash",data.result);
	var disObj = JSON.parse(data.result);	
	app.setState({
			txstatus: 'Transaction Successful',
			txid: disObj.hash	
        });	
	app.setBalance();		
	}
	else
	{
	console.log("Error",data);
	app.setState({
			txstatus: 'Transaction Failed',
        });	
	}
		
});
}


setBank = () => {

	let app = this;
	var url = 'http://'+ DBServer +'/bankuser';
fetch(url).then(function(response,error){
		if(response)
		{
			return response.json();
		}
		else 
		{
			console.log(error);
		}
	}).then(function(data){
	
        app.setState({
			receivedtx: data.tx
			
        });
	
	console.log(app.state.receivedtx);
		
	})

}

setBalance = () => {
	let app=this;
var account = this.state.account;
	console.log("Reached here");
	var url = 'http://'+ DBServer +'/userbal';
	fetch(url,{
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Content-Type':'application/json',
	},	
	body: JSON.stringify({
							friendlyid: account
						})
	}).then(function(response,error){
		if(response)
		{
			return response.json();
		}
		else 
		{
			console.log(error);
		}
	}).then(function(data){
	
        app.setState({
			balance: data.balance
        });
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
		
		this.server = new StellarSdk.Server('http://127.0.0.1:8000', {allowHttp: true});
		this.passphrase = 'Standalone Network ; February 2017';
		
		
	}
							   
		
		 
						   
						   
    render() {
        
       
                return (
                    <div>
                        <Nav appName={this.appName} network={this.state.network} />
                        <Description name={this.state.name}/>
                        <Container onInputChangeUpdateField={this.onInputChangeUpdateField}
                                   account={this.state.account}
								   balance={this.state.balance}
								   payment={this.payment}
								   setBank={this.setBank}
								   receivedtx = {this.state.receivedtx}
								  chkaddr={this.chkaddr}
								   setBalance={this.setBalance} 	
								   fields={this.state.fields}
								   setAccount={this.setAccount}
								   txstatus={this.state.txstatus}
					               txid={this.state.txid}/>
								   
								                       </div>
                )
            
    }
}
export default App;

import React, { Component } from 'react';
import Web3 from 'web3'
import Nav from './Components/Nav'
import Description from './Components/Description'
import Container from './Components/Container'
import Shoes from './Items/all'



class App extends Component {
    constructor(){
        super();
		this.appName = 'Sindbad Commerce';
        this.shoes = Shoes;
		this.newPayment = this.newPayment.bind(this);
		this.closePayment = this.closePayment.bind(this);
		this.PaymentWait = this.PaymentWait.bind(this);
		this.tick = this.tick.bind(this);
		this.bCheck = this.bCheck.bind(this);
		this.startTimer = this.startTimer.bind(this);
		
		this.state = {
			shoes: [],
			PaymentDetail: {},
			Conv: 300,
			defaultGasPrice: null,
            defaultGasLimit: 200000,
			paymentf: false,
			mAddress: '0x',
			amount: 0,
			diff: 0,
		    seconds: '00',   // responsible for the seconds 
            minutes: '15',  // responsible for the minutes
			tflag: true
		};
		
		
			}
  
    newPayment = (index) => {
		
		var mAddress;
		let app = this;
		(async function  main(){
		await fetch('http://localhost:5000/api/getMAddress')
		.then(response => response.json())
		.then(data => {
			  			mAddress = data.MAddress;
			console.log(mAddress);
        app.setState({
            PaymentDetail: app.state.shoes[index],
			mAddress
        })
						
					  });
		
		var Conv;
	await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
		.then(response => response.json())
		.then(data => {
			  			Conv=data.USD;
						
			app.setState({
                        Conv       
						})
					  });
		})();	
    };	

closePayment = () => {
        	
			clearInterval(this.intervalHandle);
			clearInterval(this.intervalBalance);	

			this.setState({
            PaymentDetail: {},
			paymentf: false,	
			mAddress: '0x',
			amount: 0,
			diff: 0,
		    seconds: '00',   // responsible for the seconds 
            minutes: '15',  // responsible for the minutes
			tflag: true,
			defaultGasPrice: null,
            defaultGasLimit: 200000	
	})
};

PaymentWait = (mAddress,amount) => {
			
			this.setState({
            paymentf: true,
			amount,
			mAddress	
        })
		
	};

resetApp = () => {
      this.setState({
            PaymentDetail: {},
			paymentf: false,	
			mAddress: '0x',
			amount: 0,
			diff: 0,
		    seconds: '00',   // responsible for the seconds 
            minutes: '15',  // responsible for the minutes
			tflag: true,
			defaultGasPrice: null,
            defaultGasLimit: 200000	
	})    
};


setGasPrice = (web3) => {
        web3.eth.getGasPrice((err,price) => {if(!err)
		{
			console.log(price);	
            price = web3.utils.fromWei(price.toString(),'gwei');
            this.setState({defaultGasPrice: price})
		}
		else
		{
			console.log(err);
		}										  
        });
    };


MMaskTransfer = (MRAddress,amount) => {
    
	let app = this; 
	if (window.ethereum) {
        const ethereum = window.ethereum;
       	let web3 = new Web3(ethereum);
		ethereum.enable().then((accounts) => {
		let account = accounts[0];
		 web3.eth.defaultAccount = account ;
		this.setGasPrice(web3);
			let tAmount = amount * 1000000000000000000; 
		let transObj = {to: MRAddress, gas: this.state.defaultGasLimit,gasPrice: this.state.defaultGasPrice, value: tAmount}	
 		web3.eth.sendTransaction(transObj,function (error, result){  
			if(!error){
                    console.log(result);
					app.resetApp();
                } else{
                    console.log(error);
                }
			});
			
});
}
}

tick(){		
var min = Math.floor(this.secondsRemaining / 60);
var sec = this.secondsRemaining - (min * 60);

this.setState({
  minutes: min,
  seconds: sec
})

if (sec < 10) {
  this.setState({
    seconds: "0" + this.state.seconds,
  })
}
if (min < 10) {
this.setState({
  minutes: "0" + this.state.minutes,
 })
}
if (min === 0 & sec === 0) {
clearInterval(this.intervalHandle);
clearInterval(this.intervalBalance);	
}	
this.secondsRemaining--;
}



bCheck(){
let app = this;	
let amount = this.state.amount;
let intervalHandle = this.intervalHandle;
let intervalBalance = this.intervalBalance;	
this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));	
this.web3.eth.getBalance(this.state.mAddress,function (error, result){  
			if(!error){
				let diff = result / 1000000000000000000;
								if(diff >= amount )
				{					
			clearInterval(intervalHandle);
			clearInterval(intervalBalance);
		
				}
				
				app.setState ({
				diff	
  				})
			}
				
		else
		{
			console.log(error);
		}
	
			});
}
	


startTimer = () =>{

if(this.state.tflag == true)
{
this.intervalHandle = setInterval(this.tick,1000);
this.intervalBalance = setInterval(this.bCheck,10000);
	
	let time = this.state.minutes;
	this.secondsRemaining = time * 60;
	this.setState({
  tflag: false
 });
}
}	






		
    componentDidMount() {
		
		let app = this;
		let shoes = app.state.shoes;
	
		
		
		Shoes.forEach((shoe) => {
		let logo = shoe.logo;
        let price = shoe.price;
        let image = shoe.image;
        let name = shoe.name;
		
		
			
		shoes.push({
                        logo,
                        price,
                        name,
                        image,
                    });
		
		app.setState({
                        shoes
       
		})
	});
		
		
	}
		
    render() {
               
                return (
                    <div>
                        <Nav appName={this.appName} />
						<div>                        </div>
						<Description />
						<Container 
							shoes={this.state.shoes}
							newPayment={this.newPayment}
							closePayment={this.closePayment}
							PaymentDetail={this.state.PaymentDetail}
							mAddress={this.state.mAddress}
							amount={this.state.amount}
							diff={this.state.diff}
							paymentf={this.state.paymentf}
							Conv={this.state.Conv}
							MMaskTransfer={this.MMaskTransfer}
							PaymentWait={this.PaymentWait}
							startTimer={this.startTimer}
							tick={this.tick}
							privateToAddress={this.privateToAddress}
							getRandomWallet={this.getRandomWallet}
							defaultGasPrice={this.state.defaultGasPrice}
                            defaultGasLimit={this.state.defaultGasLimit}
							minutes={this.state.minutes}
        					seconds={this.state.seconds}/>
									</div>
                		)
           
        }
    }

export default App;

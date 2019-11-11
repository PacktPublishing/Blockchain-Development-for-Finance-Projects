const express = require("express");
const bodyParser = require("body-parser");
const app = express(); 
const pg = require('pg');
const conString = "postgres://bank2:bank2@localhost:5432/bankb";
const client = new pg.Client(conString);
const fetch = require('node-fetch');
var toml = require('toml');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var server = app.listen(process.env.PORT || 5100, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
	
	});


client.connect();

app.post('/compliance/fetch_info', function (request, response) {
console.log("request fetch info",request.body.address);  
var addressParts = request.body.address.split('*');
  var friendlyId = addressParts[0];
  	
  // You need to create `accountDatabase.findByFriendlyId()`. It should look
  // up a customer by their Stellar account and return account information.
  

client.query('SELECT name,address,dob,domain from users where friendlyid = $1', [friendlyId], (error, results) => {
if (error) {
      throw error
    }	
	
      if(results)
	  {	  
		  response.json({
        name: results.rows[0].name,
        address: results.rows[0].address,
        date_of_birth: (results.rows[0].dob).toString(),
		domain: results.rows[0].domain 
      });
	 	console.log("domain",results.rows[0].domain);			  
      response.end();
			  
	  }});
});


app.post('/compliance/sanctions', function (request, response) {
  console.log("request",request.body.sender);  
	var sender = JSON.parse(request.body.sender)
	console.log("sender",sender); 
  

client.query('SELECT * from sanction where domain = $1', [sender.domain], (error, results) => {
if (error) {
	response.status(403).end("FI not sanctioned");      
    }	
if (results)
	{
	response.status(200).end();
	
    }
})
});	


app.post('/compliance/ask_user', function (request, response) {
  console.log("request ask user",request.body.sender);  
	var sender = JSON.parse(request.body.sender)
	console.log("sender",sender); 
  

client.query('SELECT * from sanction where domain = $1', [sender.domain], (error, results) => {
if (error) {
	response.status(403).end("FI not sanctioned");      
    }	
if (results)
	{
		if(results.rows[0].kyc == true)
		{
	      response.status(200).end();
		}
		else
			{
	      response.status(403).end("KYC request denied");
		}
    }
})
});	



app.post('/receive', function (request, response) {
	console.log("receive request",request.body);
  var amount = parseInt(Number(request.body.amount).toFixed(2));
  var friendlyid = request.body.route;	
	console.log("amount",amount,"friendlyid",friendlyid);
  // `receive` may be called multiple times for the same payment, so check that
  // you haven't already seen this payment ID.
var SendObj = JSON.parse(request.body.data);
var kycObj = JSON.parse(SendObj.attachment);	
client.query('INSERT INTO transactions(txid, sender, receiver, amount, currency, kyc_info) VALUES ($1,$2,$3,$4,$5,$6)',
			[request.body.transaction_id,SendObj.sender,request.body.route,amount,request.body.asset_code,kycObj.transaction.sender_info], (error, results) => {
		if (error) {
					console.log(error);	
    				response.status(500).end("Error inserting transaction");
    				}
		if(results)
					{
						console.log("REached here", results);
client.query('SELECT balance from users where friendlyid = $1', [friendlyid], (error, results) => {
if (error) {
	console.log(error);	
    response.status(500).end("Not found");
    }	
if (results)
	{
	console.log("results",results);
var balance = Number(results.rows[0].balance) 
balance = balance + + amount;
console.log("balance",balance);

client.query('UPDATE users set balance = $1 where friendlyid = $2', [balance, friendlyid], (error, results) => {

if (error) {
	  console.log(error);	
      response.status(500).end("Not found");
    }	
if (results)
{
	console.log(results);
	response.status(200).end();
}
})
	}
})
}
})
}); 
		 /*})})*/	
	
app.post('/test', function (request, response) {
  fetch('http://banka.com/.well-known/stellar.toml')
		.then(function(response,error){ 
		if(response) {
			return response.text();
		}
	}).then(function(data){
	  var tomlFile = data;
	  var tomldata = toml.parse(tomlFile);
	  console.log(tomldata);
	  response.json({
        tomldata  
      })
	  response.end();
  })
});



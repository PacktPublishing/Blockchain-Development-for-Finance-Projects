const express = require("express");
const bodyParser = require("body-parser");
const app = express(); 
const pg = require('pg');
const conString = "postgres://bank2:bank2@localhost:5432/bankb";

const requestObj = require('request');
const client = new pg.Client(conString);
//const bankclient = new pg.Client(compString);
client.connect();
//bankclient.connect();
const USD = 'USD';
const issuer = 'GAIHBCB57M2SDFQYUMANDBHW4YYMD3FJVK2OGHRKKCNF2HBZIRBKRX6E';
var txid = 1001;

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

var server = app.listen(process.env.PORT || 3602, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
	
	});



app.post('/userdet', function (request, response) {
console.log("request",request.body.friendlyid);  
var idParts = request.body.friendlyid.split('*');
  var friendlyId = idParts[0];
  console.log("ID",friendlyId,request.body.friendlyid);	
  // You need to create `accountDatabase.findByFriendlyId()`. It should look
  // up a customer by their Stellar account and return account information.
  

client.query('SELECT name,address,dob,balance from users where friendlyid = $1', [friendlyId], (error, results) => {
if (error) {
      throw error
    }	
	
      if(results)
	  {	  
	  response.json({
        name: results.rows[0].name,
        address: results.rows[0].address,
        date_of_birth: results.rows[0].dob,
		balance: results.rows[0].balance 
      });
	  			  
      response.end();
			  
	  }});
});

app.post('/userbal', function (request, response) {
console.log("request",request.body.friendlyid);  
var idParts = request.body.friendlyid.split('*');
  var friendlyId = idParts[0];
  	
  // You need to create `accountDatabase.findByFriendlyId()`. It should look
  // up a customer by their Stellar account and return account information.
  

client.query('SELECT balance from users where friendlyid = $1', [friendlyId], (error, results) => {
if (error) {
      throw error
    }	
	
      if(results)
	  {	  
	  response.json({
		balance: results.rows[0].balance 
      });
	  //client.end();			  
      response.end();
			  
	  }});
});


app.post('/payment', function (request, response) {

	var idParts = request.body.account.split('*');
    var friendlyId = idParts[0];
	
	client.query('SELECT balance from users where friendlyid = $1', [friendlyId], (error, results) => {
	if (error) {
      response.json({
		msg: "ERROR!",
		error_msg: error
      });
 	response.end();
	}
	
	if(results)
	  {	  
	  balance =  results.rows[0].balance;	
		
		if(balance < Number(request.body.amount))
	  {
		  response.json({
		msg: "ERROR!",
		error_msg: "Insufficient balance!"
      });
 	response.end();
	  }  
		      
requestObj.post({
  url: 'http://localhost:8007/payment',
  form: {
    id: txid.toString(),
    amount: request.body.amount,
    asset_code: USD,
    asset_issuer: issuer,
    destination: request.body.receiver,
    sender: request.body.account,
	use_compliance: true  
  }
}, function(err, res, body) {
  if (err || res.statusCode !== 200) {
    console.error('ERROR!', err || body);
	response.json({
		result: body,
		msg: "ERROR!",
		error_msg: err
      });  
 	response.end();
  }
  else {
    console.log('SUCCESS!', body);
	 client.query('SELECT balance from users where friendlyid = $1', [friendlyId], (error, results) => {
if (error) {
	console.log(error);	
    response.status(500).end("User Not found");
    }	
if (results)
	{
var balance = Number(results.rows[0].balance) 
balance = balance + - request.body.amount;
console.log("balance",balance);

client.query('UPDATE users set balance = $1 where friendlyid = $2', [balance, friendlyId], (error, results) => {

if (error) {
	  console.log(error);	
      response.status(500).end("User Not found");
    }
	
if (results)
{
	
	response.json({
		result: body,
		msg: 'SUCCESS!'
      }); 
	txid++;
	console.log("Next txid",txid);  
	response.status(200).end();
}
 
})
}
})
}	  
});	
}
})
});	
	
	

app.get('/bankuser', function (request, response) {


client.query('SELECT * from transactions', (error, results) => {
if (error) {
      throw error
    }	
	
      if(results)
	  {	  
	  response.json({
		tx: results.rows 
      });
	response.end();
	  }
})
});	

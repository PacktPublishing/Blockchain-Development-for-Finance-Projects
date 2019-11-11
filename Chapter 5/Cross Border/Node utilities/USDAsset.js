const StellarSdk = require('stellar-sdk');

const server = new StellarSdk.Server('http://127.0.0.1:8000', {allowHttp: true});

var issuingKeys = StellarSdk.Keypair
  .fromSecret('SAEEE4UUP3DRYTEFHNFKCVB4ZCQT2W2KPFW7FLE6VLE7QABAAZATFZFD');

var receivingKeys1 = StellarSdk.Keypair
  .fromSecret('SDSQ5MJALF7VWDFEFETPGGWJK2UEQ5HU6HJBKMT5M5YDJ3WYKMC5RC3O');
var receivingKeys2 = StellarSdk.Keypair
  .fromSecret('SB6HTLWBKVY6KOGKFZE2EKH3ZFSIYHYXJOORGKIOHSMPHBCX4SS4PU6G');

var USD = new StellarSdk.Asset('USD', 'GAIHBCB57M2SDFQYUMANDBHW4YYMD3FJVK2OGHRKKCNF2HBZIRBKRX6E');



server.fetchBaseFee()
	.then(function(fee){
	console.log("Fee is",fee);
server.loadAccount(receivingKeys1.publicKey())
	.then(function(account){
		console.log("Account is",account);
 var transaction = new StellarSdk.TransactionBuilder(account, { fee, networkPassphrase:'Standalone Network ; February 2017'})
        .addOperation(StellarSdk.Operation.changeTrust({
				asset: USD,
        		limit: '100000',
				source: receivingKeys1.publicKey()
            })).setTimeout(100)
        .build();
	
	 
	transaction.sign(receivingKeys1);
	return server.submitTransaction(transaction);
})}).catch(function(error) {
    console.error('Error!', error);
  });

server.fetchBaseFee()
	.then(function(fee){
	console.log("Fee is",fee);
server.loadAccount(receivingKeys2.publicKey())
	.then(function(account){
		console.log("Account is",account);
 var transaction = new StellarSdk.TransactionBuilder(account, { fee, networkPassphrase:'Standalone Network ; February 2017'})
        .addOperation(StellarSdk.Operation.changeTrust({
				asset: USD,
        		limit: '100000',
				source: receivingKeys2.publicKey()
            })).setTimeout(100)
        .build();
	
	 
	transaction.sign(receivingKeys2);
	return server.submitTransaction(transaction);
})}).catch(function(error) {
    console.error('Error!', error);
  });

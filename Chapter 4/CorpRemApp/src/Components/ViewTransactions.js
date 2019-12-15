import React from 'react';
import InputField from './InputField';



class ViewTransactions extends React.Component {
	
	    				
	render()
			{
				
				
				console.log("Transactions",this.props.trans[0]);
        return (
			
			<div>
            <div className="panel-block is-paddingless is-12" >
             <div className="column is-12" >
			<div className="column is-6 is-offset-4" >
            <div className="field is-grouped" >
			
					<p className="control">
							<a className="button is-primary" onClick={() => this.props.TabView(1)}>    
									Transfer
							</a>
					</p>
		
					<p className="control">
							<a className="button is-primary " onClick={() => this.props.TabView(2)}>    
									View Transactions
							</a>
					</p>		
			</div>
			</div>
			<div className="column is-offset-4" >
			<div className="field is-grouped" >	
					<p className="control">
						<a className="button is-light" onClick={() => this.props.TransSet(1)}>    
									Incoming Tx
						</a>
					</p>
			
					<p className="control">
						<a className="button is-light " onClick={() => this.props.TransSet(2)}>    
									Outgoing Tx
						</a>
					</p>						
				
			</div>
			</div>

			<div className="column">
				{
					 this.props.TransFlag == 1?
						 	
                <div>
                    {
                        this.props.trans.map((tx,index) => {
							
                             return ( 
					 <div key={index} className="columns is-multiline is-12">
                     <div className="panel-block is-paddingless is-12" >	   
					 <div className={tx.transtype == 'Outgoing' ? "is-hidden" : 
												"has-background-white" }>
				
                                		<div className="columns">
                                          
                       					<div className="column">
										 <strong>Tx ID :</strong>{tx.transaction_id}    
										</div>
									
										<div className="column">
										 <strong>Sender's Name	:</strong>{tx.sname}
										</div>
					 					
					 					<div className="column">
										<strong>Sender's Account	:</strong>	
										 {tx.saccount}
										</div>
					 
					 					<div className="column">
										<strong>Sender's Address	:</strong>	
										 {tx.saddress}    
										</div>

										<div className="column">
										<strong>Sender's Bank	:</strong>	
										 {tx.sbank}    
										</div>


                                         </div>
                       
                                          <div className="columns">
										
                                         <div className="column">
										<strong>Receiver's Name	:</strong>
										 {tx.rname}
										</div>
					 					
					 					<div className="column">
										<strong>Receiver's Account	:</strong>	
										 {tx.raccount}
										</div>
					 
					 					<div className="column">
										<strong>Receiver's Address	:</strong>		
										 {tx.raddress}    
										</div>

										<div className="column">
										<strong>Receiver's Bank	:</strong>			
										 {tx.rbank}    
										</div>
										 
                                                                                  	
										<div className="column">
											<strong>Transactions Amount	:</strong>		
										 {tx.amount} {tx.currency}    
										</div>
									
										
										<div className="column">									 <a href={'uploads/' + tx.invhash+'.txt'} download>
										Invoice 
										</a>    
										</div>
										
                       					<div className="column">
							 <a href={'uploads/' + tx.boehash+'.txt'} download>
										BOE/BOL 
										</a>    						
                       					</div>

										<div className="column">
							<a href={'uploads/' + tx.dochash+'.txt'} download>
										Other Documents 
										</a>   
										</div>
										</div>
                       		</div>
							</div>
							</div>	
									)})
									}
									
									</div>:
									
						
					
                <div>
                    {
                        this.props.trans.map((tx,index) => {
							
                            return ( 
					 <div key={index} className="columns is-multiline is-12">
                     <div className="panel-block is-paddingless is-12" >	   
					 <div className={tx.transtype == 'Incoming' ? "is-hidden" : 
												"has-background-white" }>
				
                                		<div className="columns">
                                          
                       					<div className="column">
										 <strong>Tx ID :</strong>{tx.transaction_id}    
										</div>
									
										<div className="column">
										 <strong>Sender's Name	:</strong>{tx.sname}
										</div>
					 					
					 					<div className="column">
										<strong>Sender's Account	:</strong>	
										 {tx.saccount}
										</div>
					 
					 					<div className="column">
										<strong>Sender's Address	:</strong>	
										 {tx.saddress}    
										</div>

										<div className="column">
										<strong>Sender's Bank	:</strong>	
										 {tx.sbank}    
										</div>


                                         </div>
                       
                                          <div className="columns">
										
                                         <div className="column">
										<strong>Receiver's Name	:</strong>
										 {tx.rname}
										</div>
					 					
					 					<div className="column">
										<strong>Receiver's Account	:</strong>	
										 {tx.raccount}
										</div>
					 
					 					<div className="column">
										<strong>Receiver's Address	:</strong>		
										 {tx.raddress}    
										</div>

										<div className="column">
										<strong>Receiver's Bank	:</strong>			
										 {tx.rbank}    
										</div>
										 
                                                                                  	
										<div className="column">
											<strong>Transactions Amount	:</strong>		
										 {tx.amount} {tx.currency}    
										</div>
									
										
										<div className="column">									 <a href={'uploads/' + tx.transaction_id+'-invfile.txt'} download>					
										Invoice 
										</a>    
										</div>
										
                       					<div className="column">
							 <a href={'uploads/' + tx.transaction_id+'-boefile.txt'} download>
										BOE/BOL 
										</a>    						
                       					</div>

										<div className="column">
							<a href={'uploads/' + tx.transaction_id+'-docfile.txt'} download>
										Other Documents 
										</a>   
										</div>
										</div>
                       		</div>
							</div>
							</div>	
									)})
									}
									</div>
									}
									</div>
									</div>
									</div>
									</div>	
					)}
                 }
export default ViewTransactions;
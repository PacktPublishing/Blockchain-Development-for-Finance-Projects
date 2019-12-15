import React from 'react';
import InputField from './InputField';

function Transfer(props) {
	
	
	
        return (
            <div className="panel-block is-paddingless is-6" >
                <div className="column" >
			<div className="field is-grouped ">	
			<p className="control">
				<a className="button is-primary" onClick={() => props.TabView(1)}>    
									Transfer
									</a>
									</p>

				<p className="control">
				<a className="button is-primary " onClick={() => props.TabView(2)}>    
									View Transactions
									</a>
									</p>		
				
				
		</div>
				
                     
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="rname" placeholder="Receiver Name"/>
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="raccount" placeholder="Receiver Account"/>
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="rbank" placeholder="Receiver Bank"/>
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="raddress" placeholder="Receiver's Address"/>
				
			
             <p>Proforma Invoice / Invoice</p>
			<div className="column" >
                 <div className="file has-name">
 				 <label className="file-label">
    				
					<input className="file-input" type="file" name="Invoice" onInput={props.onChangeHandlerInv}/>
    				
					<span className="file-cta">
      					<span className="file-icon">
        						<i className="fas fa-upload"></i>
      					</span>
      				<span className="file-label">
        			Select File
      				</span>
  				  </span>
    				<span className="file-name">
      				{props.InvFname}
    				</span>
  					</label>
				</div>
			   </div>
			
			
			<p> BOE/BOL</p>
			<div className="column" >
			<div className="file has-name">
 				 <label className="file-label">
    				
					<input className="file-input" type="file" name="BOEBOL" onInput={props.onChangeHandlerBOE}/>
    				
					<span className="file-cta">
      					<span className="file-icon">
        						<i className="fas fa-upload"></i>
      					</span>
      				<span className="file-label">
        			Select File
      				</span>
  				  </span>
    				<span className="file-name">
      				{props.BOEFname}
    				</span>
  					</label>
				</div>
			</div>
			
			<p> Any Other Document </p>
			
			<div className="column" >
			<div className="file has-name">
 				 <label className="file-label">
    				
					<input className="file-input" type="file" name="OtherDoc" onInput={props.onChangeHandlerDoc}/>
    				
					<span className="file-cta">
      					<span className="file-icon">
        						<i className="fas fa-upload"></i>
      					</span>
      				<span className="file-label">
        			Select File
      				</span>
  				  </span>
    				<span className="file-name">
      				{props.DocFname}
    				</span>
  					</label>
				</div>
			</div>
			
			
			

						
			<div className="column" >
			<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="amount" placeholder="Amount (In USD)"/>
			</div>
			
			<div className="column" >
			<p className="control ">
				<a className="button is-info" onClick={() => props.payment()}>
                            Submit 
                </a>
            </p>
			</div>

			
			<div className="column" >
				<div className="column" >
						<p>
						<span className="tag is-grey">	
						<strong>Tx Status</strong> : {props.txstatus}
						</span>
						</p>
				</div>
			
				</div>	
					
			</div>
			</div>
		)

    }


export default Transfer;
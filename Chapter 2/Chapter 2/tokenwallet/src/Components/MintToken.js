import React from 'react';
import InputField from './InputField';

function MintToken(props) {
    
	
	
	return (
        <div className="panel-block is-paddingless is-12">
            <div className="column is-12" id="token-lists">

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="receiver" placeholder="Receiver Address"/>

		{
		        props.mintDetail20?
				<div>
                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                           fields={props.fields} name="amount" placeholder="Amount To Mint" addon={props.mintDetail20.symbol.toUpperCase()}/>
				
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            default={props.defaultGasPrice}
                            fields={props.fields} name="gasPrice" placeholder="Gas Price In Gwei" addon="Gas Price(gwei)"/>

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            default={props.defaultGasLimit}
                            fields={props.fields} name="gasLimit" placeholder="Gas Limit" addon="Gas Limit"/>

				<div className="field is-grouped is-pulled-right is-offset">
                    <p className="control">
                        <a className="button is-light" disabled={props.inProgress}
                           onClick={() => props.closeTransfer()}>
                            Back
                        </a>
                    </p>
                    <p className="control">
                        <a className={props.inProgress ? "button is-danger is-loading" : "button is-danger"}
                           disabled={props.inProgress} onClick={() => props.Mint()}>
                            Mint
                        </a>
                    </p>
                </div>


				</div> :
		
				<div>
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                           fields={props.fields} name="metadata" placeholder="Metadata"/>
							   
				<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            default={props.defaultGasPrice}
                            fields={props.fields} name="gasPrice" placeholder="Gas Price In Gwei" addon="Gas Price(gwei)"/>

                <InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            default={props.defaultGasLimit}
                            fields={props.fields} name="gasLimit" placeholder="Gas Limit" addon="Gas Limit"/>

				     <div className="field is-grouped is-pulled-right is-offset">
                    <p className="control">
                        <a className="button is-light" disabled={props.inProgress}
                           onClick={() => props.closeTransfer()}>
                            Back
                        </a>
                    </p>
                    <p className="control">
                        <a className={props.inProgress ? "button is-danger is-loading" : "button is-danger"}
                           disabled={props.inProgress} onClick={() => props.Mint()}>
                            Mint
                        </a>
                    </p>
                </div>

							   
				</div>

}

	

            </div>
        </div>
    )
}

export default MintToken;
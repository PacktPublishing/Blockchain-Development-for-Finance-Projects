import React from 'react';

function GlowBar(props) {
	var restext;
	if (props.fstatus == 'Tampered')
	{
	 restext = 'Tampered';
	}
	else
	{
	 restext = 'Not Tampered';	
	}	
    return (
        <p className={props.fstatus == 'Tampered' ? "panel-heading has-background-danger has-text-centered" : "panel-heading has-background-success has-text-centered"}>
            Status:
            <strong>{restext}</strong>
        
     <div className="is-offset-one-quarter">
                        <a className= "is-offset-one-quarter button is-small" disabled={props.restext == 'Not Tampered'} >
                            Accept All
                        </a>
                    </div>
	
	</p>
	
	)
}

export default GlowBar;
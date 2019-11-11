import React from 'react';

function Description(props) {
    return (
        <section className="container">
            <div className="has-text-centered content">
                <br/>
                <h1 className="title is-4 is-uppercase has-text-black-light">Merchant Wallet</h1>
				{
				props.acc?
				<div>
				<h2 className="subtitle is-6 has-text-black-light">Transaction List</h2>
				</div>:
				<div>
                <h2 className="subtitle is-6 has-text-black-light">Address List</h2>
				</div>
				}
            	</div>
        </section>
    )
}

export default Description;
    
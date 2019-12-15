import React from 'react';

function Description(props) {
    return (
        <section className="container">
            <div className="has-text-centered content">
                <br/>
                <h1 className="title is-4 is-uppercase has-text-is-warning">Remittance App</h1>
                <h2 className="subtitle is-7 has-text-black-light "> powered by Blockchain   </h2></div>
		<div className="has-text-centered content">
				<h2 className="subtitle is-7 has-text-black-light "> Welcome {props.name}!   </h2></div>
        </section>
    )
}

export default Description;
    
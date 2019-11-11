import React from 'react';

class tokenBlock20 extends React.Component {
    render() {
        return (
            <div className="panel-block is-paddingless is-12" >
                <div className="column is-12" id="token-lists">
                    {
                        this.props.tokens20.map((token,index) => {
                            return (
                                <div key={index} className="columns token">
                                    <div className="column is-2 has-text-centered">
                                        <img alt={token.symbol} src={'icons/' + token.icon} className="token-icon"></img>
                                    </div>
                                    <div className="column is-2 is-size-5 is-ellipsis">
                                        {token.symbol}
                                    </div>
                                    <div className="column is-2 is-size-6 is-ellipsis">
                                        {token.balance.toFixed(token.decimal)}
                                    </div>
                                    <div className="column is-1.03 has-text-centered">
                                        <button onClick={() => this.props.newTransfer20(index) } className="button is-outlined is-small is-danger">
                                            Send
                                        </button>
									</div>
									<div className="column is-1.03 has-text-centered">
										<button onClick={() => this.props.newApprove20(index) } className="button is-outlined is-small is-danger">
                                            Approve
                                        </button>
									</div>
									<div className="column is-1.03 has-text-centered">
										<button onClick={() => this.props.newMint20(index) } className="button is-outlined is-small is-danger">
                                            Mint
                                        </button>
									</div>
								 </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default tokenBlock20;
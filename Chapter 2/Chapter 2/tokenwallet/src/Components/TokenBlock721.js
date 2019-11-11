import React from 'react';

class tokenBlock721 extends React.Component {
    render() {
        return (
            <div className="panel-block is-paddingless is-12" >
                <div className="column is-12" id="token-lists">
                    {
                        this.props.tokens721.map((token721,index) => {
                            return (
                                <div key={index} className="columns token">
                                    <div className="column is-2 has-text-centered">
                                        <img alt={token721.symbol} src={'icons/' + token721.icon} className="token-icon"></img>
                                    </div>
                                    <div className="column is-3 is-size-5 is-ellipsis">
                                        {token721.symbol}
                                    </div>
									
									<div className="row">
									<div className="column is-20 is-size-16 is-ellipsis">
									<div>
                                        ID {token721.tokenid}  
									</div>
									<div className="is-size-20">
                                        {token721.metadata}
                                    </div>
									</div>
									</div>
                                    
                                    <div className="column is-1.03 has-text-centered">
                                        <button onClick={() => this.props.newTransfer721(index) } className="button is-outlined is-small is-danger">
                                            Send
                                        </button>
                                    </div>
									<div className="column is-1.03 has-text-centered">
                                        <button onClick={() => this.props.newApprove721(index) } className="button is-outlined is-small is-danger">
                                            Approve
                                        </button>
                                    </div>
									<div className="column is-1.03 has-text-centered">
                                        <button onClick={() => this.props.newMint721(index) } className="button is-outlined is-small is-danger">
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

export default tokenBlock721;
import React, { Component } from 'react';
import Shoerack from './Shoerack'
import Payment from './Payment'
import PVerification from './PVerification'


class Container extends Component {

	

    render(){
        return (
            <section className="container">
                <div className="columns"> 
				<div className="is-half is-offset-one-quarter column">
                        <div className="panel">
						{
						this.props.paymentf ?
						<div>
						<PVerification mAddress={this.props.mAddress}
							PaymentDetail={this.props.PaymentDetail}
								
							amount={this.props.amount}
							diff={this.props.diff}
							closePayment={this.props.closePayment}
							minutes={this.props.minutes}
        					seconds={this.props.seconds}
							/>
						</div>:
			
						this.props.PaymentDetail.hasOwnProperty('name') ?
						<div>
                            <Payment PaymentDetail={this.props.PaymentDetail}
							newPayment={this.props.newPayment}
							Conv={this.props.Conv}
							mAddress={this.props.mAddress}
							closePayment={this.props.closePayment}
							getRandomWallet={this.props.getRandomWallet}
							privateToAddress={this.props.privateToAddress}
							MMaskTransfer={this.props.MMaskTransfer}
							PaymentWait={this.props.PaymentWait}
							startTimer={this.props.startTimer}
							minutes={this.props.minutes}
        					seconds={this.props.seconds}
							/>
						</div>: 
									
						<div>
                            <Shoerack shoes={this.props.shoes}
							newPayment={this.props.newPayment}
							/>
						</div>
						}
                </div>
		   </div>
			</div>
            </section>
        )
    }
}

export default Container;
import React, { Component } from 'react';

class Nav extends Component {
    render(){
        return (
            <nav className="navbar is-danger"  aria-label="main navigation">
                
                    <a className="navbar-item" href="/">
                        <strong><i className="fa fa-wallet"></i> {this.props.appName}</strong>
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"></span>
                        
                    </a>
                
                
                        
                    
                
            </nav>
        )
    }
}

export default Nav;
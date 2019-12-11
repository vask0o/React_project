import React, { Component, Fragment } from 'react';
import { Redirect,withRouter } from 'react-router-dom';
import '../../styles/style.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,

        }
        this.handleChange = props.handleChange.bind(this);
        console.log(this.props)
    }

    render() {
        if (this.props.isLogged) {
            return (
                <Redirect to="/" />
            )
        }else
        return (
            <Fragment>
                <form onSubmit={(e) => this.props.handleSubmit(e, this.state, false)}>
                    <div className="login">
                        <h1>Log In</h1>
                        <span>Username</span>
                        <input type="text" onChange={this.handleChange} name="username" placeholder="Enter username" />
                        <span>Password</span>
                        <input type="password" onChange={this.handleChange} name="password" placeholder="Enter password" />
                        <button>Log In</button>
                    </div>
                </form>
                
            </Fragment>

        )
    }
}

export default withRouter(Login);
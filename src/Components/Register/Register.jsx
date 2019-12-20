import React from 'react';
import {withRouter, useHistory} from 'react-router-dom';
import {AuthContext} from "../../App";

export const Register = () => {
    let history = useHistory()
    const {dispatch} = React.useContext(AuthContext);
    const initialState = {
        username: "",
        password: "",
        isSubmitting: false,
        isAdmin: false,
        errorMessage: null
    };

    const [data, setData] = React.useState(initialState);
    const isButtonDisabled = data.password === "" || data.username === ""
    const checkPassword=data.password !== data.repeatPassword

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const handleFormSubmit = event => {
        event.preventDefault();

        setData({
            ...data,
            isSubmitting: true,
            errorMessage: null
        });
   
        fetch("http://localhost:9999/auth/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({username: data.username, password: data.password})
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw res;
            })
            .then(resJson => {
                console.log(resJson)

                dispatch({type: "Register", payload: resJson})
                history.push('/home')

            })
            .catch(error => {
                setData({
                    ...data,
                    isSubmitting: false,
                    errorMessage: error.message || error.statusText
                });
            });
    };

    return (
        <div className="login-container">
            <div className="card">
                <div className="container">
                    <form onSubmit={handleFormSubmit}>
                        <h1>Login</h1>
                      {isButtonDisabled ? <h1>Please fill the register form</h1>:<h1> </h1>}
                      {checkPassword ? <h1>Passwords should be the same</h1>:<h1> </h1>}
                        <label htmlFor="username">
                            username
                            <input
                                type="text"
                                value={data.username}
                                onChange={handleInputChange}
                                name="username"
                                id="username"/>
                        </label>

                        <label htmlFor="password">
                            Password
                            <input
                                type="password"
                                value={data.password}
                                onChange={handleInputChange}
                                name="password"
                                id="password"/>
                        </label>
                        <label htmlFor="repeatPassword">
                            Password
                            <input
                                type="password"
                                value={data.repeatPassword}
                                onChange={handleInputChange}
                                name="repeatPassword"
                                id="repeatPassword"/>
                        </label>

                        {data.errorMessage && (<span className="form-error">{data.errorMessage}</span>)}

                        <button disabled={isButtonDisabled||checkPassword}>
                            { ("Register")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Register);
import React, {Fragment} from 'react';
import {Route, BrowserRouter as Router, useHistory, Switch, withRouter} from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import Create from './Components/Create/Create';
import Edit from './Components/Edit/Edit';
import Footer from './Components/Footer/Footer';
import Details from './Components/Details/Details';
import Map from '../src/map';

export const AuthContext = React.createContext();

//sessionStorage.clear();
const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    username: null,
    token: null,
    userId: null
};

const reducer = (state, action) => {

    switch (action.type) {
        case "LOGIN":

            sessionStorage.setItem("username", (action.payload.username));
            sessionStorage.setItem("token", (action.payload.token));
            sessionStorage.setItem("isAdmin", (action.payload.isAdmin));
            sessionStorage.setItem("userId", (action.payload.userId));

            return {
                ...state,
                isAuthenticated: true,
                username: action.payload.username,
                token: action.payload.token,
                isAdmin: action.payload.isAdmin,
                userId: action.payload.userId
            }

        case "LOGOUT":
            sessionStorage.clear();

            return {
                ...state,
                isAuthenticated: false,
                user: null
            }

        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {

        const username = sessionStorage.getItem('username')
        const token = sessionStorage.getItem('token')
        const isAdmin = sessionStorage.getItem('isAdmin')
        const userId = sessionStorage.getItem('userId')
        if (username && token) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    username,
                    token,
                    isAdmin,
                    userId
                }
            })

          }
    }, [])
    return (<Fragment>
        <Router>
            <Switch>
                <AuthContext.Provider
                    value={{
                        state,
                        dispatch
                    }}>

                    <Header/>

                    <Router
                        {...state.isAuthenticated}
                        exact="exact"
                        path="/register"
                        component={Home}
                        isAuthenticated="isAuthenticated"/>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/home' component={Home}/>
                    <Route path='/create'  component={Create}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/details'  component={Details}/>
                    <Route path='/edit' component={Edit}/>

                </AuthContext.Provider>
            </Switch>
        </Router>
        <Footer/>
    </Fragment>
    );
}


  export default withRouter(App)
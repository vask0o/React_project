import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

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
import Map from './Components/Profile/Profile';
import PageNotFound from './Components/NotFound/NotFound';


//sessionStorage.clear();
const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    username: null,
    token: null,
    userId: null,
    location: null
};

const reducer = (state, action) => {

    switch (action.type) {
        case "LOGIN":
            console.log(action.payload)
            sessionStorage.setItem("location", (action.payload.location))
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
                userId: action.payload.userId,
                location: action.payload.location
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
export const AuthContext = React.createContext();
function App() {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        const location = sessionStorage.getItem('location')
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
                    userId,
                    location
                }
            })

        }
    }, [])
    debugger;
    return (

        <Switch>
            <AuthContext.Provider
                value={{
                    state,
                    dispatch
                }}>

                <Header/>

                <Route exact="exact" path='/home' render={() => <Home/>}/>
                <Route path='/register' render={() => <Register/>}/>
                <Route path='/my' component={Map}/> {
                    !state.isAuthenticated
                        ? <Route exact="exact" path="/login" component={Login}/>
                        : <Redirect to='/home'/>
                }
                {
                    state.isAuthenticated
                        ? <Route exact="exact" path="/create" component={Create}/>
                        : <Redirect to='/login'/>
                }
                {
                    state.isAuthenticated
                        ? <Route path="/edit" component={Edit}/>
                        : <Redirect to='/login'/>
                }
                {
                    state.isAuthenticated
                        ? <Route path="/profile" component={Map}/>
                        : <Redirect to='/login'/>
                }
                {
                    state.isAuthenticated
                        ? <Route path="/details" component={Details}/>
                        : <Redirect to='/login'/>
                }

            </AuthContext.Provider>
            <Route component={PageNotFound}/>

            <Footer/>

        </Switch>

    );
}

export default App
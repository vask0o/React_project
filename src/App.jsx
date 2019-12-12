import React, { Component, Fragment } from 'react';
import { Route,BrowserRouter as Router, Switch, Redirect ,withRouter } from 'react-router-dom';

import PrivateRoute from 'react-private-route'

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
 

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.username));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("admin", JSON.stringify(action.payload.isAdmin));
      return {
        ...state,
        
        isAuthenticated: true,
        user: action.payload.username,
        token: action.payload.token,
        isAdmin: action.payload.isAdmin
        
    
      };
      debugger;
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const user =localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if(user && token){
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          token
        }
      })
    }
  }, [])
  return (
    <Fragment>
    <Router>
      <Switch>
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
      
    >
      
      <Header />
     
   
      <Router {...state.isAuthenticated}
      
                exact
                path="/register"
                component={Home}
                isAuthenticated
              />
      <Route path='/login' render={() => <Login/>}/>
      <Route path='/home' component={Home}/>
      <Route path='/create' component={Create}/>
      
    </AuthContext.Provider>
    </Switch>
    </Router>
    <Footer />
    </Fragment>
  );
}

export default withRouter(App)
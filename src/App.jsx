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
        console.log(action.payload)
       if(action.payload.username) {sessionStorage.setItem("user", JSON.stringify(action.payload.username)) };
        if(action.payload.token){sessionStorage.setItem("token", JSON.stringify(action.payload.token)) };
       sessionStorage.setItem("isAdmin", JSON.stringify(action.payload.isAdmin)) ;
       if(action.payload.userId){sessionStorage.setItem("userId", JSON.stringify(action.payload.userId)) };
      
       console.log(state)
       debugger;
      return {
        ...state,
        isAuthenticated: true,
        username: sessionStorage.getItem('username'),
        token: sessionStorage.getItem('token'),
        isAdmin: sessionStorage.getItem('isAdmin'),
        userId: sessionStorage.getItem('userId')
       
        
   
  
       };
   
    case "LOGOUT":
      sessionStorage.clear();
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
    const username =  sessionStorage.getItem('username') 
    const token = sessionStorage.getItem('token') 
    const isAdmin = sessionStorage.getItem('isAdmin')
    const userId = sessionStorage.getItem('userId') 
    
    
  
    if(username && token){
      state.isAuthenticated=true;
      dispatch({
        type: 'LOGIN',
        payload: {
          username,
          token,
          isAdmin
          ,userId
        }
      })
     
     
    } else {
      state.isAuthenticated=false;
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
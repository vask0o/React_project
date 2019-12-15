import React, {
  Fragment
} from 'react';
import {
  Route,
  BrowserRouter as Router,
  useHistory,
  Switch,
  withRouter
} from 'react-router-dom';


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
  userId: null,
  items:[],
  isFetching: true,
  hasError: false,
  isItemSubmitting: false,
  itemHasError: false,
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
       case "FETCH_ITEMS_REQUEST":
        return {
          ...state,
          isFetching: true,
          hasError: false
        };
      case "FETCH_ITEMS_SUCCESS":
        return {
          ...state,
          isFetching: false,
          items: action.payload
          
        };
      case "FETCH_ITEMS_FAILURE":
        return {
          ...state,
          hasError: true,
          isFetching: false
        };
       
        case "ADD_ITEM_REQUEST":
              return {
                ...state,
                isItemSubmitting: true,
                itemHasError: false,
              }
            case "ADD_ITEM_SUCCESS":
              return {
                ...state,
                isItemSubmitting: false,
                items: [...state.items, action.payload]
              }
            case "ADD_ITEM_FAILURE":
              return {
                ...state,
                isItemSubmitting: false,
                itemHasError: true,
              }
        
        

              default:
                return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    dispatch({
      type: "FETCH_ITEMS_REQUEST"
    });
    fetch("http://localhost:9999/crud/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(resJson => {
        console.log(resJson);
        dispatch({
          type: "FETCH_ITEMS_SUCCESS",
          payload: resJson
          
        });
        
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: "FETCH_ITEMS_FAILURE"
        });
      });
  
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
 
     
    dispatch({
      type: "ADD_ITEM_REQUEST"
  })
 
  const item = {   
  };
  fetch("http://localhost:9999/crud/items", {
    method: "POST",
    headers: {
     
      "Content-Type": `application/json`
    },
    body: JSON.stringify(item),
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw res;
      }
    })
    .then(data => {
        
        dispatch({
            type: "ADD_ITEM_SUCCESS",
            payload: data
        })
       
    })
    .catch(error => {
        dispatch({
            type: "ADD_ITEM_FAILURE"
        })
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
      <Route path='/register' component={Register}/>
      <Route path='/details' component={Map}/>
      <Route path='/edit' component={Edit}
                    />} />
      
    </AuthContext.Provider>
    </Switch>
    </Router>
    <Footer />
    </Fragment>
  );
}


  export default withRouter(App)
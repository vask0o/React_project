import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect,withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import Create from './Components/Create/Create';
import Edit from './Components/Edit/Edit';
import Footer from './Components/Footer/Footer';
import Details from './Components/Details/Details';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      isAdmin: false,
      isLogged: false,
      items:[]
      
    }
  }

  componentWillMount() {
    let isAdmin = sessionStorage.getItem('isAdmin');
    if (isAdmin === "true") {
      isAdmin = true;
    } 
    let isUsername = sessionStorage.getItem('username')
    if (sessionStorage.getItem('username')) {
      this.setState({
        username: isUsername,
        isAdmin: isAdmin,
        isLogged:true
      })
    }
    
    if(this.state.isLogged){
      fetch('http://localhost:9999/crud/items', {
        method: 'GET'
      }).then(rawData => rawData.json())
        .then(body => {
          this.setState({
            items: body.items
          })
        }
        );
    }
  
 
  }

  handleChange(event) {
 
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleCreateSubmit(event, data,) {
    event.preventDefault();
    
    if (!data.itemName || !data.description || !data.imageUrl || !data.price) {
      toast.success("Please enter all fields", {
        closeButton: false,
      })
    } else {
      fetch('http://localhost:9999/crud/item/create', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', }

      }).then(rawData => rawData.json())
        .then(responseBody => {
          if (!responseBody.errors) {
            toast.success(responseBody.message, {
              closeButton: false,
            })
            this.props.history.push("/home")
          } else {
            toast.error(responseBody.message, {
              closeButton: false,
            })
          }
        })
    }
  }

  handleSubmit(event, data, isSignUp) {
    event.preventDefault();
    fetch('http://localhost:9999/auth/sign' + (isSignUp ? 'up' : 'in')
      , {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', }

      }).then(rawData => rawData.json())
      .then(responseBody => {
        if (responseBody.username) {
debugger;
          this.setState({
            username: responseBody.username,
            isAdmin: responseBody.isAdmin,
            isLogged: true
          });
          console.log(this.state)
          sessionStorage.setItem('username', responseBody.username);
          sessionStorage.setItem('isAdmin', responseBody.isAdmin);
          sessionStorage.setItem('userId',responseBody.userId);
          

          toast.success(`Welcome, ${responseBody.username}`, {
            closeButton: false,
          })

        } else {
          toast.error(responseBody.message, {
            closeButton: false,
          })
        }
      })
  }

  logout() {
    this.setState({
      username: null,
      isAdmin: false,
      isLogged: false,
    })
    toast.success('Logout successfull', {
      closeButton: true,
    })
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userId');
  }

  render() {
    return (
      <Fragment>
        <ToastContainer />
        <Header isAdmin={this.state.isAdmin} username={this.state.username}
          logout={this.logout.bind(this)} isLogged={this.state.isLogged} />
        <Switch>
        <Route exact path='/'><Redirect to='/Home' /></Route>
          <Route  path="/Home" 
            render={
              
            (props) => <Home
              {...props}
              items={this.state.items} isAdmin={this.state.isAdmin}
            />}
            />

          <Route 
          path="/register"
          render={
            (props) => <Register
              {...props}
              handleSubmit={this.handleSubmit.bind(this)}
              handleChange={this.handleChange}
              isLogged={this.state.isLogged}
            />}
             />
            
          <Route
            path='/login'
            render={
              (props) => <Login
                {...props}
                handleSubmit={this.handleSubmit.bind(this)}
                handleChange={this.handleChange}
                isLogged={this.state.isLogged}
              />}
          />
          <Route
            path='/create'
            render={
              () =>
                this.state.isLogged ?
                  <Create
                    handleCreateSubmit={this.handleCreateSubmit.bind(this)}
                    handleChange={this.handleChange}
                  />
                  :
                  <Redirect
                    to={{
                      pathname: '/login'
                    }}
                  />
            }
          />
         
          <Route
            path='/details/:id'
            render={
              (props) =>
                <Details
                  {...props}
                  isAdmin={this.state.isAdmin}
                  items={this.state.items}
                />
            }
          />
          
          />
          <Route
            path='/edit/:id'
            render={
              (props) => <Edit
                {...props}
                items={this.state.items}
                
                handleChange={this.handleChange}
              />}
          />
          <Route render={() => <h1>Page was not found!</h1>} />
        </Switch>
        <Footer />
      </Fragment>
    );
  }
}
export default withRouter(App);
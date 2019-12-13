import React,{Fragment} from "react";
import {withRouter} from 'react-router-dom';

export const ItemContext = React.createContext();

const initialState = {
         
  itemName:"",
  description:"",
  imageUrl:"",
  price:"",
  status:"",
  author:"",


};

const reducer = (state, action) => {
  switch (action.type) {
    
    default:
      return state;
  }
};

export const Home = () => {
  
  const [state, dispatch] = React.useReducer(reducer, initialState);
  

  React.useEffect(() => {
  });

  return (
    <Fragment>
    <ItemContext.Provider value={{
      state,
      dispatch
    }}>
      </ItemContext.Provider>
   
    </Fragment>
  );
};

export default withRouter(Home);
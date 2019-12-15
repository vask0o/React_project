import React,{Fragment} from "react";
import {withRouter,NavLink} from 'react-router-dom';
import { AuthContext } from "../../App";

export const ItemContext = React.createContext();

const initialState = {
         
  items:[],
  isFetching: true,
  hasError: false,
  isItemSubmitting: false,
  itemHasError: false,


};
const reducer=(state,action)=>{
  switch (action.type) {
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

export const Home = () => {
 // const [data, setData] = React.useState();
  const { state:auth } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  
  

  React.useEffect(() => {
    console.log('here')
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
  
  },[]);
  return (
    <Fragment>
    <ItemContext.Provider value={{
      state,
      dispatch
    }}>

      
      <main>
                    <section>
                      
                        
                          <div className="home">
      {state.isFetching ? (
        <span className="loader">LOADING...</span>
      ) : state.hasError ? (
        <span className="error">AN ERROR HAS OCCURED</span>
      ) :
       (
        <>
          {state.items.items.map(item => (

<div className="single-item" key={item._id}>
    <img src={item.imageUrl} />
    <span className="boldText">Product</span>
    <span className="item-name">{item.itemName}</span>
    <div className="item-details">
        <span className="boldText">Price</span>
        <span className="item-price">{item.price}</span>
        {
            
                
                    <Fragment>
                        <NavLink   className="editButton" to={`edit/${item._id}`}>Edit</NavLink>
                        <button className="deleteButton" type="submit">Delete</button>
                   
                
                
                <div className="userOrdDetailsBtns">
                    <NavLink className="orderBtn1" to={`order/${item._id}`}>Order</NavLink>
                    <NavLink className="orderBtn" to={`details/${item._id}`}>Details</NavLink>
                </div>
                </Fragment>
        }
    </div>
</div>
))}
        </>
      )
      }
    </div>
                    </section>
                </main>
     
     
    </ItemContext.Provider>
   
    </Fragment>
  );
};

export default (Home);
import React from "react";
import { AuthContext } from "../../App";

import CreateItem from "../Create/Create";
import {withRouter} from 'react-router-dom';

export const ItemContext = React.createContext();

const initialState = {
  items: [],
  isFetching: false,
  hasError: false,
  isItemSubmitting: false,
  itemHasError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ITEM_REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case "FETCH_ITEM_SUCCESS":
      return {
        ...state,
        isFetching: false,
        item: action.payload
      };
    case "FETCH_ITEM_FAILURE":
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
  const { state: authState } = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [isAddItemModalVisible, setAddItemModalVisibility] = React.useState(false);

  const toggleAddItem = () => {
    setAddItemModalVisibility(!isAddItemModalVisible);
  }

  React.useEffect(() => {
    dispatch({
      type: "FETCH_ITEMS_REQUEST"
    });
    fetch("https://hookedbe.herokuapp.com/api/songs", {
      headers: {
        Authorization: `Bearer ${authState.token}`
      }
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
  }, [authState.token]);

  return (
    <React.Fragment>
    <ItemContext.Provider value={{
      state,
      dispatch
    }}>
      <button className="toggle-button" onClick={toggleAddItem}>ADD SONG</button>
      <CreateItem onClose={toggleAddItem} show={isAddItemModalVisible} />
    </ItemContext.Provider>
    <div className="home">
     
    </div>
    </React.Fragment>
  );
};

export default withRouter(Home);
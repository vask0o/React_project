import React from "react";
import { ItemContext } from "../Home/Home";
import { AuthContext } from "../../App";
import {withRouter} from 'react-router-dom';
import '../../styles/style.css';


export const Create = (props) => {
  const { state, dispatch } = React.useContext(ItemContext);
  const { state: authState } = React.useContext(AuthContext);
  let {test}=React.useState("");
console.log(test)
console.log(test)
  const [itemName, setItemName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [status, setStatus] = React.useState("");


  const onClose = e => {
    props.onClose && props.onClose(e);
  };

  const isButtonDisabled = itemName === "" || description === "" || imageUrl === "" ||price === "" || state.isItemSubmitting;
  console.log(state.authState)
  const onSubmit = () => {
      dispatch({
          type: "ADD_ITEM_REQUEST"
      })
      const item = {
        "itemName": itemName,
        "imageUrl": imageUrl,
        "description": description,
        "price":price,
        "author":'',
        "status": 'Pending',
     };
     debugger;
    fetch("http://localhost:9999/crud/createItem", {
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
            console.log(data);
            setStatus("");
            setAuthor("");
            setImageUrl("");
            setPrice("");
            setItemName("");
            setDescription("");
            
            dispatch({
                type: "ADD_ITEM_SUCCESS",
                payload: data
            })
            onClose();
        }).catch(error => {
            dispatch({
                type: "ADD_ITEM_FAILURE"
            })
        })
  }
    if (!props.show) {
      return null;
    }
    return (
      <div className="create-item" id="modal">
       <div className="modal-table-container">
        <div className="modal-table-cell">
         <div className="modal-overlay small">
              <div className="modal-header">
                <h1 className="modal-title">
                  CREATE ITEM
                </h1>
              </div>
              <form className="modal-form">
                <div className="modal-form-inputs">

                <label htmlFor="itemName">itemName</label>
                    <input
                    id="itemName"
                    name="itemName"
                    type="text"
                    value={itemName}
                    onChange={e => setItemName(e.target.value)}
                    className="text-input"
                    />

                <label htmlFor="description">description</label>
                    <input
                    id="description"
                    name="description"
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="text-input"
                    />

                <label htmlFor="imageUrl">Image URL</label>
                    <input
                    id="imageUrl"
                    name="imageUrl"
                    type="text"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    className="text-input"
                    />
                </div>
                <div>
                <label htmlFor="price">price</label>
                    <input
                    id="price"
                    name="price"
                    type="text"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="text-input"
                    />
                </div>
                


                
                <div className="form-error">
                      <p>
                        {state.itemHasError && "Error Creating ITEM!"}
                      </p>
                </div>
                <div className="form-action clearfix">
                    <button
                      type="button"
                      id="overlay-confirm-button"
                      className="button button-primary"
                      onClick={onSubmit}
                      disabled={isButtonDisabled}
                    >
                      {state.isItemSubmitting ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      type="button"
                      id="overlay-cancel-button"
                      className="button button-default small close-overlay pull-right"
                      onClick={onClose}
                    >
                          Cancel
                    </button>
                </div>
              </form>
        </div>
        </div>
       </div>
      </div>
    );
};

export default withRouter(Create);;

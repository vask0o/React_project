import React from "react";

import { AuthContext } from "../../App";
import {withRouter,useHistory} from 'react-router-dom';
import '../../styles/style.css';


export const Create = () => {
  const history=useHistory();
    const {dispatch } = React.useContext(AuthContext);
  
    const initialState = {
         
            itemName:"",
            description:"",
            imageUrl:"",
            price:"",
            status:"Pending",
            author:sessionStorage.getItem('userId'),
        
       
      };
      
      const [data, setData] = React.useState(initialState);

      const handleInputChange = event => {
        setData({
          ...data,
          [event.target.name]: event.target.value
        });
      };
  

  
  const handleFormSubmit = event => {
    debugger;
      console.log('submit')
    event.preventDefault(History);
    console.log(data)
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });
    //const isButtonDisabled = data.itemName === "" || data.description === "" || data.imageUrl === "" ||data.price === "" || data.isItemSubmitting;
    dispatch({
      type: "ADD_SONG_REQUEST"
  })
  // const item = {
  //   itemName:"",
  //           description:"",
  //           imageUrl:"",
  //           price:"",
  //           status:"Pending",
  //           author:sessionStorage.getItem('userId'),
  // };
    fetch("http://localhost:9999/crud/item/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      
      body: JSON.stringify({
         data
        // itemName: data.itemName,
        // description: data.description,
        // imageUrl:data.imageUrl,
        // price:data.price,
        // status:data.status,
        // author:data.author
          
      })
      
    })
      .then(res => {
          console.log(res)
        if (res.ok) {
            
          return res.json();
        }
        throw res;
      })
      .then(resJson => {
         dispatch({
            type: "ADD_ITEM_REQUEST",
            payload: resJson
            
        })
        history.push('/')
     })
      
      .catch(error => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
      });
  };
    return (
      <div className="create-item" id="modal">
       
                <h1 className="modal-title">
                  CREATE ITEM
                </h1>
             
              <form  onSubmit={handleFormSubmit} className="modal-form">
                <div className="modal-form-inputs">

                <label htmlFor="itemName">itemName</label>
                    <input
                    id="itemName"
                    name="itemName"
                    type="text"
                    value={data.itemName}
                    onChange={handleInputChange}
                    className="text-input"
                    />

                <label htmlFor="description">description</label>
                    <input
                    id="description"
                    name="description"
                    type="text"
                    value={data.description}
                    onChange={handleInputChange}
                    className="text-input"
                    />

                <label htmlFor="imageUrl">Image URL</label>
                    <input
                    id="imageUrl"
                    name="imageUrl"
                    type="text"
                    value={data.imageUrl}
                    onChange={handleInputChange}
                    className="text-input"
                    />
                </div>
                <div>
                <label htmlFor="price">price</label>
                    <input
                    id="price"
                    name="price"
                    type="text"
                    value={data.price}
                    onChange={handleInputChange}
                    className="text-input"
                    />
                </div>
                 <div className="form-error">
                      <p>
                      {data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}
                      </p>
                </div>
                <div className="form-action clearfix">
                <button disabled={data.isSubmitting}>
              {data.isSubmitting ? (
                <p>loading</p>
              ) : (
                "ADD_ITEM_REQUEST"
              )}
            </button>
                   
                </div>
              </form>
        </div>
       
    );
};

export default withRouter(Create);;

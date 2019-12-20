import React, {Fragment } from 'react';
import {useHistory} from 'react-router-dom'
import '../../styles/style.css';
import {  toast } from 'react-toastify';

export const Create = (() => {
  const history=useHistory()
  const initial = {
    itemName: '',
    description: '',
    imageUrl: '',
    price: '',
    status:'Pending',
    author: sessionStorage.getItem('userId')
}
const [data, setData] = React.useState(initial);

const handleChange = event => {
  setData({
    ...data,
    [event.target.name]: event.target.value
  });
};

    const isButtonDisabled = data.itemName === "" || data.description === "" || data.imageUrl === "" ||data.price === "";


const handleCreateSubmit = event => {
    event.preventDefault();
  fetch('http://localhost:9999/crud/item/create', {
    method: 'POST',
    body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }

    })
    .then(rawData => rawData.json())
    .then(responseBody => {
        if (!responseBody.errors) {
             history.push('/home')
          

        } else {
            toast.error(responseBody.message, {closeButton: false})
        }
    })
  }
        return (
            <Fragment>
                <div className="create-item">
                    <h1>Create Item</h1>
                    <span>Item name</span>
                    {isButtonDisabled ? <p>Please fill all fields</p>:<p></p>}
                    <form onSubmit={handleCreateSubmit} >
                        <input type="text" onChange={handleChange} name="itemName" placeholder="Enter item name" />
                        <span>Description</span>
                        <input type="text" onChange={handleChange} name="description" placeholder="Enter item description" />
                        <span>Image Url</span>
                        <input type="text" onChange={handleChange} name="imageUrl" placeholder="Enter item image URL" />
                        <span>Price</span>
                        <input type="text" onChange={handleChange} name="price" placeholder="Enter price" />
                        <button className="create-item-button" disabled={isButtonDisabled}>Create item</button>
                    </form>
                </div>
            </Fragment>
        )
    })

export default Create; 
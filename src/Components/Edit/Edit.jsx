import React  from 'react';

import '../../styles/style.css';
import {withRouter} from 'react-router-dom'


export const Edit = ((props) => {
  
    const [data, setData] = React.useState(props.location.state.item);
    
    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };
    const isButtonDisabled = data.itemName === "" || data.description === "" || data.imageUrl === "" ||data.price === "";
    const handleFormSubmit = event => {
        
        event.preventDefault();
        fetch(`http://localhost:9999/crud/item/edit/${data._id}`, {

            body: JSON.stringify(data),

            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            }

        }).then(res => res.json() )
        { window.location.href = 'http://localhost:3000'; }
    }

    return (

        <div className="edit-item">
            {
                !data
                    ? <div>
                            <h1>load</h1>
                        </div>
                    : <form onSubmit={handleFormSubmit} className="create-item">
                            <div className="modal-form-inputs">

                                <label htmlFor="itemName">itemName</label>
                                <input
                                    id="itemName"
                                    name="itemName"
                                    type="text"
                                    value={data.itemName}
                                    onChange={handleInputChange}
                                    className="text-input"/>

                                <label htmlFor="description">description</label>
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    value={data.description}
                                    onChange={handleInputChange}
                                    className="text-input"/>

                                <label htmlFor="imageUrl">Image URL</label>
                                <input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="text"
                                    value={data.imageUrl}
                                    onChange={handleInputChange}
                                    className="text-input"/>
                            </div>
                            <div>
                                <label htmlFor="price">price</label>
                                <input
                                    id="price"
                                    name="price"
                                    type="text"
                                    value={data.price}
                                    onChange={handleInputChange}
                                    className="text-input"/>
                            </div>
                            <div className="form-error">
                                <p>
                                    {data.errorMessage && (<span className="form-error">{data.errorMessage}</span>)}
                                </p>
                            </div>
                            <div className="form-action clearfix">
                                <button disabled={isButtonDisabled}>
                                    {
                                      <p>Edit Item</p>
                                    }
                                </button>

                            </div>
                        </form>
            }
        </div>

    );
})

export default withRouter(Edit);
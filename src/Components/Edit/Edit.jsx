import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';
import '../../styles/style.css';
import {withRouter} from 'react-router-dom'
class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            description: '',
            imageUrl: '',
            price: ''
        }
        this.handleChange = props.handleChange.bind(this);
    }

    render() {
        let currentProduct = {};

        this.props.items.forEach(element => {
            if (element._id === this.props.match.params.id) {
                currentProduct = element;
                return;
            }
        });

        let editItem = (e, data) => {
            e.preventDefault();
            data._id = this.props.match.params.id;

            data.itemName = data.itemName ? data.itemName : currentProduct.itemName;
            data.description = data.description ? data.description : currentProduct.description;
            data.imageUrl = data.imageUrl ? data.imageUrl : currentProduct.imageUrl;
            data.price = data.price ? data.price : currentProduct.price;

            fetch('http://localhost:9999/crud/item/edit', {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json', }

            })
                .then(responseBody => {
                    if (!responseBody.errors) {
                        toast.success("item edited successfully", {
                            closeButton: false,
                        })
                        this.props.history.push('/')
                    } else {
                        toast.error("Something went wrong", {
                            closeButton: false,
                        })
                    }
                })

        }

        return (
            <Fragment>
                <div className="edit-item">
                    <form onSubmit={(e) => editItem(e, this.state)}>
                        <h1>Edit item</h1>
                        <span>item name</span>
                        <input type="text" onChange={this.handleChange} placeholder={`${currentProduct.itemName}`} readOnly={false} name="itemName" />
                        <span>Description</span>
                        <input type="text" onChange={this.handleChange} placeholder={`${currentProduct.description}`} name="description" />
                        <span>Image Url</span>
                        <input type="text" onChange={this.handleChange} placeholder={`${currentProduct.imageUrl}`} name="imageUrl" />
                        <span>Price</span>
                        <input type="text" onChange={this.handleChange} placeholder={`${currentProduct.price}`} name="price" />
                        <button >Edit item</button>
                    </form>

                </div>
            </Fragment>

        )
    }
}

export default withRouter(Edit);
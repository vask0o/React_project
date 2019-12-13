import React, { Component, Fragment } from 'react';
import '../../styles/style.css';
import {withRouter} from 'react-router-dom';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: null,
            description: null,
            imageUrl: null,
            price: null,
            author: sessionStorage.userId,
            status: 'Pending',
        }
        setStatus("");
        setAuthor("");
        setImageUrl("");
        setPrice("");
        setItemName("");
        setDescription("");
        this.handleChange = props.handleChange.bind(this);
    }

    render() {
        return (
            <Fragment>
                <div className="create-item">
                    <h1>Create Item</h1>
                    <span>Item name</span>
                    <form onSubmit={(e) => this.props.handleCreateSubmit(e, this.state)} >
                        <input type="text" onChange={this.handleChange} name="itemName" placeholder="Enter item name" />
                        <span>Description</span>
                        <input type="text" onChange={this.handleChange} name="description" placeholder="Enter item description" />
                        <span>Image Url</span>
                        <input type="text" onChange={this.handleChange} name="imageUrl" placeholder="Enter item image URL" />
                        <span>Price</span>
                        <input type="text" onChange={this.handleChange} name="price" placeholder="Enter pizza price" />
                        <button>Create item</button>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(Create);
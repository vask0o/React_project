import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/style.css';

class MyItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId:sessionStorage.getItem('userId')
        }
    
     
    
    }
    render() {
        let currentProduct = {};
        this.props.items.forEach(element => {
            if (element._id === this.props.match.params.id) {
                currentProduct = element;
                return;
            }
        });
        let currentUsername = sessionStorage.getItem('username');
        let data = {
            productName: currentProduct.itemName,
            price: currentProduct.price,
            user: currentUsername,
            itemQnt: this.state.itemQnt

        }

       

        return (
            <Fragment>
                <form >
                    <div className="orders-wrapper">
                        <div className="productImage">
                            <img src={currentProduct.imageUrl} />
                        </div>
                        <div className="orders">
                            <span>Product</span>
                            <span className="item-name" name="productName">{currentProduct.itemName}</span>

                            <span>Price</span>
                            <span className="item-total-price" name="price">{currentProduct.price}</span>
                            <input className="itemQuantity" onChange={this.handleChange.bind(this)} name="itemQnt" type="number"
                                value={this.state.itemQnt} readOnly={false}/>
                            <div className="order-buttons">
                                <NavLink to="/" className="continue-shopping">Back to menu</NavLink>
                                <button className="checkout">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }

    
}
export default MyItems;
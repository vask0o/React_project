import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import {  toast } from 'react-toastify';
import '../../styles/style.css';

class Home extends Component {

    render() {

        function deleteItem(id) {
            let requestBody = {
                _id: id
            }
            fetch('http://localhost:9999/crud/item/delete', {
                method: "DELETE",
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', }
            }).then(
                toast.success('Item deleted successfully', {
                    closeButton: false,
                })
            );
            { window.location.href = 'http://localhost:3000'; }
        }
        return (
            <Fragment>
                <section className="main-description">
                    <h1>Welcome to our Item Shop!</h1>
                </section>
                
                <main>
                    <section>
                        {this.props.isLogged ? this.props.items.map(item => (

                            <div className="single-item" key={item._id}>
                                <img src={item.imageUrl} />
                                <span className="boldText">Product</span>
                                <span className="item-name">{item.itemName}</span>
                                <div className="item-details">
                                    <span className="boldText">Price</span>
                                    <span className="item-price">{item.price}</span>
                                    {
                                        !this.props.isAdmin ?(
                                            
                                                <Fragment>
                                                    <NavLink className="orderBtn" to={`details/${item._id}`}>Details</NavLink>
                                                    <NavLink to="/edit" className="editButton" to={`edit/${item._id}`}>Edit</NavLink>
                                                 </Fragment>
                                            ):
                                            
                                            (<Fragment>
                                            <div className="userOrdDetailsBtns">
                                                  <button className="deleteButton" onClick={() => { deleteItem(`${item._id}`) }} type="submit">Delete</button>
                                                
                                                   <NavLink className="orderBtn" to={`details/${item._id}`}>Details</NavLink>
                                            </div>
                                             </Fragment>)
                                    }
                                </div>
                            </div>
                        )):<p>Please Login</p>}
                    </section>
                </main>
                <footer>
                    <span>Item Shop 2019</span>
                </footer>
            </Fragment>
        )
    }
}

export default Home;
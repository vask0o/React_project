import React, { Fragment } from 'react';
import { NavLink,withRouter } from 'react-router-dom';
import {  toast } from 'react-toastify';
import '../../styles/style.css';


class Home extends React.Component {

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
            this.props.history.push('/Home') 
        }

      
        return (
            <Fragment>
                <section className="main-description">
                    <h1>OLX BG</h1>
                </section>
               
                <main>
                    <section>
                        
                        {this.props.items.map(item => (
                        <div className="single-item" key={item._id}>
                                <img src={item.imageUrl} alt='pic' />
                                <span className="boldText">Product</span>
                                <span className="item-name">{item.itemName}</span>
                                <div className="item-details">
                                    <span className="boldText">Price</span>
                                    <span className="item-price">{item.price}</span>
                                    <span className="boldText">Status</span>
                                <span className="item-name">{item.status}</span>
                                    {
                                      
                                        this.props.isAdmin ?
                                            (
                                                
                                                <Fragment>
                                                     <button className="deleteButton" onClick={() => { deleteItem(`${item._id}`) }} type="submit">Delete</button>
                                                     <NavLink className="orderBtn" to={`details/${item._id}`}>Details</NavLink>
                                                </Fragment>
                                            )
                                            :
                                            <div className="userOrdDetailsBtns">
                                                
                                                <NavLink  className="editButton" to={`edit/${item._id}`}>Edit</NavLink>
                                            </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </section>
                </main>
                <footer>

                    <span>OLX</span>
                </footer>
            </Fragment>
        )
    }
}

export default withRouter(Home);
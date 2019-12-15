import React, { Component,Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import MapContainer from 'google-map-react'
import '../../styles/style.css';

class Details extends Component {
    render() {
        let currentProduct = {};
        this.props.items.forEach(element => {
            if (element._id === this.props.match.params.id) {
                currentProduct = element;
                return;
            }
        });

        return (
            <div className="details">
                <h1>Details</h1>
                <div className="details-img">
                    <img src={currentProduct.imageUrl} />
                </div>
                <span></span>
                <p className="product-description">{currentProduct.description}</p>
                <p className="product-description">{currentProduct.status}</p>
                <p className="product-description">{currentProduct.itemName}</p>
                
              {  !this.props.isAdmin ?(
                                            
                                            <Fragment>
                                                <NavLink className="approve" to={`approve/${currentProduct._id}`}>Approve</NavLink>
                                                <NavLink to="/edit" className="reject" to={`reject/${currentProduct._id}`}>Reject</NavLink>
                                             </Fragment>
                                        ):
                <NavLink to="/" className="continue-shopping1">Back to menu</NavLink>
              }
            </div>
        )
    }
}
export default Details;

import React, { Component,Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import {  toast } from 'react-toastify';
import axios from 'axios';
import '../../styles/style.css';

class Details extends Component {
    
    render() {
        console.log(this.props)
        let currentProduct = {};
        this.props.items.forEach(element => {
            if (element._id === this.props.match.params.id) {
                currentProduct = element;
                return;
            }
        });
        function decisionItem(id,status) {
            
            let data = {
                _id: id,
                status:status
            }
            console.log(data)
            
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
            this.props.history.push('/Home') 
        }

        return (
            <div className="details">
                <h1>Details</h1>
                <div className="details-img">
                    <img src={currentProduct.imageUrl} alt='pic' />
                </div>
                
                <p className="product-description">{currentProduct.description}</p>
                {this.props.isAdmin ? 
            <Fragment>
                
                <button className="approveButton" onClick={() => { decisionItem(`${this.currentProduct.id}`,`Approved`)}} type="submit">Approve</button>
                <button className="rejectButton" type="submit">Reject</button>
            </Fragment>  : <NavLink to="/" className="continue-shopping1">Back to menu</NavLink> 
            }
                
            </div>
        )
    }
}
export default Details;

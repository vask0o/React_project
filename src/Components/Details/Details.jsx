import React, { Component,Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import {  toast } from 'react-toastify';
import '../../styles/style.css';

class Details extends Component {
    
    componentDidMount(){
        
        console.log(this.props)
    }
    render() {
        
        
        let currentProduct =this.props.location.state.item
        console.log(currentProduct)
        
        
        
        function decisionItem(id,status) {
            
            let data = {
                _id: id,
                status:status
            }
            
            
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
                <p className="product-name">{currentProduct.itemName}</p>
                
                <p className="product-description">{currentProduct.description}</p>
                {this.props.isAdmin ? 
            <Fragment>
                
                <button className="approveButton" onClick={() => { decisionItem(`${this.currentProduct.id}`,`Approved`)}} type="submit">Approve</button>
                <button className="rejectButton" type="submit">Reject</button>
            </Fragment>  : <NavLink to="/home" className="continue-shopping1">Back to menu</NavLink> 
            }
                
            </div>
        )
    }
}
export default Details;

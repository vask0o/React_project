import React, { Component,Fragment } from 'react';
import { NavLink, } from 'react-router-dom';
import '../../styles/style.css';

class Details extends Component {
    
    componentDidMount(){
        
        console.log(this.props)
    }
    render() {
        const { history } = this.props;
        
        let currentProduct =this.props.location.state.item
        console.log(history)
        
        
        
        function decisionItem(id,status) {
            debugger
            let data = {
                _id:id,
                status:status
            }
            debugger;
            fetch(`http://localhost:9999/crud/itemOne/${data._id}`, {

            body: JSON.stringify(data),

            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            }

        }).then(res => res.json(
           history.push('/home')
        ) )
            
        }

        return (
            <div className="details">
                <h1>Details</h1>
                <div className="details-img">
                    <img src={currentProduct.imageUrl} alt='pic' />
                </div>
                <p className="product-name">{currentProduct.itemName}</p>
                
                <p className="product-description">{currentProduct.description}</p>
                {this.props.location.state.isAdmin==='true' ? 
            <Fragment>
                
                <button className="approveButton" onClick={() => { decisionItem(`${currentProduct._id}`,`Approved`)}} type="submit">Approve</button>
                <button className="rejectButton"onClick={() => { decisionItem(`${currentProduct._id}`,`Rejected`)}} type="submit">Reject</button>
            </Fragment>  : <NavLink to="/home" className="continue-shopping1">Back to menu</NavLink> 
            }
                
            </div>
        )
    }
}
export default Details;

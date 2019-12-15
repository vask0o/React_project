import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/style.css';
class UserOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pendingOrders: {}
        }
    }
    componentWillMount() {
        fetch('http://localhost:9999/crud/user/getPendingOrders', {
            method: "GET",
        }).then(rawData => rawData.json())
            .then(data => {
                this.setState({
                    pendingOrders: data
                })
            })
    }
    deleteUserOrder(id) {
        let userObj = {
            id: id
        }
        fetch('http://localhost:9999/crud/user/deleteSingleOrder', {
            method: "POST",
            body: JSON.stringify(userObj),
            headers: { 'Content-Type': 'application/json', }
        })
        window.location.href = 'http://localhost:3000/pendingOrders';


    }
    render() {
        let currentUser = sessionStorage.getItem('username');
        let allData = this.state.pendingOrders.orders;
        if (allData) {
            for (let i = 0; i < allData.length; i++) {
                for (let j = 0; j < allData[i].itemsName.length; j++) {

                    let itemQnt = allData[i].itemsName[j].slice(-1);
                    allData[i].itemsName[j] = allData[i].itemsName[j].substr(0, allData[i].itemsName[j].length - 1);
                    allData[i].itemsName[j] = allData[i].itemsName[j] + " - " + "Quantity: " + itemQnt;
                }
            }
        }
        console.log(allData);
        return (
            allData ? (<Fragment>
                <h1 className="pending-orders-title">Pending Orders</h1>

                <section className="main-pending-orders">
                    {
                        allData.map(singleUserData => (
                            <div key={singleUserData._id} className="pending-orders">
                                <div className="pending-order-user">
                                    <span>Username: </span>
                                    <span>{singleUserData.user}</span>
                                </div>
                                <div className="pending-order-date">
                                    <span>Date order: </span>
                                    <span>{singleUserData.dateCreated}</span>
                                </div>
                                <div className="pending-order-orders">
                                    <p>User orders:</p>
                                    {
                                        singleUserData.itemsName.map(item => (
                                            <div key="{item}" className="pendin-orders-items">{item}</div>
                                        )
                                        )
                                    }
                                </div>
                                <div className="pending-order-sum">
                                    <span>Total sum: </span>
                                    <span>{singleUserData.totalSum} USD</span>
                                </div>
                                <button type="submit" className="checkout" onClick={() => { this.deleteUserOrder(singleUserData._id) }}>Checkout</button>

                            </div>
                        )
                        )
                    }
                </section>

            </Fragment>)
                : <div className="noCartPage">
                    <h2 className="noItems">There are currently no pending orders!</h2>
                    <NavLink className="backBtn" to="/">Back to menu</NavLink>
                </div>

        )
    }
}
export default UserOrders;
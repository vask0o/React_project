import React, { Fragment, useEffect ,useState} from 'react';
import axios from 'axios'
import {withRouter,Link } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { AuthContext } from "../../App";
import '../../styles/style.css';


export const Home = () => {
  const [data, setData] = useState({ items: [] });
  const { state:authState} = React.useContext(AuthContext);
  
 
  useEffect(()=>{
    if (!authState.isAuthenticated) {return;}
    const loadData=async()=>{
      let query={
        status:'Approved',
        id:authState.userId
      }
      if(authState.isAdmin==='true'){
        query={status:'Pending'}
  
      }
    
      const res = await axios.get('http://localhost:9999/crud/items',
      {params:{query}})
      
      setData(res.data)
    }
    
    
    
    
    
  
loadData()
     

    
},[authState.isAuthenticated])


    

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
                        {authState.isAuthenticated&&data.items? data.items.map(item => (

                            <div className="single-item" key={item._id}>
                                <img src={item.imageUrl}  alt="imgUrl"/>
                                <span className="boldText">Product</span>
                                <span className="item-name">{item.itemName}</span>
                                <div className="item-details">
                                    <span className="boldText">Price</span>
                                    <span className="item-price">{item.price}</span>
                                    <span className="boldText">Status</span>
                                    <span className="item-price">{item.status}</span>
                                    { authState.isAdmin==='true' ?
                                            <div className="userOrdDetailsBtns">
                                            <Link className="orderBtn" to={{pathname:`details/${item._id}`,state:{item:item,isAdmin:authState.isAdmin}}}>Details</Link>
                                           </div>
                                            
                                    :
                                        (item.author===authState.userId ?(
                                            
                                                <Fragment>
                                                    <button className="deleteButton" onClick={() => { deleteItem(`${item._id}`) }} type="submit">Delete</button>
                                                    {item.status!=='Approved' ?
                                                    <Link  className="editButton"  to={{pathname:`edit/${item._id}`,state:{item:item},isAdmin:authState.isAdmin}}>Edit</Link>:null}
                                                 </Fragment>
                                            ):null)
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

export default withRouter(Home);
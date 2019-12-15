import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';




 function Profile () {
    
    const [data, setDate] = useState(null)

    useEffect(() => {
        const id = JSON.parse(window.localStorage.getItem('userId'));
        
            
        
    }, {})
    
    return (
      
        <div className='profile'>

            <div>
               <h2>First Name: {data ? data.firstName : <p>Loading...</p>}</h2>
            </div>

            <div>
               <h2>Last Name: {data ? data.lastName : <p>Loading...</p>}</h2>
            </div>

            <div>
               <h2>Age: {data ? data.age : <p>Loading...</p>}</h2>
            </div>

            <div>
               <h2>Sex: {data ? data.sex : <p>Loading...</p>}</h2>
            </div>

            <div>
                <Link to='/location'><button>Location</button></Link>
            </div>
          
        </div>
    )
}
  
    

export default Profile;
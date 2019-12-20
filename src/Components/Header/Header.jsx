import React, {Fragment } from 'react';
import { NavLink} from 'react-router-dom';
import '../../styles/style.css';

import { AuthContext } from "../../App";

export const Header = () => {
   
    const { state, dispatch } = React.useContext(AuthContext);
    
    
    return (
      <nav className="navigation" id="navigation">
        <h1 href="#" className="logo">
          HOOKED
        </h1>
        <ul>
     <li><NavLink exact to="/home">Home</NavLink></li>
     {state.isAuthenticated ?
         (
             <Fragment>
                 <li>
                     <NavLink to="/create">Create</NavLink>
                 </li>
                 <li>
                     <NavLink to="/my">My</NavLink>
                 </li>
             </Fragment>
         )

         : null}
     {state.isAuthenticated ? (
             <Fragment>
                 <li className="logged-username">Welcome {state.username}!</li>
             </Fragment>
         )
             :
             (<Fragment>
                 <li><NavLink to="/register">Register</NavLink></li>
                 <li><NavLink to="/login">Login</NavLink></li>
             </Fragment>)
     }
        </ul>
             <button
             onClick={() =>
                 dispatch({
                 type: "LOGOUT"
                 })
                
             }
             >
             {state.isAuthenticated && (
                 <h1>Hi {state.username} (LOGOUT)</h1>
             )}
             </button>
         </nav>
         );
     };


  export default Header;
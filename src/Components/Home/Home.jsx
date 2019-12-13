import React from "react";
import { AuthContext } from "../../App";
import { withRouter } from 'react-router-dom';
import { Map, GoogleApiWrapper } from 'google-maps-react';
export const Home = () => {
    const { state } = React.useContext(AuthContext);
    console.log(state)
return (
    <React.Fragment>
    
 
    </React.Fragment>
  );
};

export default withRouter(Home);
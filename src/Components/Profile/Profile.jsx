//import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
// import Geocode from "react-geocode";
// Geocode.setApiKey('AIzaSyCTQRH_nOlyGBZlg4NhsUBPLypwRROTNRw');
// Geocode.setLanguage("en");
// const city=sessionStorage.getItem('location')
//   const loc=  Geocode.fromAddress('varna').then(
//         response => {
//          return response.results[0].geometry.location
       
//         })
//         console.log(loc)
//         function Profile(){


//         }
  
import React, { Component } from 'react'
import { Map, GoogleApiWrapper ,Marker} from 'google-maps-react';
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    const loc=sessionStorage.getItem('location')
    if(loc==='sofia'){
        this.state = {
            lat:42.6670987, lng:23.3516777
          }
        }else if(loc==='varna'){
            this.state = {
                lat:43.2073492, lng:27.893802
              }
      }
   
  }

  displayMarkers = () => {
    console.log('marker')
    
      return <Marker position={{
        lat:this.state.lat,
        lng:this.state.lng
     }}
     onClick={() => console.log("You clicked me!")} />
    }
  

  render() {
    const mapStyles = {
      width: '70%',
      height: '70%',
    };
    return (
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat:this.state.lat, lng:this.state.lng}}
        >
          {this.displayMarkers()}
        </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCTQRH_nOlyGBZlg4NhsUBPLypwRROTNRw'
})(MapContainer);
        
    


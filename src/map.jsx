import React, { Component } from 'react'
import { Map, GoogleApiWrapper ,Marker} from 'google-maps-react';
import Geocode from "react-geocode";
Geocode.setApiKey('AIzaSyCTQRH_nOlyGBZlg4NhsUBPLypwRROTNRw');
Geocode.setLanguage("en");

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    Geocode.fromAddress("Varna").then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      error => {
        console.error(error);
      }
    );
    this.state = {
      lat:42.6670987, lng:23.3516777
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
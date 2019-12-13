import React, { Component } from 'react'
import { Map, GoogleApiWrapper ,Marker} from 'google-maps-react';
export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat:42.650391, lng:26.980009
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
      width: '100%',
      height: '100%',
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
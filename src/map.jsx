import React, { Component, createRef } from 'react'
import { Map, GoogleApiWrapper ,Marker} from 'google-maps-react';
export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [{lat:42.650391, lng:26.980009}]
    }
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
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
          initialCenter={{ lat:42.650391, lng:26.980009}}
        >
          {this.displayMarkers()}
        </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCTQRH_nOlyGBZlg4NhsUBPLypwRROTNRw'
})(MapContainer);
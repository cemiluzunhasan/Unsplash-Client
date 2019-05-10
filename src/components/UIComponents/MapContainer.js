import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class MapContainer extends Component {

  render() {
    let { location } = this.props;

    return (
      <div className='google-map'>
        {this.props.location && <GoogleMapReact
          defaultZoom={12}
          bootstrapURLKeys={{
            key: 'AIzaSyBIFSTaO6frCoF8iI1iJoeqhbDcp8Y4pIQ',
            language: 'en',
            region: 'en',
            }}
          center={[location.latitude, location.longitude]}
          onChange={this.onChange}
          >
            <img src="/static/logo/location.svg" lat={location.longitude} lng={location.longitude} className="marker" alt="marker" />
        </GoogleMapReact>}
      </div>
    )
  }
}

export default MapContainer;

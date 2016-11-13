import React, { Component } from 'react';
import { AppBar, IconButton, Panel } from 'react-toolbox';
import { themr } from 'react-css-themr';
import defaultTheme from './Explore.scss';
import GoogleMap from 'google-map-react';
import Marker from './Marker';

class Explore extends Component {
    
    state = {
      center: {lat: 39.8282, lng: -98.5795},
      zoom: 4,
      greatPlaceCoords: {lat: 39.8282, lng: 98.5795}
    };
    
    static propTypes = {
      toggleDrawerActive: React.PropTypes.func.isRequired
    }
    
    onChange = ({center, zoom}) => {
      this.setState({
        center: center,
        zoom: zoom,      
      });
    }

    render() {
      return (
        <Panel>
          <AppBar title={'Explore'} leftIcon={'menu'} onLeftIconClick={this.props.toggleDrawerActive} />
          <GoogleMap onChange={this.onChange} center={this.state.center} zoom={this.state.zoom}>
            <Marker theme={defaultTheme} lat={37.7749} lng={-122.4194} text={"333"} />
            <Marker theme={defaultTheme} lat={34.0522} lng={-118.2437} text={"333"} />
            <Marker theme={defaultTheme} lat={40.7128} lng={-74.0059} text={"333"} />
          </GoogleMap>
        </Panel>
      );
    }
}
export default themr('Explore', defaultTheme)(Explore);

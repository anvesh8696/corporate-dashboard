import React, { Component, PropTypes } from 'react';
import { AppBar, Panel, Switch } from 'react-toolbox';
import { themr } from 'react-css-themr';
import defaultTheme from './Explore.scss';
import GoogleMap from 'google-map-react';
import Marker from './Marker';
import MapStyle from './MapStyle';

class Explore extends Component {
    
    static propTypes = {
      toggleDrawerActive: PropTypes.func.isRequired,
      offices: PropTypes.array.isRequired,
      fetchOffices: PropTypes.func.isRequired,
      togglePush: PropTypes.func.isRequired,
      push: PropTypes.bool.isRequired
    }
    
    state = {
      center: {lat: 39.8282, lng: -98.5795},
      zoom: 4
    };
    
    componentDidMount() {
      this.props.fetchOffices();
    }
    
    onChange = ({center, zoom}) => {
      this.setState({
        center: center,
        zoom: zoom,
      });
    }

    render() {
      const markers = this.props.offices.map((o) => {
        return <Marker key={o.id} theme={defaultTheme} {...o} text={String(o.employees)} />;
      });
      return (
        <Panel>
          <AppBar title={'Explore'} leftIcon={'menu'} onLeftIconClick={this.props.toggleDrawerActive}>
            <Switch
              label="Push"
              className={defaultTheme.switch}
              checked={this.props.push}
              onChange={this.props.togglePush}
            />
          </AppBar>
          <GoogleMap
            options={{ styles: MapStyle }}
            onChange={this.onChange}
            center={this.state.center}
            zoom={this.state.zoom}>
            {markers}
          </GoogleMap>
        </Panel>
      );
    }
}
export default themr('Explore', defaultTheme)(Explore);

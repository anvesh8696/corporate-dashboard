import React, { Component } from 'react';
import { AppBar, IconButton, Panel } from 'react-toolbox';
import { themr } from 'react-css-themr';
import defaultTheme from './Explore.scss';

class Explore extends Component {
    
    static propTypes = {
      toggleDrawerActive: React.PropTypes.func.isRequired
    }

    render() {
      return (
        <Panel>
          <AppBar title={'Explore'} leftIcon={'menu'} onLeftIconClick={this.props.toggleDrawerActive} />
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          </div>
        </Panel>
      );
    }
}
export default themr('Explore', defaultTheme)(Explore);

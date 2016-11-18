import React, { Component } from 'react'
import { Layout, NavDrawer} from 'react-toolbox';
import Navigation from 'react-toolbox/lib/navigation';
import { themr } from 'react-css-themr';
import defaultTheme from './PageLayout.scss';

export default function (Wrapped){

  class PageLayout extends Component {
    
      static propTypes = {
        location: React.PropTypes.object.isRequired,
        theme: React.PropTypes.object.isRequired
      }
    
      state = {
        drawerActive: false,
        drawerPinned: false
      };
  
      toggleDrawerActive = () => {
        this.setState({ drawerActive: !this.state.drawerActive });
      };
  
      toggleDrawerPinned = () => {
        this.setState({ drawerPinned: !this.state.drawerPinned });
      }
  
      render() {
        const { pathname } = this.props.location;
        const { theme } = this.props;
        const routes = [
          { href:'#/', label: 'Explore', icon: 'room', active:(pathname == '/')},
          { href:'#/metrics', label: 'Metrics', icon: 'access_alarm', active:(pathname == '/metrics')},
          { href:'#/issues', label: 'Issues', icon: 'room', active:(pathname == '/issues')}
        ];
        return (
          <Layout>
            <NavDrawer active={this.state.drawerActive} className={theme.navDrawer}
              theme={theme}
              pinned={this.state.drawerPinned} permanentAt='md'
              onOverlayClick={ this.toggleDrawerActive }>
              <Navigation type='vertical' routes={routes} className={theme.nav} />
            </NavDrawer>
            <Wrapped
              toggleDrawerActive={this.toggleDrawerActive}
            />
          </Layout>
        );
      }
  }
  return themr('PageLayout', defaultTheme)(PageLayout);
}

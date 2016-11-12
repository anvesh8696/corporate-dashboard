import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import PageLayout from 'components/PageLayout';
import Explore from 'components/Explore';
import Metrics from 'components/Metrics';
import Issues from 'components/Issues';
import { Provider } from 'react-redux';

export default class Routes extends Component {
  
  static propTypes = {
    store: React.PropTypes.object.isRequired,
    history: React.PropTypes.object.isRequired
  }
  
  state = {
    ready: false
  }
  
  renderLoading(){
    return (
      <div>LOADING</div>
    );
  }
  
  renderRoutes(){
    return (
      <Router history = { this.props.history }>
        <Route path='/' component = { PageLayout(Explore) } />
        <Route path='/metrics' component = { PageLayout(Metrics) } />
        <Route path='/issues' component = { PageLayout(Issues) } />
      </Router>
    );
  }
  
  componentDidMount(){
    const getState = this.props.store.getState;
    let db = getState()['db'];
    db.connect().then(() => {
      this.setState({
        ready: true
      });
    });
  }
  
  render() {
    let content = this.state.ready ? this.renderRoutes() : this.renderLoading();
    return (
      <Provider store={this.props.store}>
        {content}
      </Provider>
    );
  }
}

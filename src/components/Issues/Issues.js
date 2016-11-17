import React, { Component, PropTypes } from 'react';
import { AppBar, Panel, Switch } from 'react-toolbox';
import { themr } from 'react-css-themr';
import defaultTheme from './Issues.scss';
import 'react-virtualized/styles.css';
import IssuesTable from './IssuesTable';
import Search from './Search';

class Issues extends Component {
    static propTypes = {
      toggleDrawerActive: PropTypes.func.isRequired,
      issues: PropTypes.array.isRequired,
      fetchIssues: PropTypes.func.isRequired,
      togglePush: PropTypes.func.isRequired,
      push: PropTypes.bool.isRequired
    }
    
    state = {
      search: ''
    }
    
    componentDidMount() {
      this.props.fetchIssues();
    }
    
    handleSearch = (search) => {
      this.setState({...this.state, search: search});
    }

    render() {
      return (
        <Panel>
          <AppBar title={'Issues'} leftIcon={'menu'} onLeftIconClick={this.props.toggleDrawerActive} >
            <Switch
              label="Push"
              className={defaultTheme.switch}
              checked={this.props.push}
              onChange={this.props.togglePush}
            />
          </AppBar>
          <Search onSearch={this.handleSearch} />
          <IssuesTable issues={this.props.issues} search={this.state.search} />
        </Panel>
      );
    }
}
export default themr('Issues', defaultTheme)(Issues);

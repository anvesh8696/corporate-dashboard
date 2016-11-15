import React, { Component } from 'react';
import { AppBar, IconButton, Panel } from 'react-toolbox';
import { themr } from 'react-css-themr';
import defaultTheme from './Issues.scss';
import 'react-virtualized/styles.css';
import IssuesTable from './IssuesTable';
import Search from './Search';

class Issues extends Component {
    static propTypes = {
      toggleDrawerActive: React.PropTypes.func.isRequired,
      issues: React.PropTypes.array.isRequired,
      fetchIssues: React.PropTypes.func.isRequired
    }
    
    state = {
      search: ''
    }
    
    componentDidMount() {
      this.props.fetchIssues();
    }
    
    onSearch = (search) => {
      this.setState({search: search});
    }

    render() {
      return (
        <Panel>
          <AppBar title={'Issues'} leftIcon={'menu'} onLeftIconClick={this.props.toggleDrawerActive} />
          <Search onSearch={this.onSearch} />
          <IssuesTable issues={this.props.issues} search={this.state.search} />
        </Panel>
      );
    }
}
export default themr('Issues', defaultTheme)(Issues);

import React, { Component } from 'react';
import { AppBar, IconButton, Panel } from 'react-toolbox';
import { themr } from 'react-css-themr';
import defaultTheme from './Issues.scss';
import 'react-virtualized/styles.css';
import IssuesTable from './IssuesTable';
import { fetchIssues } from './IssuesModule';

class Issues extends Component {
    static propTypes = {
      toggleDrawerActive: React.PropTypes.func.isRequired,
      issues: React.PropTypes.object.isRequired,
      employees: React.PropTypes.object.isRequired,
      fetchIssues: React.PropTypes.func.isRequired
    }
    
    componentDidMount() {
      this.props.fetchIssues();
    }

    render() {
      return (
        <Panel>
          <AppBar title={'Issues'} leftIcon={'menu'} onLeftIconClick={this.props.toggleDrawerActive} />
          <IssuesTable issues={this.props.issues} />
        </Panel>
      );
    }
}
export default themr('Issues', defaultTheme)(Issues);

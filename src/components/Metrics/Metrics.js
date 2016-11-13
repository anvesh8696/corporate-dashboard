import React, { Component, PropTypes } from 'react';
import { AppBar, Card, CardTitle, Panel } from 'react-toolbox';
import { themr } from 'react-css-themr';
import defaultTheme from './Metrics.scss';
import IssuesChart from './IssuesChart';
import CustomersChart from './CustomersChart';

class Metrics extends Component {
    static propTypes = {
      toggleDrawerActive: PropTypes.func.isRequired,
      fetchData: PropTypes.func.isRequired,
      monthlyIssues: PropTypes.array.isRequired,
      openIssues: PropTypes.number.isRequired,
      payingCustomers: PropTypes.array.isRequired
    }
    
    componentDidMount() {
      this.props.fetchData();
    }

    render() {
      const title = `${this.props.openIssues} Open Issues`;
      return (
        <Panel>
          <AppBar title={'Metrics'} leftIcon={'menu'} onLeftIconClick={this.props.toggleDrawerActive} />
          <div style={{overflowY:'auto'}}>
            <Card style={{width: '350px', margin:'10px'}}>
              <CardTitle title={title} className={defaultTheme.issues}/>
            </Card>
            <IssuesChart data={this.props.monthlyIssues}/>
            <CustomersChart data={this.props.payingCustomers}/>
          </div>
        </Panel>
      );
    }
}
export default themr('Metrics', defaultTheme)(Metrics);

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
        <Panel scrollY={Boolean(true)}>
          <AppBar title={'Metrics'} leftIcon={'menu'} onLeftIconClick={this.props.toggleDrawerActive} />
          <div className={defaultTheme.page}>
            <Card className={defaultTheme.issuesCard}>
              <CardTitle title={title} className={defaultTheme.issues}/>
            </Card>
            <div className={defaultTheme.chartContainer} >
              <div className={defaultTheme.chart} >
                <IssuesChart data={this.props.monthlyIssues}/>
              </div>
              <div className={defaultTheme.chart} >
                <CustomersChart data={this.props.payingCustomers}/>
              </div>
            </div>
          </div>
        </Panel>
      );
    }
}
export default themr('Metrics', defaultTheme)(Metrics);

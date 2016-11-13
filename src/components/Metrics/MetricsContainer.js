import { connect } from 'react-redux'
import Metrics from './Metrics'
import { fetchMonthlyIssues, fetchTotalOpenIssues, fetchPayingCustomers } from './MetricsModule'

const mapStateToProps = (state) => {
  return {
    monthlyIssues: state.metrics.monthlyIssues,
    openIssues: state.metrics.openIssues,
    payingCustomers: state.metrics.payingCustomers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(fetchMonthlyIssues());
      dispatch(fetchTotalOpenIssues());
      dispatch(fetchPayingCustomers());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Metrics);

import { connect } from 'react-redux';
import Metrics from './Metrics';
import { fetchMonthlyIssues, fetchTotalOpenIssues, fetchPayingCustomers } from './MetricsModule';
import { togglePush } from '../../db/DBModule';

const mapStateToProps = (state) => {
  return {
    monthlyIssues: state.metrics.monthlyIssues,
    openIssues: state.metrics.openIssues,
    payingCustomers: state.metrics.payingCustomers,
    push: state.db.socket
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(fetchMonthlyIssues());
      dispatch(fetchTotalOpenIssues());
      dispatch(fetchPayingCustomers());
    },
    togglePush: (enabled) => dispatch(togglePush(enabled))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Metrics);

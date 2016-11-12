import { connect } from 'react-redux'
import Issues from './Issues'
import { fetchIssues } from './IssuesModule'

const mapStateToProps = (state) => {
  return {
    'issues': state.issues,
    'employees': state.employees
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIssues: (id) => {
      dispatch(fetchIssues());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Issues);

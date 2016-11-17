import { connect } from 'react-redux'
import Issues from './Issues'
import { fetchIssues } from './IssuesModule'
import { togglePush } from '../../db/DBModule'

const mapStateToProps = (state) => {
  return {
    issues: state.issues.list,
    push: state.db.socket
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchIssues: () => dispatch(fetchIssues()),
    togglePush: (enabled) => dispatch(togglePush(enabled))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Issues);

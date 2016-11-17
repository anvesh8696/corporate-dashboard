import { connect } from 'react-redux';
import Explore from './Explore';
import { fetchOffices } from './ExploreModule';
import { togglePush } from '../../db/DBModule';

const mapStateToProps = (state) => {
  return {
    offices: state.explore.offices,
    push: state.db.socket
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOffices: (id) => {
      dispatch(fetchOffices());
    },
    togglePush: (enabled) => dispatch(togglePush(enabled))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);

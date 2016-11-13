import { connect } from 'react-redux'
import Explore from './Explore'
import { fetchOffices } from './ExploreModule'

const mapStateToProps = (state) => {
  return {
    'offices': state.explore.offices
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOffices: (id) => {
      dispatch(fetchOffices());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);

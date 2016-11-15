import React, { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
import theme from './Search.scss';

class Search extends Component {
    static propTypes = {
      onSearch: PropTypes.func
    }
    
    state = {
      filter:'',
      delayTimer: 0
    }
    
    handleChange = (value) => {
      this.setState({...this.state, filter: value});
      // delay the filter to prevent slowness
      clearTimeout(this.delayTimer);
      this.delayTimer = setTimeout(() => {this.updateSearchValue(value)}, 200);
    }
    
    updateSearchValue = (value) => {
      if(this.props.onSearch){
        this.props.onSearch(value);
      }
    }

    render() {
      return (
        <div className={theme.search}>
          <Input
            ref="search"
            type="text"
            label="Search..."
            value={this.state.filter}
            onChange={this.handleChange}
          />
        </div>
      );
    }
}
export default Search;

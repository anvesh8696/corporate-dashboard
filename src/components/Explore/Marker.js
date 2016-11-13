import React, { Component, PropTypes } from 'react';

export default class Marker extends Component {
    static propTypes = {
      text: PropTypes.string,
      theme: PropTypes.object
    }

    render() {
      return (
        <div className={this.props.theme.place}>
          {this.props.text}
        </div>
      );
    }
}

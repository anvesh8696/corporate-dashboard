import React, { Component, PropTypes } from 'react';
import {ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class IssuesChart extends Component {
    static propTypes = {
      data: PropTypes.array.isRequired
    }

    render() {
      return (
        <ComposedChart width={600} height={400} data={this.props.data}
            margin={{top: 20, right: 20, bottom: 20, left: 20}}>
          <XAxis dataKey="month" />
          <YAxis dataKey="count" />
          <Tooltip/>
          <Legend />
          <CartesianGrid stroke='#f5f5f5'/>
          <Bar dataKey='count' name='Reported Issues' barSize={20} fill='#ff7777'/>
        </ComposedChart>
      );
    }
}

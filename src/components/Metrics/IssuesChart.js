import React, { Component, PropTypes } from 'react';
import {ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class IssuesChart extends Component {
    static propTypes = {
      data: PropTypes.array.isRequired
    }

    render() {
      return (
        <ResponsiveContainer height={600} >
          <ComposedChart data={this.props.data}
              margin={{top: 20, right: 20, bottom: 20, left: 20}} ref={'chart'}>
            <XAxis dataKey="month" />
            <YAxis dataKey="count" />
            <Tooltip/>
            <Legend />
            <CartesianGrid stroke='#f5f5f5'/>
            <Bar dataKey='count' name='Reported Issues' barSize={20} fill='#ff7777'/>
          </ComposedChart>
        </ResponsiveContainer>
      );
    }
}

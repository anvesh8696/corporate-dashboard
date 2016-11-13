import React, { Component, PropTypes } from 'react';
import { ResponsiveContainer, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class CustomersChart extends Component {
    static propTypes = {
      data: PropTypes.array.isRequired
    }

    render() {
      return (
        <ResponsiveContainer height={600} >
          <ComposedChart data={this.props.data}
              margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <XAxis dataKey="month" />
            <YAxis dataKey="count" />
            <Tooltip/>
            <Legend/>
            <CartesianGrid stroke='#f5f5f5'/>
            <Line type='monotone' dataKey='count' name='Paying Customers' stroke='#ff7300'/>
          </ComposedChart>
        </ResponsiveContainer>
      );
    }
}

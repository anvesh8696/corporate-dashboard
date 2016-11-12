import React, { Component } from 'react';
import { AutoSizer, Table, Column, SortDirection } from 'react-virtualized';

class IssuesTable extends Component {
    static propTypes = {
      issues: React.PropTypes.object.isRequired
    }
    
    state = {
      sortBy: 'customer',
      sortDirection: SortDirection.ASC
    }
    
    createHeaders(list){
      let columns = [];
      for (let i = 0; i < list.length; i++) {
        columns.push(
          React.createElement(
            Column,
            {
              label: list[i].label,
              dataKey: list[i].key,
              flexGrow: list[i].grow || 1,
              key: i,
              width: 50
            }
          )
        );
      }
      return columns;
    }
    
    sortTable = ({ sortBy, sortDirection }) => {
      this.setState({ sortBy, sortDirection });
    }
    
    getRowData(list, index) {
      return list.get(index % list.size);
    }
    
    sortOrder = (a, b, sortBy, order) => {
      return a[sortBy].localeCompare(b[sortBy]) * order;
      //return a.get(sortBy).localeCompare(b.get(sortBy)) * order;
    }
    
    createTable = (list, columns) => {
      const {
        sortBy,
        sortDirection
      } = this.state;
      const order = sortDirection === SortDirection.DESC ? -1 : 1;
      let sortedList = list
        .sort((a, b) => this.sortOrder(a, b, sortBy, order));
      const rowGetter = ({ index }) => this.getRowData(sortedList, index);
      
      return React.createElement(
        AutoSizer,
        null,
        (params) => {
          return React.createElement(
            Table,
            {
              sort: this.sortTable,
              sortBy: this.state.sortBy,
              sortDirection: this.state.sortDirection,
              height: params.height,
              overscanRowCount: 0,
              rowGetter: rowGetter,
              headerHeight: 30,
              rowHeight: 30,
              rowCount: list.size,
              width: params.width
            },
            null,
            columns
          );
        }
      );
    }

    render() {
      const columns = this.createHeaders([
        {'key':'created', 'label':'submission'},
        {'key':'customer', 'label':'customer'},
        {'key':'email', 'label':'email'},
        {'key':'description', 'label':'description'},
        {'key':'status', 'label':'status', 'grow':0.5},
        {'key':'closed', 'label':'closed'},
        {'key':'employee', 'label':'employee'}
      ]);
      return (
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {this.createTable(this.props.issues, columns)}
        </div>
      );
    }
}
export default IssuesTable;

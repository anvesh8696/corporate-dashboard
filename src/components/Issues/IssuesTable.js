import React, { Component, PropTypes } from 'react';
import { AutoSizer, Table, Column, SortDirection } from 'react-virtualized';
import { isNumber, filter } from 'lodash';
import { Card, CardText, CardTitle } from 'react-toolbox/lib/card';
import Chip from 'react-toolbox/lib/chip';
import ContainerDimensions from 'react-container-dimensions';
import theme from './Issues.scss';

class IssuesTable extends Component {
    static propTypes = {
      issues: PropTypes.array.isRequired,
      search: PropTypes.string.isRequired,
      containerWidth: PropTypes.number
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
      return list[index % list.length];
    }
    
    sortOrder = (a, b, sortBy, order) => {
      if(isNumber(a[sortBy])){
        return (a[sortBy] > b[sortBy] ? -1 : 1) * order;
      }
      return a[sortBy].localeCompare(b[sortBy]) * order;
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
              rowCount: list.length,
              width: params.width
            },
            null,
            columns
          );
        }
      );
    }
    
    createCard(item,i){
      let status = item.status == 'open' ? theme.issueOpen : theme.issueClosed;
      return (
        <Card key={i} className={theme.card}>
          <CardTitle
            title={item.customer}
            subtitle={item.email}
          />
          <CardText>Employee: {item.employee}</CardText>
          <CardText><p>Description:</p>{item.description}</CardText>
          <CardText>Created: {item.created}</CardText>
          {
            item.closed != '' ? <CardText>Closed: {item.closed}</CardText> : null
          }
          <Chip className={status}>
            <span>{item.status}</span>
          </Chip>
        </Card>
      );
    }
    
    createCards = (list) => {
      return (
        <div className={theme.inner}>
          <div className={theme.scroll}>
            {list.map((e,i) => this.createCard(e,i))}
          </div>
        </div>
      );
    }
    
    filterIssues = (issues) => {
      let s = this.props.search;
      // no filter, eject early
      if(s === ''){
        return issues;
      }
      return filter(issues, (e) => {
        return e.created.indexOf(s) != -1 ||
          e.customer.indexOf(s) != -1 ||
          e.email.indexOf(s) != -1 ||
          e.description.indexOf(s) != -1 ||
          e.status.indexOf(s) != -1 ||
          e.closed.indexOf(s) != -1 ||
          e.employee.indexOf(s) != -1;
      });
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
      let filtered = this.filterIssues(this.props.issues);
      return (
        <div className={theme.container}>
          {
          <ContainerDimensions>
            {
              ({ width }) =>
                width >= 800 ?
                  this.createTable(filtered, columns) :
                  this.createCards(filtered)
            }
          </ContainerDimensions>
          /*
            this.props.containerWidth > 500 ?
              this.createTable(this.props.issues, columns) :
              this.createCards(this.props.issues)
              */
          }
        </div>
      );
    }
}
export default IssuesTable;

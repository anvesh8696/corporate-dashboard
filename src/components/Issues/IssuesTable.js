import React, { Component, PropTypes } from 'react';
import { AutoSizer, Table, Column, SortDirection } from 'react-virtualized';
import { filter, orderBy } from 'lodash';
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
      sortBy: 'created',
      sortDirection: SortDirection.DESC,
      filteredIssues: []
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
    
    createTable = (list, columns) => {
      const {
        sortBy,
        sortDirection
      } = this.state;
      const order = sortDirection.toLowerCase();
      let sortedList = orderBy(list, [sortBy], [order]);
      const rowGetter = ({ index }) => this.getRowData(sortedList, index);
      return React.createElement(
        AutoSizer,
        null,
        (params) => {
          return React.createElement(
            Table,
            {
              sort: this.sortTable,
              sortBy: sortBy,
              sortDirection: sortDirection,
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
    
    keyInIssue(e, s){
      return e.created.indexOf(s) != -1 ||
        e.customer.indexOf(s) != -1 ||
        e.email.indexOf(s) != -1 ||
        e.description.indexOf(s) != -1 ||
        e.status.indexOf(s) != -1 ||
        e.closed.indexOf(s) != -1 ||
        e.employee.indexOf(s) != -1;
    }
    
    filterIssues = (issues) => {
      let keys = this.props.search.trim().split(' ');
      // no filter, eject early
      if(keys[0] === ''){
        return issues;
      }
      return filter(issues, (e) => {
        let i = 0;
        for(i=0; i<keys.length; i++){
          if(!this.keyInIssue(e, keys[i])){
            return false;
          }
        }
        return true;
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
      const filtered = this.filterIssues(this.props.issues);
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
          }
        </div>
      );
    }
}
export default IssuesTable;

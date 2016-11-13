import Model from './Model';
import { Type, op, fn } from 'lovefield';
import { fill, each } from 'lodash';

export default class SalesModel extends Model {
  
  constructor(db){
    super(db, 'sales', '/static/corporate/sales.json');
  }
  createSchema(builder){
    builder.createTable(this.name)
      .addColumn('id', Type.INTEGER)
      .addColumn('customer', Type.INTEGER)
      .addColumn('created', Type.INTEGER)
      .addPrimaryKey(['id']);
  }
  
  groupByMonth(data){
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let month;
    // setup defaults
    let fData = [];
    for(let i=0; i<12; i++){
      fData.push({count:0, month:months[i]});
    }
    //expected YYYY-MM-DD
    for(let i=0; i<data.length; i++){
      month = Number(data[i].created.split('-')[1]);
      fData[month].count += data[i].count;
    }
    return fData;
  }
  
  payingCustomers(){
    let tab = this.table();
    return this.database()
      .select(fn.count(tab.id).as('count'), tab.created.as('created'))
      .from(tab)
      .groupBy(tab.created)
      .exec().then((e) => this.groupByMonth(e));
  }
}

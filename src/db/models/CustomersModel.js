import Model from './Model';
import { Type } from 'lovefield';

export default class CustomersModel extends Model {
  
  constructor(db){
    super(db, 'customers', '/static/corporate/customers.json');
  }
  createSchema(builder){
    builder.createTable(this.name)
      .addColumn('id', Type.INTEGER)
      .addColumn('name', Type.STRING)
      .addColumn('email', Type.STRING)
      .addColumn('created', Type.STRING)
      .addPrimaryKey(['id']);
  }
  
  selectAll(){
    // let tb = this.table();
    // return this.database()
    //   .select(tb.id, tb.name, tb.office)
    //   .from(tb)
    //   .orderBy(tb.id)
    //   .groupBy(tb.id)
    //   .exec();
  }
}

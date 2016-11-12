import Model from './Model';
import { Type } from 'lovefield';
import lf from 'lovefield';

export default class EmployeesModel extends Model {
  
  constructor(db){
    super(db, 'employees', '/static/corporate/employees.json');
  }
  createSchema(builder){
    builder.createTable(this.name)
      .addColumn('id', lf.Type.STRING)
      .addColumn('name', Type.STRING)
      .addColumn('office', Type.STRING)
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

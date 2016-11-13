import Model from './Model';
import { Type } from 'lovefield';

export default class EmployeesModel extends Model {
  
  constructor(db){
    super(db, 'employees', '/static/corporate/employees.json');
  }
  createSchema(builder){
    builder.createTable(this.name)
      .addColumn('id', Type.NUMBER)
      .addColumn('name', Type.STRING)
      .addColumn('office', Type.NUMBER)
      .addPrimaryKey(['id']);
  }
}

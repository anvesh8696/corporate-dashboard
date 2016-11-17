import Model from './Model';
import { Type, fn } from 'lovefield';

export default class OfficesModel extends Model {
  
  constructor(db){
    super(db, 'offices', '/static/corporate/offices.csv');
  }
  createSchema(builder){
    builder.createTable(this.name)
      .addColumn('id', Type.NUMBER)
      .addColumn('name', Type.STRING)
      .addColumn('lat', Type.NUMBER)
      .addColumn('lng', Type.NUMBER)
      .addPrimaryKey(['id']);
  }
  
  selectAll(){
    let tb = this.table();
    let employees = this.table('employees');
    return this.database()
      .select(tb.id.as('id'), tb.name.as('name'), tb.lat.as('lat'), tb.lng.as('lng'),
        fn.count(employees.id).as('employees'))
      .from(tb, employees)
      .where(tb.id.eq(employees.office))
      .groupBy(tb.id)
      .exec().then(function (e){
        console.log(e);
        return e;
      });
  }
}

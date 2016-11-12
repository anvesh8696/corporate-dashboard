import Model from './Model';
import { Type } from 'lovefield';

export default class IssuesModel extends Model {
  
  constructor(db){
    super(db, 'issues', '/static/corporate/issues.json');
  }
  createSchema(builder){
    builder.createTable(this.name)
      .addColumn('id', Type.STRING)
      .addColumn('key', Type.STRING)
      .addColumn('avatar', Type.STRING)
      .addColumn('email', Type.STRING)
      .addColumn('customer', Type.STRING)
      .addColumn('employee', Type.STRING)
      .addColumn('created', Type.INTEGER)
      .addColumn('closed', Type.STRING)
      .addColumn('status', Type.STRING)
      .addColumn('description', Type.STRING)
      .addPrimaryKey(['id']);
  }
  
  selectAll(){
    let tb = this.table();
    return this.database()
      .select()
      .from(tb)
      .orderBy(tb.id)
      .exec();
  }
}

import Model from './Model';
import { Type, op, fn } from 'lovefield';
import { fill, each } from 'lodash';

export default class IssuesModel extends Model {
  
  constructor(db){
    super(db, 'issues', '/static/corporate/issues.json');
  }
  createSchema(builder){
    builder.createTable(this.name)
      .addColumn('id', Type.INTEGER)
      .addColumn('customer', Type.INTEGER)
      .addColumn('employee', Type.INTEGER)
      .addColumn('created', Type.INTEGER)
      .addColumn('closed', Type.STRING)
      .addColumn('status', Type.STRING)
      .addColumn('description', Type.STRING)
      .addPrimaryKey(['id']);
  }
  
  selectAll(){
    let issues = this.table();
    let customers = this.table('customers');
    let employees = this.table('employees');
    let composite = op.and.apply(null, [
      customers.id.eq(issues.customer),
      employees.id.eq(issues.employee)
    ]);
    return this.database()
      .select(issues.id.as('id'), customers.name.as('customer'), customers.email.as('email'),
        employees.name.as('employee'), issues.created.as('created'), issues.closed.as('closed'),
        issues.status.as('status'), issues.description.as('description'))
      .from(issues, customers, employees)
      .where(composite)
      .exec();
  }
  
  reportedIssues(){
    let issues = this.table();
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let month;
    return this.database()
      .select(fn.count(issues.id).as('count'), issues.created.as('created'))
      .from(issues)
      .groupBy(issues.created)
      .exec().then((data) =>{
        
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
      });
  }
  
  totalOpenIssues(){
    let issues = this.table();
    return this.database()
      .select(fn.count(issues.id).as('count'))
      .from(issues)
      .where(issues.status.eq('open'))
      .exec().then((data) =>{
        return data[0].count;
      });
  }
}

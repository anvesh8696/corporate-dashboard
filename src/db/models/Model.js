import { fn } from 'lovefield';

export default class Model {
  
  constructor(db, name, url){
    this.name = name;
    this.url = url || `/static/${name}.txt`;
    this.db = db;
    this.createSchema(db.builder);
  }
  
  createSchema(builder){
    // OVERRIDE
  }
  
  database(){
    return this.db.database;
  }
  
  table(name){
    return this.database().getSchema().table(name || this.name);
  }
  
  count(){
    let issues = this.table();
    return this.database().select(fn.count(issues.id))
      .from(issues)
      .exec()
      .then(function (results) {
        return results[0]['COUNT(id)'];
      });
  }
}

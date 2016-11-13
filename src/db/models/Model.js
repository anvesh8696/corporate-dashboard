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
}

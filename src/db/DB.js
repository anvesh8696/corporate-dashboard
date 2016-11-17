import { schema, fn } from 'lovefield';
import { Promise } from 'es6-promise';

export default class DB {
  
  constructor(name, models){
    this.name = name;
    this.database = null;
    this.builder = schema.create(name, 1);
    this.models = models.map((m) => new m(this));
  }
  
  connect(){
    return this.builder.connect()
    .then((database) => {
      this.database = database;
    })
    // reload only if required
    .then(this.hasTableData)
    .then((exists) => {
      console.log('DB Cached:', exists);
      return !exists ? Promise.resolve() : Promise.reject();
    })
    .then(this.importTableData)
    .catch(function () {
      return;
    });
  }
  
  loadAndInsert = (url, name) => {
    return this.loadFile(url)
      .then((str) => this.insert(name, str));
  }
  
  insert = (name, str) => {
    if(str[0] === '{' || str[0] === '['){
      return this.insertJSON(name, str);
    }
    return this.insertCSV(name, str);
  }
  
  insertJSON = (name, str) => {
    let table = this.database.getSchema().table(name);
    let rows = JSON.parse(str);
    if(rows) {
      if(rows.length > 0){
        //rows.map((r) => table.createRow(r));
        for(let i=0; i<rows.length; i++){
          rows[i] = table.createRow(rows[i]);
        }
      }else{
        rows = [table.createRow(rows)];
      }
      return this.database
        .insertOrReplace()
        .into(table)
        .values(rows).exec();
    }
    return Promise.resolve();
  }
  
  insertCSV = (name, str) => {
    let table = this.database.getSchema().table(name);
    let rows = [];
    let lines = str.split('\n');
    // has columns and data
    if(lines.length >= 1) {
      let headers = lines[0].split(',');
      for(let i = 1; i < lines.length; i++) {
        let data = lines[i].split(',');
        // line has data
        if(data.length > 0){
          let obj = {id: i - 1};
          for(let j = 0; j < data.length; j++) {
             obj[headers[j].trim()] = this.nonNull(data[j].trim());
          }
          rows.push(table.createRow(obj));
        }
      }
      if(rows.length > 0) {
        return this.database
          .insertOrReplace()
          .into(table)
          .values(rows).exec();
      }
    }
    return Promise.resolve();
  }
  
  nonNull(value) {
    return value ? value : '';
  }
  
  loadFile(url) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject();
        }
      };
      xhr.onerror = reject;
      xhr.send();
    });
  }
  
  tablePromises = (m) => {
    let p = [];
    let i;
    for(i = 0; i < m.length; i++) {
      p.push(this.loadAndInsert(m[i].url, m[i].name));
    }
    return p;
  }
  
  importTableData = () => {
    return Promise.all(this.tablePromises(this.models));
  }
  
  hasTableData = () => {
    let table = this.database.getSchema().table(this.models[0].name);
    return this.database.select(fn.count(table.id))
      .from(table)
      .exec()
      .then(function (results) {
        return results[0]['COUNT(id)'] > 0;
      });
  }
  
  getModel = (name) => {
    let i;
    for(i = 0; i < this.models.length; i++) {
      if(this.models[i].name === name){
        return this.models[i];
      }
    }
    return null;
  }
}

import { random } from 'lodash';

export default class DBSocket {
  constructor(db){
    this.actions = {};
    this.enabled = false;
    this.db = db;
    
    // Simulate events coming from a socket
    //this.eventIndex = -1;
    this.timer = 0;
    this.run();
  }
  
  run = () => {
    let cb = this.actions['event'];
    if(cb){
      let tables = ['issues', 'sales', 'employees'];
      let tableName = tables[random(0, 2)];
      
      this.db.getModel(tableName).count()
      .then((c) => {
        cb('insert', {
          model: tableName,
          data:
            tableName === 'issues' ?
              this.createDummyIssue(c + 1) :
            tableName === 'sales' ?
              this.createDummySale(c + 1) :
              this.createDummyEmployee(c + 1)
        });
      });
    }
    if(this.enabled){
      clearTimeout(this.timer);
      this.timer = setTimeout(this.run, 1000 * random(1,3));
    }
  }
  
  createDummyIssue = (index) => {
    let open = random(0, 1) == 0 ? 'open' : 'closed';
    return JSON.stringify(
      {
        id : index,
        customer : random(0, 90),
        employee : random(0, 9),
        created : '2016-11-13',
        closed : '',
        status : open,
        description : 'MSG FROM SOCKET'
      }
    );
  }
  
  createDummySale = (index) => {
    return JSON.stringify(
      {
        id : index,
        customer : random(0, 90),
        created : '2016-11-13'
      }
    );
  }
  
  createDummyEmployee = (index) => {
    return JSON.stringify(
      {
        id : index,
        name: 'Fake Employee',
        office : random(0, 2)
      }
    );
  }
  
  on(action, callback){
    this.actions[action] = callback;
  }
  
  enablePush(){
    let e = this.enabled;
    this.enabled = true;
    if(e == false){
      this.run();
    }
  }
  
  disablePush(){
    clearTimeout(this.timer);
    this.enabled = false;
  }
}

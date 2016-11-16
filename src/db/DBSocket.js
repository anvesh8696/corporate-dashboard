import { random } from 'lodash';

export default class DBSocket {
  constructor(){
    this.actions = {};
    this.enabled = false;
    
    // Simulate events coming from a socket
    this.eventIndex = 999;
    this.timer = 0;
    this.run();
  }
  
  run = () => {
    let cb = this.actions['event'];
    if(cb){
      cb('insert', {
        model: 'issues',
        data: this.createDummyIssue()
      });
    }
    if(this.enabled){
      clearTimeout(this.timer);
      this.timer = setTimeout(this.run, 1000 * random(1,3));
    }
  }
  
  createDummyIssue = () => {
    this.eventIndex++;
    let open = random(0, 1) == 0 ? 'open' : 'closed';
    return JSON.stringify(
      {
        id : this.eventIndex,
        customer : random(0, 90),
        employee : random(0, 9),
        created : '2016-11-13',
        closed : '',
        status : open,
        description : 'MSG FROM SOCKET'
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

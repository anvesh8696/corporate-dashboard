import { random } from 'lodash';

export default class DBSocket {
  constructor(){
    this.actions = {};
    
    // Simulate events coming from a socket
    this.eventIndex = 999;
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
    setTimeout(this.run, 1000 * random(1,3));
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
}

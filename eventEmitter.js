class MyEventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, cb) {
    if(!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(cb);
    return {
      unsub: () => {
       this.unsubscribe(event, cb)
      }
    }
  }

  once(event, cb) {
    const newCb = (data) => {
      cb(data);
      this.unsubscribe(event, cb);
    }
    return this.on(event, newCb);
  }

  emit(event, data) {
    const listeners = this.events[event];
    listeners && listeners.forEach(cb => cb(data));
  }

  unsubscribe(event, cb) {
    this.events[event] = this.events[event].filter(current => current !== cb);
  }
}

let a = new MyEventEmitter();
a.on('boom', boom);
a.on('boom', foo);
a.on('boom', boom);
a.on('boom', foo);

a.emit('boom');
a.unsubscribe('boom', boom);

function foo() {
  console.log('foo');
}

function boom() {
  console.log('boom');
}

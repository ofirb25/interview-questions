function post(req, cb) {
  setTimeout(() => {
    cb(req * 2);
  }, 10 * Math.random())
}

function postAll(reqs, cb) {
  let len = reqs.length;
  let responses = [];
  let postCb = (data) => {
    responses.push(data);
    if(responses.length === len) {
      cb(responses);
    }
  }
  reqs.forEach(_req => post(_req, postCb));
}

// postAll([1,2,3], (data)=> console.log(data))

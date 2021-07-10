class Fetcher {
  urls = [];

  get(url, cb) {
    const rand = Math.random();
    setTimeout(() => cb(rand), rand);
  }

  add(url) {
    this.urls.push(url);
    return this; // send back this.
  }

  submit(cb) {
    const responses = [];
    const urlsLength = this.urls.length; // cache the length of the original array.
    let resCount = 0;
    this.urls.forEach((url, i) => {
      this.get(url, (res) => {
        responses[i] = res;
        resCount++; // count the num of results
        if(resCount === urlsLength.length) {
          cb(responses); // apply cb once all results return
        }
      });
    });
    this.urls = []; // make sure to clear the array sync.
  }
}

const f = new Fetcher();
f.add('/a').add('/b').submit((data) => {
  console.log(data); // [a, b]
});

f.add('/c').submit((data) => {
  console.log(data); // [c]
});



class Fetcher {
    urls = [];

    get(url, cb) {
      const rand = Math.random();
      setTimeout(() => cb(rand), rand);
    }
}

const f = new Fetcher();
f.add('/a').add('/b').submit((data) => {
  console.log(data); // [a, b]
});

f.add('/c').submit((data) => {
  console.log(data); // [c]
});

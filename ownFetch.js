const ownFetch = () => {
  // implementation
};



ownFetch('https://jsonplaceholder.typicode.com/posts')
  .then(console.log)
  .then(res => res());
  .catch(err => console.log(err));
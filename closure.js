function highLoadPerformance(a) {
  if (isNaN(a) || typeof a !== 'number') throw Error('Only number allowed');
  // Imagine that is this function is very high loaded.
  console.log(a);
  return a;
}

function memoize(fn) {
  // your implementation
}

const memoized = memoize(highLoadPerformance);

// memoized(10)
// memoized(10);

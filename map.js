const map = (array, fn) => {
  // Your implementation here
};

const array = [1, 2, 3];

const callbackFn = (item, index, arr) => {
  return item * index;
};

const processedArray = map(array, callbackFn);

console.log(processedArray); // должно вывести каждый элемент умноженный на его индекс [0, 2, 6]

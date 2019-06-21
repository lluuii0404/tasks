const map = (a, fn) => {
  	const arr =[]
	let i = 0
	while(i < a.length){
		arr.push(fn.call(a, a[i], i))
		i++
	}
	return arr
};

const array = [1, 2, 3];

const callbackFn = (item, index, arr) => {
  return item * index;
};

const processedArray = map(array, callbackFn);

console.log(processedArray); // должно вывести каждый элемент умноженный на его индекс [0, 2, 6]

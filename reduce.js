const reduce = (array, fn, initial) => {
  let acc = (initial === undefined) ? undefined : initial

	for (let i = 0; i < array.length; i++) {
        if (acc !== undefined)
            acc = fn.call(array, acc, array[i], i);
        else
            acc = array[i];
    }
    return acc;
};

const array = [1, 2, 3];

const callbackFn = (accumulator, item, index, arr) => {
  return {
    ...accumulator,
    [index]: item
  };
};

const processedArray = reduce(array, callbackFn, {});

console.log(processedArray); // должно вывести массив, преобразованный в объект {0: 1, 1: 2, 2: 3}

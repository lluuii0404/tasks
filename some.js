function some(array, callbackFn) {

}

function callbackFn(item, index, array) {
  return typeof item === 'number';
}

function callbackFn2(item, index, array) {
  return item.value < 100;
}

const array = ['Lorem', 'ipsum', 'dolor', 'sit', 0, 'consectetur', 'adipiscing', 'elit'];
const array2 = [
  {name: 'Item 1', value: 100},
  {name: 'Item 2', value: 200},
  {name: 'Item 3', value: 150},
  {name: 'Item 4', value: 40}
];

console.log(some(array, callbackFn)); // true
console.log(some(array2, callbackFn2)); // true

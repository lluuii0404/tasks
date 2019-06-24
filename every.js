function every(array, callbackFn) {

}

function callbackFn(item, index, array) {
  return typeof item === 'string';
}

function callbackFn2(item, index, array) {
  return item.value > 20;
}

const array = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];
const array2 = ['Lorem', 'ipsum', 'dolor', 'sit', 0, 'consectetur', 'adipiscing', 'elit'];
const array3 = [
  {name: 'Item 1', value: 100},
  {name: 'Item 2', value: 200},
  {name: 'Item 3', value: 150},
  {name: 'Item 4', value: 40}
];

console.log(every(array, callbackFn)); // true
console.log(every(array2, callbackFn)); // false
console.log(every(array3, callbackFn2)); // true

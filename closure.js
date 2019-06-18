// В файле closure.js. Представьте, что у вас есть какая то функция с тяжелыми вычеслениями,
// которая надолго забивает main thread. Но при одинаковом входном
// параметре - результат ее выполнения - один и тот же.
// Создайте функцию мемоизации, которая будет принимать эту "тяжелую" функцию как
// аргумент, при этом в своем замыкании будет хранить кэш объект. И возвратит новую функцию.
// Если в возвращенную функцию при её вызове передать входной параметр,
// с которым она уже вызывалась ранее - эта функция должна избежать выполнения
// "тяжелой" функции и сразу вернуть результат из кэша.


function highLoadPerformance(a) {
  if (isNaN(a) || typeof a !== 'number') throw Error('Only number allowed');
  // Imagine that is this function is very high loaded.
  console.log(a);
  return a;
}

function memoize(fn) {
	var cache = {}

	return function(arg) {
		let prop = Object.keys(cache).find( item => item == arg ? item : null)

		if (prop != undefined) {
			console.log('The result was already calculated - ', cache[prop])
			return cache[prop]
		} else {
			cache = Object.assign( {...cache} , {[arg] : null})
			cache[arg] = fn(arg)
			console.log('New calculation result - ', cache[arg])
			return cache[arg]
		}
	}
}

const memoized = memoize(highLoadPerformance);

memoized(10);
memoized(10);
memoized(20);
memoized(10);
memoized(30);
memoized(20);
memoized(20);
memoized(10);
memoized(30);
memoized(40);

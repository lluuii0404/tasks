/*
 * callback - функция которую нужно обернуть
 * time - время в миллисекундах
 */
function throttle(callback, time) {
  return function (args) {
		let prevCall = this.lastCall
		this.lastCall = Date.now()

		if (prevCall === undefined || (this.lastCall - prevCall) > time )
			callback(args)
	}
}

let hello = (args) => {console.log(`Say ${args}`)}

let waitHello = throttle(hello, 2000) 

waitHello('Hello')
waitHello('Bye')
waitHello('Jump')
waitHello('Stop')

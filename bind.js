// В файле bind.js напишите свой вариант метода bind.
// Который будет принимать функцию, которую неободимо обернуть.
// А в остальном работать так же как и нативный bind.

function ownBind (fn, context) {
	var ownBindArgs = Array.from(arguments).slice(2)
	return function () {
		var args  = Array.from(arguments)
		if (args.length === 0)
			return fn.apply(context, ownBindArgs)
		else
			return fn.apply(context, args)
	}
}

// example 1
function sum (a,b){
	return a + b
}

// let test1 = ownBind(sum, null, 1, 2)
// test1()
// 3

// let test2 = ownBind(sum, null)
// test1(4,5)
// 9

// example 2
const obj = {name: "Lui"}

function sayMssgs(mssgs) {
	return `${this.name} say: - ${msgs}.`
}

// var test3 = ownBind(sayMssgs, obj, "Hello")
// test3()
// Lui say: - Hello.

// var test4 = ownBind(sayMssgs, obj)
// test4('it"s work')
// Lui say: - it"s work.

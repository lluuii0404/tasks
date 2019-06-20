class MyString {
	constructor() {
		this.reverse_1 = function (str) {
			return str.split('').reverse().join('')
		}
		this.reverse_2 = function (str) {
			const new_arr = []
			str.split('').forEach( item => new_arr.unshift(item) )
			return new_arr.join('')
		}

		this.ucFirst = function (str) {
			const s = str.split('')
            s[0] = s[0].toUpperCase()
            return s.join("")
		}
		this.ucWords = function (str) {
			const arr_words = str.split(" ").map(item => {
                const arr_ltrs = item.split('')
                arr_ltrs[0] = arr_ltrs[0].toUpperCase()
                return arr_ltrs.join('')

            })
            return arr_words.join(" ")
		}
	}
}

const str = new MyString();

console.log(str.reverse_1('abcde')); //выведет 'edcba'
console.log(str.reverse_2('abcde')); //выведет 'edcba'
console.log(str.ucFirst('abcde')); //выведет 'Abcde'
console.log(str.ucWords('abcde abcde abcde')); //выведет 'Abcde Abcde Abcde'

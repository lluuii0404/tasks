function join(array, separator) {
  let newStr = ''
	for (let i = 0; i < array.length; i++){
		if ( i !== array.length - 1) newStr += `${array[i]}${separator}`
		else newStr += `${array[i]}`
	}
	return newStr.trim()
}

const array = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];

console.log(join(array, ' '));

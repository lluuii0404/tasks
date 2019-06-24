function split(string, separator, limit) {
  let posStart = 0;
	const newArray = [];
	for( let i = 0; i <= string.length; i++){
		if (i === string.length ){
			newArray.push(string.substring(posStart));
		} else {
			if (string[i] === separator) {
                newArray.push(string.substring(posStart, i));
                posStart = i + 1;
            }
		}
	}
	if ( limit )
		newArray.length = limit
	return newArray
}


const string = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';

console.log(split(string, ' '));

function sum(a = 1, b = 2) {
  const isInvalid = Array.from(arguments).some(
    item => typeof item !== 'number' || isNaN(item)
  );
  if (isInvalid) throw Error('Arguments have to be just numbers');

  const result = a + b + this.c;

  if (isNaN(result) || typeof result !== 'number')
    throw Error('Maybe you have some problems with the context? :)');

  console.log(result);
}

sum.c = 10;

//sum.call.apply()

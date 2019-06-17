// В файле discount.js напишите функцию, которая принимает скидку в процентах(число)
// и возвращает функцию, которая, в свою очередь принимает стоимость товара(число),
// и возвращает сумму учитывая вашу скидку.
// Сделайте несколько вариантов. Для скидки в 10% и в 90%.

const makeDiscount = percent => cost => `Your sum with discount - ${cost - (cost * percent / 100)}`

//  first option
const first_sum = makeDiscount(90)
const second_sum = makeDiscount(10)

first_sum(6000)
second_sum(4000)

// second option
makeDiscount(90).call(null, 6000)
makeDiscount(10).call(null, 4000)

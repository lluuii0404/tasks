// <body>
//   <p>1</p>
//   text
//   <div><p>2</p></div>
// </body>
const elements = recSearchTags(document, 'p');
// ['<p>1</p>' '<p>2</p>'] где каждый элемент это объект соответствующего типа
console.log(elements.length); // 2

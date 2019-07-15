// <body>
//   <p>1</p>
//   text
//   <div><p>2</p></div>
// </body>


//first version
function recSearchTags(document, tagName) {
  return document.querySelectorAll(tagName);
}

// second version
function recSearchTags(parent, tagName) {
  const arrTags = [];

  (function findTags(elem) {
    let _parent;
    let nodes;
    if (elem === undefined && parent === document ) {
      _parent = parent.body;
      nodes = _parent.childNodes;
    } else {
      nodes = elem.childNodes;
    }

    for (let item of nodes) {
      if (item.nodeType === 1  ) {

    		if (item.childNodes.length !== 0 && item.nodeName.toLowerCase() === tagName)
          arrTags.push(item)
    		else findTags(item)

      } else continue;
    }
  })();

  return arrTags
}



const elements = recSearchTags(document, 'p');
// ['<p>1</p>' '<p>2</p>'] где каждый элемент это объект соответствующего типа
console.log(elements.length); // 2

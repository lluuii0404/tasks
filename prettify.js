// <body>
//   <p>Boom</p>
//   text
//   <div>Bam</div>
// </body>

function prettify(doc) {
	const nodelist = doc.body.childNodes

	for(let item of nodelist) {
		if (item.nodeType === 1 && item.nodeName.toLowerCase() === 'div') {
			const text = item.innerText
			item.innerText = ''
			const p = item.appendChild(document.createElement("p"))
			p.innerHTML = text
		} else continue
	}
}


const elements = prettify(document);
console.log(document.body.innerHTML);
// <body>
//   <p>Boom</p>
//   text
//   <div><p>Bam</p></div>
// </body>

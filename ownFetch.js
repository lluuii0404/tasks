const ownFetch = (url) => {
  return new Promise( (response, reject) => {
		let xhr = new XMLHttpRequest ();
		xhr.open ('GET', url);
		xhr.timeout = 30000;
		xhr.onload = function ( event ) {
   		response( this.response )
    }
		xhr.ontimeout = function( event ) {
			this.abort();
  		reject( new Error ( 'Oops..... Connection is broken. Something went wrong.' ));
		}
		xhr.send();
	})
};



ownFetch('https://jsonplaceholder.typicode.com/posts')
  .then(console.log)
  .then(res => res());
  .catch(err => console.log(err));

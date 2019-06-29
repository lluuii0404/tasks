/*
 * callback - функция которую нужно обернуть
 * time - время в миллисекундах
 */
 function debounce(callback, time) {
   return function (args) {
     let prevCall = this.lastCall
     this.lastCall = Date.now()
     
     if (prevCall && ((this.lastCall - prevCall) <= time)) {
       clearTimeout(this.lastCallTimer);
     }

     this.lastCallTimer = setTimeout( () => callback(args))
   }
 }


 let hello = (args) => {console.log(`Say ${args}`)}

 let debounceHello = debounce(hello, 2000)

 debounceHello('Hello')
 debounceHello('Bye')
 debounceHello('Jump')
 debounceHello('Stop')

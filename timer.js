class Timer {
  constructor(initialTime) {
    this.initialTime = initialTime;
  }

  start() {
    if (this.initialTime <= 0) {
  		console.log("Add time pls")
  		return
  	}
  	let inteval = this.initialTime;
    this.timer = setInterval( () => {
  		let hours   = parseInt( inteval / 60 / 60, 10)
      let minutes = parseInt( inteval / 60, 10) ;
      let seconds = parseInt( inteval % 60, 10);

      hours   = hours   < 10 ? "0" + hours   : hours;
  		minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

  		console.log(`${hours} : ${minutes} : ${seconds}`)

  		if( --inteval < 0){
  			this.stop();
  			this.timeOver();
  		}

    },1000)
  }

  stop() {
    clearInterval(this.timer)
  }

  reset() {
    this.initialTime = 0;
  }

  addTime(time) {
    this.initialTime += time;
  }

  subtractTime(time) {
    this.initialTime -= time;
  }

  timeOver() {
    console.log("time over");
  }
}

const timer = new Timer(70);

timer.start();

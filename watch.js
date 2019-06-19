class Watch {
  constructor() {
    this.interval = null;
  }

  start() {
    // Your implementation here
  }

  stop() {
    // Your implementation here
  }
}

const watch = new Watch();

watch.start();


setTimeout(() => {
  // Остановится через 10 секунд
  watch.stop();
}, 10000);

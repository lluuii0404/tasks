// function Speaker(name, verb) {
//   this.name = name;
//   this.verb = verb || 'says';
// }
//
// Speaker.prototype.speak = function (text) {
//   console.log(this.name + ' ' + this.verb + ' \'' + text + '\'');
// };
//
// function Shouter(name) {
//   Speaker.call(this, name, 'shouts')
// }
//
// Shouter.prototype = Object.create(Speaker.prototype);
// Shouter.prototype.speak = function (text) {
//   Speaker.prototype.speak.call(this, text.toUpperCase());
// };


class Speaker {
  constructor(name, verb) {
		this.name = name;
    this._verb = verb || 'says';
	}
	get verb() {
    return this._verb;
  }

  set verb(newVerb) {
    this._verb = newVerb;
  }
  speak(text) {
    console.log(this.name + ' ' + this.verb + ' \'' + text + '\'');
	}
}

class Shouter extends Speaker {
	constructor(name) {
		super(name, 'shouts')
	}
	speak(text) {
		super.speak(text.toUpperCase())
	}
}

new Shouter('Dr. Loudmouth').speak('hello there');

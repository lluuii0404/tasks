class User {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }

  getFullName() {
    return `${this.name} ${this.surname}`
  }
}

class Student extends User {
	constructor(name, surname, year){
		super(name, surname)
		this.year = year;
	}

	getCourse() {
		const kurs = new Date().getFullYear() - this.year
		if (kurs > 0 && kurs < 6) return kurs
		else return 'Уже не студент'
	}
}

const student_1 = new Student('Вася', 'Пупкин', 2016);
const student_2 = new Student('Петя', 'Васин', 2012);

console.log(student_1.name); //выведет 'Вася'
console.log(student_1.surname); //выведет 'Пупкин'
console.log(student_1.getFullName()); //выведет 'Вася Пупкин'
console.log(student_1.year); //выведет 2016
console.log(student_1.getCourse()); //выведет 3 - третий курс, так как текущий год 2019

console.log(student_2.name); //выведет 'Петя'
console.log(student_2.surname); //выведет 'Васин'
console.log(student_2.getFullName()); //выведет 'Петя Васин'
console.log(student_2.year); //выведет 2012
console.log(student_2.getCourse()); // Уже не студент

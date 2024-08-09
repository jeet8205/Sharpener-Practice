// Task 1 - fat-arrow function which returns the product of two numbers.
let a = 5;
let b = 6;
const product = (x, y) => x * y;
console.log(product(a, b));

// Task 2 - creating a student object

const student = {
    firstName: 'Sayan',
    lastName: 'Banerjee',
    stream: 'CSE',

    greet() {
        console.log(`Hi! I am ${this.firstName} ${this.lastName}. My stream is ${this.stream}`);
    }
};

student.greet();
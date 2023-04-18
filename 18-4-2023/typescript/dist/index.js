"use strict";
// Basic Types
let id = 5;
let company = 'Hello';
let isBoolean = true;
let x = ' Hello hi';
let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let arr = [1, true, false, 'Hello'];
// Tuple 
let person = [1, 'Tuan', true];
// Typle Array 
let employee;
employee = [
    [1, 'John'],
    [2, 'Jill'],
    [3, 'Jack'],
    [4, 'Brad'],
];
// Union 
let union_id;
union_id = 22;
// union_id = 'hello'
// Enum
var Direction1;
(function (Direction1) {
    Direction1[Direction1["Up"] = 1] = "Up";
    Direction1[Direction1["Down"] = 2] = "Down";
    Direction1[Direction1["Left"] = 3] = "Left";
    Direction1[Direction1["Right"] = 4] = "Right";
})(Direction1 || (Direction1 = {}));
const user = {
    id: 1,
    name: "Tuan"
};
// Functions 
function addNumber(x, y) {
    return x + y;
}
//console.log(addNumber(1, 5))
// Void : Không trả về bất kỳ giá trị nào 
function messages(messages) {
    console.log(messages);
}
const userInterface = {
    id: 1,
    name: 'Hoang Van Tuan',
    age: 20,
    phone: '1234-2344-23123'
};
function printUser(userInterface) {
    console.log(userInterface.id);
    console.log(userInterface.name);
    console.log(userInterface.age);
    console.log(userInterface.phone);
}
console.log(printUser);
//Classes
class Person {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
const person_1 = new Person(1, 'Hoang Tuan');
const person_2 = new Person(2, 'John ');
console.log(person_1);
console.log(person_2);
// Subclasses
class Employee extends Person {
    constructor(id, name, age) {
        super(id, name);
        this.age = age;
    }
}
const emp = new Employee(3, 'Hoang Van Tuan  ', 20);
console.log(emp);
/// Generics 
function getArray(items) {
    return new Array().concat(items);
}
let numberArray = getArray([1, 2, 3, 4, 5, 6]);
let strArray = getArray(['Joh', "Jack", "Jill"]);
strArray.push("hoang");
numberArray.push(10);
//console.log(strArray)

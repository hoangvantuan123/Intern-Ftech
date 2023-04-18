// Basic Types

let id: number = 5

let company: string = 'Hello'

let isBoolean: boolean = true

let x: any = ' Hello hi'

let ids: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

let arr: any[] = [1, true, false, 'Hello']


// Tuple 
let person: [number, string, boolean] = [1, 'Tuan', true]

// Typle Array 

let employee: [number, string][]

employee = [
    [1, 'John'],
    [2, 'Jill'],
    [3, 'Jack'],
    [4, 'Brad'],
]


// Union 

let union_id: string | number

union_id = 22
// union_id = 'hello'


// Enum

enum Direction1 {
    Up = 1,
    Down,
    Left,
    Right
}

//console.log(Direction1)


/// Objects 

type User = {
    id: number,
    name: string

}
const user: User = {
    id: 1,
    name: "Tuan"
}


// Functions 

function addNumber(x: number, y: number): number {
    return x + y;
}

//console.log(addNumber(1, 5))


// Void : Không trả về bất kỳ giá trị nào 
function messages(messages: string | number): void {
    console.log(messages)
}


// Interfaces  : Định nghĩa kiểu dữ liệu cho đối tượng. 
//Việc sử dụng Interface giúp đảm bảo tính chính xác và đồng nhất của dữ liệu 
// giúp giảm thiểu lỗi và tăng tính bảo trì của ứng dụng 
interface UserInterface {
    id: number
    name: string
    age: number
    phone: string
}

const userInterface: UserInterface = {
    id: 1,
    name: 'Hoang Van Tuan',
    age: 20,
    phone: '1234-2344-23123'
}

function printUser(userInterface: UserInterface) {
    console.log(userInterface.id)
    console.log(userInterface.name)
    console.log(userInterface.age)
    console.log(userInterface.phone)
}
console.log(printUser)

//Classes
class Person {
    //private id: number
    id: number
    name: string

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }
}

const person_1 = new Person(1, 'Hoang Tuan')
const person_2 = new Person(2, 'John ')

console.log(person_1)
console.log(person_2)


// Subclasses

class Employee extends Person {
    age: number

    constructor(id: number, name: string, age: number) {
        super(id, name)
        this.age = age
    }
}

const emp = new Employee(3, 'Hoang Van Tuan  ', 20);
console.log(emp)

/// Generics 
function getArray<T>(items: T[]): T[] {
    return new Array().concat(items)
}

let numberArray = getArray<number>([1, 2, 3, 4, 5, 6]);
let strArray = getArray<String>(['Joh', "Jack", "Jill"]);

strArray.push("hoang")
numberArray.push(10)
//console.log(strArray)
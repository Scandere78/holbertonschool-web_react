interface Student {
    firstName:string;
    lastName:string;
    age:number;
    location:string
}

const student1: Student = {
    firstName: "John",
    lastName: "Doe",
    age: 20,
    location: "Paris",
};

const student2: Student = {
    firstName: "JoJo",
    lastName: "Dolifofo",
    age: 23,
    location: "Texas",
};

const studentsList: Student[] = [student1, student2];

const table = document.createElement("table")
const headerRow = document.createElement("tr")

studentsList.forEach((student) => {
    const row= document.createElement("tr")
    const firstNameCell = document.createElement("td");
    const locationCell = document.createElement("td");


    firstNameCell.textContent = student.firstName;
    locationCell.textContent = student.location;


    row.appendChild(firstNameCell);
    row.appendChild(locationCell);
    table.appendChild(row);
})

document.body.appendChild(table);
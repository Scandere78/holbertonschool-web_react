interface DirectorInterface {
    workFromeHome(): string;
    getCoffeeBreak(): string;
    workDirectorTasks(): string
}

interface TeacherInterface {
    workFromeHome(): string;
    getCoffeeBreak(): string;
    workTeacherTasks(): string
}

class Director implements DirectorInterface {
    workFromeHome(): string {
        return "Working from home"
    }

    getCoffeeBreak(): string {
        return "Getting a coffee break"
    }

    workDirectorTasks(): string {
        return "Getting to director task"
    }
}

class Teacher implements TeacherInterface {
    workFromeHome(): string {
        return "Cannot work from home"
    }

    getCoffeeBreak(): string {
        return "Cannot have a break"
    }

    workTeacherTasks(): string {
        return "Getting to work"
    }
}

function createEmployee (salary: number | string) {
    if (typeof salary === "number" && salary < 500) {
        return new Teacher();
    } else {
        return new Director();
    }
}

function isDirector(employee: DirectorInterface | TeacherInterface): employee is Director {
    return (employee as Director).workDirectorTasks !== undefined
}


function executeWork(employee: DirectorInterface | TeacherInterface) {
    if (isDirector(employee)) {
        console.log(employee.workDirectorTasks());
    } else {
        console.log(employee.workTeacherTasks());
    }
}

type Subjects = "Math" | "History";

function teachClass(todayClass: Subjects) {
    if (todayClass === "Math") {
        return "Teaching Math";
    } else {
        return "Teaching History";
    }
}

console.log(createEmployee(200));
console.log(createEmployee(1000));
console.log(createEmployee("$500"));

executeWork(createEmployee(200));
executeWork(createEmployee(1000));

console.log(teachClass("Math"));
console.log(teachClass("History"));

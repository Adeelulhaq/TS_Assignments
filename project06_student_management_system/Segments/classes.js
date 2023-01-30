class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
export class Course {
    name;
    id = Math.floor(Math.random() * 892734);
    timing;
    fee;
    students = [];
    teacher;
    constructor(name, timing, fee) {
        this.name = name;
        this.timing = timing;
        this.fee = fee;
    }
    F_registerStudent(student) {
        this.students.push(student);
    }
    F_addCourseInStudentCourses(student) {
        student.F_registerInCourse(this);
    }
    F_setTeacher(teacher) {
        this.teacher = teacher;
    }
    F_addCourseInTeacherCourses(teacher) {
        teacher.F_assignCourse(this);
    }
}
export class Student extends Person {
    studentID = Math.floor(Math.random() * (9 * (Math.pow(10, 4)))) + (Math.pow(10, 4)); // 5 digit random number
    balance = 2000;
    courses = [];
    constructor(name, age) {
        super(name, age);
    }
    F_registerInCourse(course) {
        this.courses.push(course);
        this.F_submitFee(course.fee);
    }
    F_addStudentInCourseStudents(course) {
        course.F_registerStudent(this);
    }
    F_submitFee(fee) {
        this.balance -= fee;
    }
}
export class Teacher extends Person {
    teacherID = Math.floor(Math.random() * (9 * (Math.pow(10, 4)))) + (Math.pow(10, 4));
    courses = [];
    constructor(name, age) {
        super(name, age);
    }
    F_assignCourse(course) { this.courses.push(course); }
    F_addTeacherInCourseTeacher(course) { course.F_setTeacher(this); }
}
